import UserModel from 'src/app/modules/common/models/user.model';

import { UserService } from './../../../common/services/user.service';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { AppointmentSlotCriteria } from './../../../common/criterias/appointment-slot.criteria';
import timeGridPlugin from '@fullcalendar/timegrid';
import { DatePipe } from '@angular/common';
import { CommonDialogService } from './../../../common/services/dialog.service';
import { AppointmentSlotService } from './../../../common/services/appointment-slot.service';
import { AuthenticationService } from './../../../common/services/authentication.service';
import { AppointmentSlotModel } from './../../../common/models/appointment-slot.model';
import { BaseComponent } from './../../../base.component';
import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

import interactionPlugin from '@fullcalendar/interaction';
import { Calendar } from '@fullcalendar/core';
import resourceTimeGrid from '@fullcalendar/resource-timegrid';
declare var moment: any;
declare var $: any;

@Component({
  selector: 'app-provider-appointment-slot',
  templateUrl: './provider-appointment-slot.component.html',
  styleUrls: ['./provider-appointment-slot.component.css'],
  providers: [DatePipe]
})
export class ProviderAppointmentSlotComponent extends BaseComponent implements AfterViewInit {
  @ViewChild('scheduler', { static: false }) scheduler: ElementRef;
  optionsProvider: Options = {
    multiple: true,
    allowClear: true,
    maximumSelectionLength:11
  };
  bkProviders: UserModel[] = [];
  providers: Array<Select2OptionData> = [];
  providerIds: string[] = [];
  appointmentslots: Array<AppointmentSlotModel> = new Array<AppointmentSlotModel>();
  calendar: any;
  constructor(authService: AuthenticationService,
    private userService: UserService,
    private appointmentslotService: AppointmentSlotService,
    private dialog: CommonDialogService,
    private datePipe: DatePipe,
  ) {
    super(authService);
  }

  ngAfterViewInit(): void {
    this.getProviderList();
    this.init();
  }

  getProviderList() {
    this.providers = new Array<Select2OptionData>();
    this.userService.GetProviders().subscribe(r => {
      if (r) {
        this.bkProviders = r;
        var list = r.map(x => {
          return { id: x.Id, text: `${x.FirstName} ${x.LastName}` } as Select2OptionData;
        });
        if (list) {
          this.providers = list;
        }
      }
    });
  }


  search() {
    if (this.calendar) {
      this.calendar.refetchEvents();
      this.calendar.refetchResources();
    }
  }

  getResources() {
    if (this && this.providerIds && this.bkProviders) {
      var resources = this.bkProviders.filter(x => this.providerIds.includes(x.Id))
        .map(x => ({ id: x.Id, title: `${x.FirstName} ${x.LastName}` }));
      return resources;
    }
    return [];
  }

