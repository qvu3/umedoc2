import { DatePipe } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AppointmentSlotCriteria } from '../criterias/appointment-slot.criteria';


import { ProviderCountOnDateCriteriaModel, ProviderCountOnDateViewModel } from '../models/provider-count-on-date.model';
import { AppointmentSlotService } from '../services/appointment-slot.service'; 
import { ProviderProfileService } from '../services/provider-profile.service';
declare var moment: any;
declare var $: any;
@Directive({
  selector: '[appDateTimeInlinePicker]',
  providers: [DatePipe]
})
export class DateTimeInlinePickerDirective implements AfterViewInit, OnChanges {
  @Input()
  state!: string;
  @Input()
  gender!: string;
  @Input()
  code!: string;
  @Input()
  language!: string;
  @Input()
  providerId!: string;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @Input() isCountSlot:boolean = false;
  startDate!: Date;
  endDate!: Date;
  criteria: ProviderCountOnDateCriteriaModel = new ProviderCountOnDateCriteriaModel();
  providerCountInfos: ProviderCountOnDateViewModel[] = [];
  @Input() needCount: boolean = true;
  constructor(private ele: ElementRef,
    private datePipe: DatePipe,
    private appointmentSlotService:AppointmentSlotService,
    private providerProfileService: ProviderProfileService) {

  }

  ngAfterViewInit() {
    $(this.ele.nativeElement).datepicker({
      minDate: 0,
      create: function () {
        console.log('create');
      },
      onChangeMonthYear: (year: number, month: number, datepicker: any) => {
        this.startDate = new Date(year, month - 1, 1, 0, 0, 0);
        this.endDate = new Date(year, month, 0, 24, 0, 0);
        this.getProviderCount(this.criteria);
        this.getSlotVaccineCount();
      },
      onSelect:  (date: Date, datepicker: any) => {
        date = new Date(`${date} 00:00:00`);
        this.onChange.emit(date);
        setTimeout(() => {
          this.generateEvents(this.providerCountInfos);
        }, 300);
      }
    }); 
    this.getSlotVaccineCount();
  }

  ngOnChanges(params: SimpleChanges) {
    if (params && params['isCountSlot'] && params['isCountSlot'].currentValue && params['isCountSlot'].currentValue != params['isCountSlot'].previousValue) {
      this.criteria.IsCountSlot = params['isCountSlot'].currentValue;
    }
    if (params && params['state'] && params['state'].currentValue && params['state'].currentValue != params['state'].previousValue) {
      this.criteria.State = params['state'].currentValue;
    }
    if (params && params['gender'] && params['gender'].currentValue != params['gender'].previousValue) {
      this.criteria.Gender = params['gender'].currentValue;
    }
    if (params && params['code'] && params['code'].currentValue && params['code'].currentValue != params['code'].previousValue) {
      this.criteria.ApptCategoryCode = params['code'].currentValue;
    }

    if (params && params['language'] && params['language'].currentValue != params['language'].previousValue) {
      this.criteria.Language = params['language'].currentValue;
    }
    if (params && params['providerId'] && params['providerId'].currentValue != params['providerId'].previousValue) {
      this.criteria.ProviderId = params['providerId'].currentValue;
    }
    this.getProviderCount(this.criteria);
  }

  getSlotVaccineCount() {
    if(this.needCount) return;
    let criteria = new AppointmentSlotCriteria();
    if (!this.startDate && !this.endDate) {
      var today = new Date();
      criteria.StartTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
      criteria.EndTime = new Date(today.getFullYear(), today.getMonth() + 1, 0, 24, 0, 0);
    }
    else {
      criteria.StartTime = this.startDate;
      criteria.EndTime = this.endDate;
    }
    this.appointmentSlotService.CountSlotsByDate(criteria)
      .subscribe(r => {
        this.providerCountInfos = r ?? [];
        setTimeout(() => {
          this.generateEvents(r);
        }, 300);
      });
  }

  getProviderCount(criteria: ProviderCountOnDateCriteriaModel) {
    if (!this.needCount) return;
    if (criteria && criteria.ApptCategoryCode && criteria.State) {
      if (!this.startDate && !this.endDate) {
        var today = new Date();
        criteria.StartDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
        criteria.EndDate = new Date(today.getFullYear(), today.getMonth() + 1, 0, 24, 0, 0);
      }
      else {
        criteria.StartDate = this.startDate;
        criteria.EndDate = this.endDate;
      }
      this.providerProfileService.GetCountProviderOnDate(criteria)
        .subscribe(r => {
          this.providerCountInfos = r ?? [];
          setTimeout(() => {
            this.generateEvents(r);
          }, 300);
        });
    }
  }

  generateEvents(list: ProviderCountOnDateViewModel[]) {
    $('span[class*=date_picker_bagde]').remove();
    if (list) {
      list.forEach((x: ProviderCountOnDateViewModel) => {
        $('.ui-datepicker-calendar').find('a[class*=ui-state-default]').each(
          (index: any, link: any) => {
            var parent = $(link).parent();
            if (parent) {
              var month = parent.attr('data-month');
              var year = parent.attr('data-year');
              if (month && year) {
                month = parseInt(month);
                year = parseInt(year);
                var date = $(link).text();
                if (date) {
                  date = parseInt(date);
                  var strcDate = this.datePipe.transform(new Date(year, month, date), 'yyyy-MM-dd');
                  var localDate = new Date(x.DateInfo);
                  var strsDate = this.datePipe.transform(localDate, 'yyyy-MM-dd');
                  if (strcDate == strsDate) {
                    parent.css('position', 'relative');
                    var badge = `<span class="date_picker_bagde badge" style="position: absolute;
                    left: 1px;
                    background-color: red;
                    color: white;
                    top: 0px;
                    padding-left: 4px;
                    padding-right: 4px;
                    font-size: 10px;
                    border-radius: 15px;">${x.Total}</span>`;
                    $(parent).append(badge);
                  }
                }
              }
            }
          }
        );
      });
    }
  }

}
