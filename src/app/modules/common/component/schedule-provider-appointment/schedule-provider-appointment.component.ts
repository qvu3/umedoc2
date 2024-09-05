import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { Calendar } from '@fullcalendar/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { AppointmentSlotService } from 'src/app/modules/common/services/appointment-slot.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { DatePipe } from '@angular/common';
import dayGridPlugin from '@fullcalendar/daygrid';
import { AppointmentSlotGroupModel } from 'src/app/modules/common/models/appointment-slot-group.model';
import { AppointmentSlotDetailModel } from 'src/app/modules/common/models/appointment-slot-detail.model';

import { AppointmentModel } from 'src/app/modules/common/models/appointment.model';
import { ProviderProfileModel } from 'src/app/modules/common/models/provider-profile.model';
declare var moment: any;
declare var $: any;
@Component({
  selector: 'app-schedule-provider-appointment',
  templateUrl: './schedule-provider-appointment.component.html',
  styleUrls: ['./schedule-provider-appointment.component.css'],
  providers: [DatePipe]
})
export class ScheduleProviderAppointmentComponent extends BaseComponent implements AfterViewInit {
  @ViewChild('scheduler', { static: false }) scheduler: ElementRef;
  @Input() provider: ProviderProfileModel;
  @Input() appointment: AppointmentModel;
  calendar: any;
  isHide: boolean = false;
  @Input() showSmallCalendar: boolean = false;
  slot: AppointmentSlotGroupModel;
  @Input() isFU:boolean =false;
  constructor(authService: AuthenticationService,
    private appointmentslotService: AppointmentSlotService,
    private dialog: CommonDialogService,
    private datePipe: DatePipe
  ) {
    super(authService);
  }

  ngAfterViewInit(): void {
    if (!this.showSmallCalendar) {
      this.init()
    }
  }

  hideAppointment() {
    this.provider.IsHideAppointment = true;
  }

