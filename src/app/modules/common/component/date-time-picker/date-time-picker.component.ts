import { Component, OnInit, forwardRef, ElementRef, Input, ViewChild, AfterViewInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
const TYPE_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateTimePickerComponent),
  multi: true
};
declare var $: any;
@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.css'],
  providers: [TYPE_CONTROL_ACCESSOR, DatePipe]
})
export class DateTimePickerComponent implements AfterViewInit, ControlValueAccessor {
  @Input() hasTime: boolean = true;
  @Input() isDisabled: boolean = false;
  @Input() placeholder: string = '';
  @ViewChild('tapicker')
  tapicker!: ElementRef;
  @ViewChild('dapicker')
  dapicker!: ElementRef;
  @Input() isGreyColor: boolean = false;
  isFirst: boolean = false;
  @Input() isMaxCurrentDate: boolean = true;
  public value!: string;
  private onTouch: any = () => { };
  private onModelChange: any = () => { };
  private previewerControl: string = '';
  constructor(private datePipe: DatePipe, private ele: ElementRef) {
  }

  ngAfterViewInit() {
    this.isFirst = true;
    this.register();
  }

  register() {
    if (this.hasTime) {
      $(this.tapicker.nativeElement).pickatime({
        // Escape any “rule” characters with an exclamation mark (!).
        format: ' HH:i',
        formatLabel: 'HH:i',
        formatSubmit: 'HH:i',
        hiddenPrefix: 'prefix__',
        hiddenSuffix: '__suffix',
        onSet: this.onSetTimeAPicker.bind(this)
      });
    }
    var maxDate = new Date();
    var minDate = new Date();
    if (!this.isMaxCurrentDate) {
      maxDate.setFullYear(maxDate.getFullYear() + 20); 
      minDate.setFullYear(minDate.getFullYear() - 100); 
    }else{
      minDate.setFullYear(minDate.getFullYear() - 120);
    }

    $(this.dapicker.nativeElement).pickadate({
      labelMonthNext: 'Next month',
      labelMonthPrev: 'Previous month',
      labelMonthSelect: 'Pick a Month',
      labelYearSelect: 'Pick a Year',
      selectMonths: true,
      selectYears: 120,
      max: maxDate,
      min:minDate,
      format: 'mmm dd, yyyy',
      onSet: this.onSetDateAPicker.bind(this)
    });
  }

  onSetTimeAPicker(event: { select: number | undefined } | undefined) {
    this.isFirst = false;
    if (event !== undefined) {
      if (event.select !== undefined) {
        // get date selected
        const date = this.value;
        const dateString = date
          ? this.datePipe.transform(date, 'MM/dd/yyyy')
          : this.datePipe.transform(new Date(), 'MM/dd/yyyy');
  
        // Check if dateString is not null before using it
        if (dateString) {
          const date1 = new Date(dateString);
          const totalHours = Math.floor(event.select / 60);
          const totalMinutes = event.select % 60;
          const date2 = new Date(
            date1.getFullYear(),
            date1.getMonth(),
            date1.getDate(),
            totalHours,
            totalMinutes
          );
          this.writeValue(new Date(date2));
        } else {
          this.writeValue(null);
        }
      } else {
        this.writeValue(null);
      }
    }
  }
  

  onSetDateAPicker(event: { select: string | number | Date; highlight: string | any[]; }) {
    //this.isFirst = false;
    if (event) {
      if (event.select) {
        var date = new Date(event.select);
        //get time of timepicker
        let time = this.value;
        if (time != undefined) {
          var time1 = new Date(this.value);
          var hour = time1.getHours() ? time1.getHours() : 0;
          var minute = time1.getMinutes() ? time1.getMinutes() : 0;
          date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute);
        }
        this.writeValue(date);
      }
      else if (event && 'clear' in event) {
        this.writeValue(null, true);
        $(this.dapicker.nativeElement).pickadate('picker').set('select', null);
        //clear time 
        if (this.hasTime) {
          $(this.tapicker.nativeElement).pickatime('picker').set('select', null);
        }
      }
      else if (event.highlight && event.highlight.length == 3) {
        var dateHL = new Date(event.highlight[0], event.highlight[1], event.highlight[2]);
        this.writeValue(dateHL);
        this.dapicker && $(this.dapicker.nativeElement).pickadate('picker').set('select', dateHL);
      }
    }
  }

  writeValue(obj: any, isclear = false): void {

    if (obj && !(obj instanceof Date) && !isclear) {
      obj = new Date(obj);
    }

    this.value = obj;
    this.onModelChange(obj);
    this.onTouch(obj);
    if (obj) {
      this.isFirst = false;
      this.previewerControl = this.placeholder;
      $(this.dapicker.nativeElement).pickadate('picker').off('set');
      $(this.dapicker.nativeElement).pickadate('picker').set('select', obj);
      $(this.dapicker.nativeElement).pickadate('picker').on('set', this.onSetDateAPicker.bind(this));
      if (this.hasTime) {
        $(this.tapicker.nativeElement).pickatime('picker').off('set');
        $(this.tapicker.nativeElement).pickatime('picker').set('select', (obj.getHours() * 60 + obj.getMinutes()))
        $(this.tapicker.nativeElement).pickatime('picker').on('set', this.onSetTimeAPicker.bind(this));
      }
    } else if (!obj) {
      this.isFirst = false;
      this.previewerControl = '';
      this.dapicker && $(this.dapicker.nativeElement).pickadate('picker').set('select', null);
    }
  }

  registerOnChange(fn: any): void {

    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }


}
