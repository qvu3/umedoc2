import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { Calendar } from '@fullcalendar/core';
import { BaseComponent } from '../../../base.component';
import { AuthenticationService } from '../../../../modules/common/services/authentication.service';
import { AppointmentSlotService } from '../../../../modules/common/services/appointment-slot.service';
import { CommonDialogService } from '../../../../modules/common/services/dialog.service';
import { DatePipe } from '@angular/common';
import dayGridPlugin from '@fullcalendar/daygrid';
import { AppointmentSlotGroupModel } from '../../../../modules/common/models/appointment-slot-group.model';
import { AppointmentSlotDetailModel } from '../../../../modules/common/models/appointment-slot-detail.model';

import { AppointmentModel } from '../../../../modules/common/models/appointment.model';
import { ProviderProfileModel } from '../../../../modules/common/models/provider-profile.model';
declare var moment: any;
declare var $: any;
@Component({
  selector: 'app-schedule-provider-appointment',
  templateUrl: './schedule-provider-appointment.component.html',
  styleUrls: ['./schedule-provider-appointment.component.css'],
  providers: [DatePipe]
})
export class ScheduleProviderAppointmentComponent extends BaseComponent implements AfterViewInit {
  @ViewChild('scheduler', { static: false })
  scheduler!: ElementRef;
  @Input()
  provider: ProviderProfileModel = new ProviderProfileModel;
  @Input()
  appointment: AppointmentModel = new AppointmentModel();
  AppointmentSlotID: string | null = null;
  AppointmentTime: string | null = null;
  calendar: any;
  isHide: boolean = false;
  @Input() showSmallCalendar: boolean = false;
  slot: AppointmentSlotGroupModel = new AppointmentSlotGroupModel;
  @Input() isFU:boolean =false;
  constructor(authService: AuthenticationService,
    private appointmentslotService: AppointmentSlotService,
    private dialog: CommonDialogService,
    private datePipe: DatePipe
  ) {
    super(authService);
  }

  override ngAfterViewInit(): void {
    if (!this.showSmallCalendar) {
      this.init()
    }
  }

  hideAppointment() {
    this.provider.IsHideAppointment = true;
  }

  refresh() {
    this.appointment.AppointmentTime = null as unknown as Date;
    this.init();
  }

  init() {
    this.calendar = new Calendar(this.scheduler.nativeElement, {
      editable: false,
      selectable: false,
      droppable: false,
      height: 'auto',
      eventColor: 'transparent',
      eventBackgroundColor: 'transparent',
      contentHeight: 'auto',
      plugins: [dayGridPlugin],
      headerToolbar: {  // Updated to headerToolbar
        left: 'title',
      },
      loading: (isLoading) => {
        if (isLoading)
          $('#calendarLoading').show();
        else
          $('#calendarLoading').hide();
      },
      initialView: 'dayGridMonth',  // Updated from defaultView to initialView
      events: (info, successCallback, failureCallback) => {
        if (this.provider && this.provider.ID) {
          let startDate = info.start;
          this.appointmentslotService.GetAvaiableAppointmentSlotsByProvider(startDate, this.provider.ProviderID , this.isFU).subscribe(r => {
            if (r) {
              var result = this.generateEvents(r, info.start, info.end);
              successCallback(result);
            } else {
              successCallback([]);
            }
          });
        }
      },
      eventContent: (info: any) => {
        if (info.event.start) {
          var selectedDate = this.datePipe.transform(info.event.start, 'yyyy-MM-dd');
          var appointmentTime = this.appointment.AppointmentTime ? this.datePipe.transform(this.appointment.AppointmentTime, 'yyyy-MM-dd') : '';
          if (appointmentTime && selectedDate && selectedDate == appointmentTime) {
            $(`.fc-day.fc-widget-content[data-date=${selectedDate}]`).html('<i class="la la-check-circle text-success" style="font-size:20px;"></i>');
          }
        }
        var element = $(info.el);
        if (element) {
          var html = `<div class="time-content" style="
          width: 100%;
          justify-content: center;
          vertical-align: middle;
          text-align: center;
          "> <h5 style="
          font-size: 12px;
          font-weight: bold;
          margin-top: 5px;
          ">${info.event.extendedProps.times} Slots</h5>
          <i class='la la-angle-down' style="
          font-weight: bold;
          font-size: 15px;
          margin-top: 0px;
          color: #e4b224;
          "></i></div>`;
          element.html(html);
        }
      },
      eventClick: (info) => {
        // handle event click logic
      }
    });
  
    this.calendar.render();
  }
  

  closeTimes(id: string) {
    $(`#${id}`).remove();
  }

  selectedSlot(id: string, time: string | number | Date) {
    var realId = id.replace('btn_', '');
    var currentSlot = $(`#${id}`);
  
    var selectedDate = this.datePipe.transform(time, 'yyyy-MM-dd');
    if (selectedDate) {
      $(`.fc-day.fc-widget-content`).html('');
      $(`.fc-day.fc-widget-content[data-date=${selectedDate}]`).html('<i class="la la-check-circle text-success" style="font-size:20px;"></i>');
    }
  
    if (this.appointment.AppointmentSlotID == realId) {
      this.appointment.AppointmentSlotID = null as unknown as string;
      this.appointment.AppointmentTime = null as unknown as Date;
      currentSlot.removeClass();
      currentSlot.addClass('btn btn-medical-white square btn-min-width mr-1 mb-1');
    }
    else {
      if (this.appointment.AppointmentSlotID) {
        $(`#btn_${this.appointment.AppointmentSlotID}`).removeClass();
        $(`#btn_${this.appointment.AppointmentSlotID}`).addClass('btn btn-medical-white square btn-min-width mr-1 mb-1');
      }
  
      this.appointment.AppointmentSlotID = realId;
      this.appointment.AppointmentTime = new Date(time);
      currentSlot.removeClass();
      currentSlot.addClass('btn btn-green square btn-min-width mr-1 mb-1');
    }
    return;
  }

  generateEvents(list: AppointmentSlotGroupModel[], start_date: Date, end_date: Date) {
    var arr: { start: Date; end: Date; times: number; morningSlots: AppointmentSlotDetailModel[]; eveningSlots: AppointmentSlotDetailModel[]; color: string; }[] = [];
    if (list) {
      list.forEach((c: AppointmentSlotGroupModel) => {
        let r = {
          start: c.AppointmentDate,
          end: c.AppointmentDate,
          times: c.Times,
          morningSlots: c.MorningSlots,
          eveningSlots: c.EveningSlots,
          color: 'transparent'
        };
        arr.push(r);
      });
    }
    return arr;

  }

  changeDate(event: any) {
    var startDate = event;
    this.appointmentslotService.GetAvaiableAppointmentSlots({ RequestDate: startDate, ProviderID: this.provider.ProviderID , IsFU: this.isFU })
      .subscribe(r => {
        this.slot = r;
    });
  }

  ConvertDateToStringLocal(date: string) {
    if (date) {
      date = date.replace('Z', '');
      return moment(date).format('MMM D, Y');
    }
    return ''
  }

  getCurrentTimezoneInfo() {
    var hours = new Date().getTimezoneOffset() / 60;
    return `${Intl.DateTimeFormat().resolvedOptions().timeZone} UTC (${(hours > 0 ? '-' + hours.toString() : hours.toString())})`;
  }

  selectSlot(slot: { ID: string; StartTime: Date; }) {
    this.appointment.AppointmentSlotID = slot.ID;
    this.appointment.AppointmentTime = slot.StartTime;
  }

}