  init() {
    this.calendar = new Calendar(this.scheduler.nativeElement, {
      schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
      editable: true,
      selectable: true,
      droppable: true,
      height: 'auto',
      eventColor: 'transparent',
      eventBackgroundColor: 'transparent',
      nowIndicator: true,
      allDaySlot: false,
      datesAboveResources:true,
      minTime: "07:00:00",
      maxTime: "19:00:00",
      plugins: [interactionPlugin, resourceTimeGrid],
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'resourceTimeGridWeek,resourceTimeGridDay'
      },
      loading: (isLoading) => {
        if (isLoading)
          $('#calendarLoading').show();
        else
          $('#calendarLoading').hide();
      },
      defaultView: 'resourceTimeGridWeek',
      resources: (fetchInfo, successCallback, failureCallback) => {
        var r = this.getResources();
        successCallback(r);
      },
      events: (info, successCallback, failureCallback) => {
        if (info && successCallback && failureCallback) {
          var criteria = new AppointmentSlotCriteria();
          criteria.StartTime = info.start;
          criteria.EndTime = info.end;
          criteria.ProviderIds = this.providerIds;
          this.appointmentslotService.GetDefaultAppointmentSlotsByProviders(criteria).subscribe(r => {
            if (r) {
              var result = this.generateEvents(r, info.start, info.end);
              successCallback(result);
            }
            else {
              successCallback([]);
            }
          });
        }
      },
      eventRender: (info) => {
        var element = $(info.el);
        if (element) {
          element.find('.fc-content').remove();
          var desciption = this.datePipe.transform(info.event.start, 'shortTime');
          element.popover({
            title: '',
            content: desciption,
            trigger: 'hover',
            placement: 'top',
            container: 'body'
          });

          if (info.event.extendedProps.description == 'BOOKED') {
            var html = `<div class="time-content" style="  
                      width: 100%; 
                      justify-content: center;
                      vertical-align: middle;
                      text-align: center;
                      "> <button type="button" class="btn btn-danger square" style="padding: 0.25rem 0.25rem;font-size: 0.875rem;line-height: 0.92;width: auto;" id="`+ info.event.extendedProps.resourceId + `" ><span>${info.event.extendedProps.description}</span></button> 
                    </div>`;

            element.html(html);
            element.draggable = false;
          } else if (info.event.extendedProps.description == 'Unavailable') {
            var html = `<div class="time-content" style="  
                      width: 100%; 
                      justify-content: center;
                      vertical-align: middle;
                      text-align: center;
                      "> <button type="button" class="btn btn-light square" style="padding: 0.25rem 0.25rem;font-size: 0.875rem;line-height: 0.92;width:auto;" id="`+ info.event.extendedProps.resourceId + `" ><span style="color:black;">${info.event.extendedProps.description}</span></button> 
                    </div>`;

            element.html(html);
          } else if (info.event.extendedProps.description == 'Available') {
            var html = `<div class="time-content" style="  
                    width: 100%; 
                    justify-content: center;
                    vertical-align: middle;
                    text-align: center;
                    "  > <button type="button" class="btn btn-green square" style="padding: 0.25rem 0.25rem;font-size: 0.875rem;line-height: 0.92;width: auto;" id="`+ info.event.extendedProps.resourceId + `" ><span style="color:white;">Avail</span></button> 
                  </div>`;

            element.html(html);
          }
        }
      },
      eventClick: (info: any) => {
        if (this.isPastDate(info.event.start)) return;
        // If status is BOOKED not change status
        if (info.event.extendedProps.description == 'BOOKED') return;

        // If choice date < current date and status is Unavailable not change status
        if (info.event && info.event.id) {
          var check = new Date(info.event.start);
          var today = new Date();
          if (check < today) {
            if (info.event.extendedProps.description == 'Unavailable') {
              return;
            }
          }

          // Update status appointment slot
          var entity = new AppointmentSlotModel();
          entity.ID = info.event.id;
          entity.StartTime = info.event.start;
          entity.EndTime = info.event.end;
          entity.ProviderID = info.resource.id;
          this.appointmentslotService.UpdateAppointmentSlot(entity).subscribe(r => {
            if (r) {
              this.calendar.refetchEvents();
            }
            else {
              this.dialog.showSwalErrorAlert("Error", 'Change status error?');
            }
          });
        }
      },
      eventDrop: (info: any) => {
        if (this.isPastDate(info.oldEvent.start)) {
          info.revert();
          return;
        };
        if (info.delta) {
          var delta = info.delta;
          var isReverted = false;
          if (delta.days > 0 || delta.months > 0 || delta.years > 0) {
            isReverted = true;
          }
          else if (!delta.milliseconds) {
            isReverted = true;
          }
          if (!isReverted) {
            var entity = new AppointmentSlotModel();
            if (info.event.id) {
              entity.ID = info.event.id;
            }
            entity.StartTime = info.oldEvent.start;
            entity.EndTime = info.event.start;
            entity.ProviderID = info.resource.id;
            this.appointmentslotService.CreateRange(entity).subscribe(r => {
              this.calendar.refetchEvents();
            });
          }
        }
        info.revert();
        $('.popover').hide();
      },
      dateClick: (info: any) => {
        if (this.isPastDate(info.date)) return;
        let start = info.date;
        let end = new Date(info.date);
        end.setMinutes(info.date.getMinutes() + 30);

        // Update status appointment slot
        var entity = new AppointmentSlotModel();
        entity.StartTime = start;
        entity.EndTime = end;
        entity.ProviderID = info.resource.id;
        this.appointmentslotService.UpdateAppointmentSlot(entity).subscribe(r => {
          if (r) {
            this.calendar.refetchEvents();
          }
          else {
            this.dialog.showSwalErrorAlert("Error", 'Change status error?');
          }
        });
      },
      select: (info: any) => {
        if (this.isPastDate(info.start)) return;
        if (this.isSelectSlots(info.start, info.end)) {
          let endTime = info.end;
          endTime.setMinutes(info.end.getMinutes() - 30);
          var entity = new AppointmentSlotModel();
          entity.StartTime = info.start;
          entity.EndTime = endTime;
          entity.ProviderID = info.resource.id;
          this.appointmentslotService.CreateRange(entity).subscribe(r => {
            this.calendar.refetchEvents();
          });
        }
      }
    });

    var columnCount = $('.fc-agendaDay-view th.fc-resource-cell').length;
    var viewWidth = $('.fc-view-container').width();
    var minViewWidth = 18 + columnCount * 100;
    if (minViewWidth > viewWidth) {
      $('.fc-view.fc-agendaDay-view.fc-agenda-view').css('width', minViewWidth + 'px');
    }

    this.calendar.render();
  }

  generateEvents(list, start_date, end_date) {
    var arr = [];
    if (list) {
      list.forEach(c => {
        let r = {
          id: c.ID,
          start: c.StartTime,
          end: c.EndTime,
          description: c.AppointmentSlotStatus,
          resourceId: c.ProviderID,
        };
        arr.push(r);
      });
    }

    return arr;
  }

  isPastDate(start) {
    return start < new Date();
  }

  isSelectSlots(start, end) {
    if (end > start && start > new Date()) {
      start = moment(start);
      let endTime = moment(end);
      var diffInMinutes = endTime.diff(start, 'minutes');
      return diffInMinutes > 30;
    }
    return false;
  }
}
