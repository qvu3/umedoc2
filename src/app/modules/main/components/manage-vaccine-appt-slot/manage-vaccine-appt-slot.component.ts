import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Calendar } from '@fullcalendar/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { VaccineApptSlotModel } from 'src/app/modules/common/models/vaccin-appt-slot.model';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';

import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';
import { AppointmentSlotCriteria } from 'src/app/modules/common/criterias/appointment-slot.criteria';
declare var $: any;
declare var moment: any;
@Component({
  selector: 'app-manage-vaccine-appt-slot',
  templateUrl: './manage-vaccine-appt-slot.component.html',
  styleUrls: ['./manage-vaccine-appt-slot.component.css'],
  providers: [DatePipe]
})
export class ManageVaccineApptSlotComponent extends BaseComponent implements AfterViewInit {
  @ViewChild('scheduler', { static: false }) scheduler: ElementRef;
  appointmentslots: Array<VaccineApptSlotModel> = new Array<VaccineApptSlotModel>();
  providerUserID: string;
  isDropping: boolean = false;
  constructor(authService: AuthenticationService,
    private appointmentService: AppointmentService,
    private dialog: CommonDialogService,
    private datePipe: DatePipe
  ) {
    super(authService);
  }

  ngAfterViewInit(): void {
    this.init();
  }

  init() {
    let calendar = new Calendar(this.scheduler.nativeElement, {
      editable: true,
      selectable: true,
      droppable: true,
      slotDuration:'00:05:00',
      height: 'auto',
      eventColor: 'transparent',
      eventBackgroundColor: 'transparent',
      nowIndicator: true,
      allDaySlot: false,
      plugins: [timeGridPlugin, interactionPlugin],
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'timeGridWeek,timeGridDay'
      },
      loading: (isLoading) => {
        if (isLoading)
          $('#calendarLoading').show();
        else
          $('#calendarLoading').hide();
      },
      defaultView: 'timeGridWeek',
      events: (info, successCallback, failureCallback) => {
        if (info && successCallback && failureCallback) {
          var criteria = new AppointmentSlotCriteria();
          criteria.StartTime = info.start;
          criteria.EndTime = info.end;

          this.appointmentService.GetVaccineSlots(criteria).subscribe(r => {
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

          if (info.event.extendedProps.vaccineApptId) {
            var html = `<div class="time-content"  style="  
                      width: 100%; 
                      justify-content: center;
                      vertical-align: middle;
                      text-align: center;
                      "> <button type="button" class="btn btn-danger square" style="padding: 0.25rem 0.55rem;font-size: 0.875rem;line-height: 0.75;width: 90%;"  ><span>BOOKED</span></button> 
                    </div>`;

            element.html(html);
          } else if (!info.event.extendedProps.vaccineApptId) {
            var html = `<div class="time-content" style="  
                    width: 100%; 
                    justify-content: center;
                    vertical-align: middle;
                    text-align: center;
                    "> <button type="button" class="btn btn-green square" style="padding: 0.25rem 0.55rem;font-size: 0.875rem;line-height: 0.75;width: 90%;" ><span style="color:white;">AVAILABLE</span></button> 
                  </div>`;

            element.html(html);
          }
        }
      },
      eventClick: (info) => {
        if (this.isPastDate(info.event.start)) return;
        // If status is BOOKED not change status
        if (info.event.extendedProps.vaccineApptId) return;

        // If choice date < current date and status is Unavailable not change status
        if (info.event && info.event.id) {
          var check = new Date(info.event.start);
          var today = new Date();
          if (check < today) {
            if (!info.event.extendedProps.vaccineApptId) {
              return;
            }
          }

          // Update status appointment slot
          var entity = new VaccineApptSlotModel();
          entity.ID = info.event.id;
          entity.StartTime = info.event.start;
          entity.EndTime = info.event.end;
          this.appointmentService.UpdateAppointmentSlot(entity).subscribe(r => {
            if (r) {
              calendar.refetchEvents();
            }
            else {
              this.dialog.showSwalErrorAlert("Error", 'Change status error?');
            }
          });

        }
      },
      eventDrop: (info) => {
        if (this.isPastDate(info.oldEvent.start)) {
          info.revert();
          return;
        };
        this.isDropping = true;
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
            this.isDropping = true;
            var entity = new VaccineApptSlotModel();
            if (info.event.id) {
              entity.ID = info.event.id;
            }
            entity.StartTime = info.oldEvent.start;
            entity.EndTime = info.event.start;
            this.appointmentService.CreateRange(entity).subscribe(r => {
              calendar.refetchEvents();
              this.isDropping = false;
            }, error => {
              this.isDropping = false;
            });
          }
        }
        info.revert();
        $('.popover').hide();
      },
      select: (info) => {
        if (this.isPastDate(info.start)) return;
        if (this.isSelectSlots(info.start, info.end)) {
          let endTime = info.end;
          endTime.setMinutes(info.end.getMinutes() - 5);
          var entity = new VaccineApptSlotModel();
          entity.StartTime = info.start;
          entity.EndTime = endTime;
          this.appointmentService.CreateRange(entity).subscribe(r => {
            calendar.refetchEvents();
          });
        }
      },
      dateClick: (info) => {
        if (this.isPastDate(info.date)) return;
        let start = new Date(info.date);
        let end = new Date(info.date);
        end.setMinutes(info.date.getMinutes() + 5);

        // Update status appointment slot
        var entity = new VaccineApptSlotModel();
        entity.StartTime = start;
        entity.EndTime = end;
        this.appointmentService.UpdateAppointmentSlot(entity).subscribe(r => {
          if (r) {
            calendar.refetchEvents();
          }
          else {
            this.dialog.showSwalErrorAlert("Error", 'Change status error?');
          }
        });
      }
    });

    calendar.render();
  }

  isPastDate(start) {
    return start < new Date();
  }

  isSelectSlots(start, end) {
    if (end > start) {
      start = moment(start);
      let endTime = moment(end);
      var diffInMinutes = endTime.diff(start, 'minutes');
      return diffInMinutes > 5;
    }
    return false;
  }

  generateEvents(list, start_date, end_date) {
    var arr = [];
    if (list) {
      list.forEach(c => {
        let r = {
          id: c.ID,
          resourceId: c.ProviderID,
          start: c.StartTime,
          end: c.EndTime,
          vaccineApptId: c.VaccineApptID
        };
        arr.push(r);
      });
    }

    return arr;
  }
}

