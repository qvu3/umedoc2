import timeGridPlugin from '@fullcalendar/timegrid';
import { AppointmentSlotCriteria } from 'src/app/modules/common/criterias/appointment-slot.criteria';
import resourceTimeGrid from '@fullcalendar/resource-timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DatePipe } from '@angular/common';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { AppointmentSlotService } from 'src/app/modules/common/services/appointment-slot.service';
import { UserService } from 'src/app/modules/common/services/user.service';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { AppointmentSlotModel } from 'src/app/modules/common/models/appointment-slot.model';
import { Select2OptionData } from 'ng-select2';
import UserModel from 'src/app/modules/common/models/user.model';
import { Options } from 'select2';
import { BaseComponent } from 'src/app/modules/base.component';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
declare var moment: any;
declare var $: any;
@Component({
  selector: 'app-provider-view-calendar',
  templateUrl: './provider-view-calendar.component.html',
  styleUrls: ['./provider-view-calendar.component.css'],
  providers: [DatePipe]
})
export class ProviderViewCalendarComponent extends BaseComponent implements AfterViewInit {
  @ViewChild('scheduler', { static: false }) scheduler: ElementRef;
  optionsProvider: Options = {
    multiple: true,
    allowClear: true,
  };
  bkProviders: UserModel[] = [];
  providers: Array<Select2OptionData> = [];
  providerIds: string[] = [];
  appointmentslots: Array<AppointmentSlotModel> = new Array<AppointmentSlotModel>();
  calendar: any;
  colors: string[] = ['#4287f5', '#2a8c81', '#ed555d', '#5bb075', '#ed9a34', '#f285f0', '#b56905', '#a89e0d', '#7fa80d', '#17a80d', '#0da898'];
  providerColors: any[] = [];
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

  getProviderColor(providerId) {
    let p: any = this.providerColors.find((x: any) => x.ProviderId == providerId);
    if (!p) {
      let index = (this.providerColors.length - 1) < 0 ? 0 : (this.providerColors.length - 1) + 1;
      let pp: any = { ProviderId: providerId, Color: this.colors[index] };
      this.providerColors.push(pp);
      return pp.Color;
    }
    return p.Color;
  }

  init() {
    this.calendar = new Calendar(this.scheduler.nativeElement, {
      schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
      editable: false,
      selectable: false,
      droppable: false,
      height: 'auto', 
      nowIndicator: true,
      allDaySlot: false,
      slotDuration: "00:30:00",
      minTime: "07:00:00",
      maxTime: "19:00:00",
      plugins: [interactionPlugin, timeGridPlugin],
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
          // this.appointmentslotService.UpdateAppointmentSlot(entity).subscribe(r => {
          //   if (r) {
          //     this.calendar.refetchEvents();
          //   }
          //   else {
          //     this.dialog.showSwalErrorAlert("Error", 'Change status error?');
          //   }
          // });
        }
      },
    }); 
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
          title:`${c.ProviderUser.FirstName} ${c.ProviderUser.LastName}  - ${c.AppointmentSlotStatus}`,
          description: c.AppointmentSlotStatus,
          resourceId: c.ProviderID,
          backgroundColor: this.getProviderColor(c.ProviderID),
          textColor:'#FFF'
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