  refresh() {
    this.appointment.AppointmentTime = null;
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
      //schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
      plugins: [dayGridPlugin],
      header: {
        left: 'title',
        //center: 'title',
      },
      loading: (isLoading) => {
        if (isLoading)
          $('#calendarLoading').show();
        else
          $('#calendarLoading').hide();
      },
      defaultView: 'dayGridMonth',
      events: (info, successCallback, failureCallback) => {
        if (info && successCallback && failureCallback) {
          if (this.provider && this.provider.ID) {
            let startDate = info.start;
            this.appointmentslotService.GetAvaiableAppointmentSlotsByProvider(startDate, this.provider.ProviderID , this.isFU).subscribe(r => {
              if (r) {
                var result = this.generateEvents(r, info.start, info.end);
                successCallback(result);
              }
              else {
                successCallback([]);
              }
            });
          }
        }
      },
      eventRender: (info) => {
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
        //close all row open
        var rows = $(document).find('.fc-row.fc-week.fc-widget-content.scheduler_row');
        if (rows && rows.length > 0) {
          rows.remove();
        }

        if (info.el) {
          var lastParent = $(info.el).parent().parent().parent().parent().parent().parent();
          let id = `row_${this.datePipe.transform(info.event.start, 'MM_dd_yyy')}`;

          if (lastParent) {
            var html = `<div class="fc-row fc-week fc-widget-content scheduler_row" style="border-top: 1px solid #ddd;"
            id="${id}">`;
            html += `<div class="row col-md-12 mt-1 mb-1">`;
            html += `  <div class="col-md-12 text-right">`;
            html += `       <a href="javascript:void(0)" onclick="(event)=>{ console.log(event); }" style="margin-right:50px;"><i class="la la-times"></i></a>`;
            html += `  </div>`;
            html += `  <div class="col-md-12 text-center">`;
            html += `  <h4 style=" font-weight: bold;">Please choose a time slot below.</h4>`;
            html += `      <h4 class="blue" style=" font-weight: bold;">${this.datePipe.transform(info.event.start, 'MMMM d, y')}</h4>`;
            let moringSlots = info.event.extendedProps.morningSlots;
            if (moringSlots.length > 0) {
              html += `      <h4 >Morning</h4>`;
              html += `        <div class="col-md-12 text-center"> `;
              moringSlots.forEach((slot: AppointmentSlotDetailModel) => {
                if (slot.ID == this.appointment.AppointmentSlotID) {
                  html += `          <button type="button" class="btn btn-green square btn-min-width mr-1 mb-1" id="btn_${slot.ID}" time="${slot.StartTime}">${this.datePipe.transform(moment(slot.StartTime).local(), 'hh:mm a')}</button>`;
                }
                else {
                  html += `          <button type="button" class="btn btn-medical-white square btn-min-width mr-1 mb-1" id="btn_${slot.ID}" time="${slot.StartTime}">${this.datePipe.transform(moment(slot.StartTime).local(), 'hh:mm a')}</button>`;
                }
              });
              html += `        </div>`;
            }

            let eveningSlots = info.event.extendedProps.eveningSlots;
            if (eveningSlots.length > 0) {
              html += `      <h4 >Afternoon/Evening</h4>`;
              html += `        <div class="col-md-12 text-center"> `;
              eveningSlots.forEach((slot: AppointmentSlotDetailModel) => {
                if (slot.ID == this.appointment.AppointmentSlotID) {
                  html += `          <button type="button" class="btn btn-medical-white square btn-min-width mr-1 mb-1" id="btn_${slot.ID}" time="${slot.StartTime}">${this.datePipe.transform(moment(slot.StartTime).local(), 'hh:mm a')}</button>`;
                }
                else {
                  html += `          <button type="button" class="btn btn-medical-white square btn-min-width mr-1 mb-1" id="btn_${slot.ID}" time="${slot.StartTime}">${this.datePipe.transform(moment(slot.StartTime).local(), 'hh:mm a')}</button>`;
                }
              });
              html += `        </div>`;
            }

            html += `    </div>`;
            html += `  </div>`;

            let eleHtml = $(html);
            eleHtml.find('a').off('click');
            eleHtml.find('a').on('click', (event) => {
              this.closeTimes(id);
              event.preventDefault();
              return false;
            });
            eleHtml.find('button').on('click', (event) => {
              if (event && event.target) {
                let time = $(event.target).attr('time');
                this.selectedSlot(event.target.id, time);
              }
              event.preventDefault();
              return false;
            });
            lastParent.after(eleHtml);
          }
        }
      }
    });

    this.calendar.render();
  }

  closeTimes(id) {
    $(`#${id}`).remove();
  }

  selectedSlot(id, time) {
    var realId = id.replace('btn_', '');
    var currentSlot = $(`#${id}`);

    var selectedDate = this.datePipe.transform(time, 'yyyy-MM-dd');
    if (selectedDate) {
      $(`.fc-day.fc-widget-content`).html('');
      $(`.fc-day.fc-widget-content[data-date=${selectedDate}]`).html('<i class="la la-check-circle text-success" style="font-size:20px;"></i>');
    }

    if (this.appointment.AppointmentSlotID == realId) {
      this.appointment.AppointmentSlotID = null;
      this.appointment.AppointmentTime = null;
      currentSlot.removeClass();
      currentSlot.addClass('btn btn-medical-white square btn-min-width mr-1 mb-1');
    }
    else {
      if (this.appointment.AppointmentSlotID) {
        $(`#btn_${this.appointment.AppointmentSlotID}`).removeClass();
        $(`#btn_${this.appointment.AppointmentSlotID}`).addClass('btn btn-medical-white square btn-min-width mr-1 mb-1');
      }

      this.appointment.AppointmentSlotID = realId;
      this.appointment.AppointmentTime = time;
      currentSlot.removeClass();
      currentSlot.addClass('btn btn-green square btn-min-width mr-1 mb-1');
    }
    return;
  }

  generateEvents(list, start_date, end_date) {
    var arr = [];
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

  changeDate(event) {
    var startDate = event;
    this.appointmentslotService.GetAvaiableAppointmentSlots({ RequestDate: startDate, ProviderID: this.provider.ProviderID , IsFU: this.isFU })
      .subscribe(r => {
        this.slot = r;
    });
  }

  ConvertDateToStringLocal(date) {
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

  selectSlot(slot) {
    this.appointment.AppointmentSlotID = slot.ID;
    this.appointment.AppointmentTime = slot.StartTime;
  }

}
