import { Directive, ElementRef, AfterViewInit, OnChanges, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';
declare var $: any;
@Directive({
  selector: '[appICheck]',
  providers: [NgModel]
})
export class ICheckDirective implements AfterViewInit ,OnChanges {
  @Input()
  ngModel!: NgModel;
  IsFirst:boolean=false;
  @Output() onChanged:EventEmitter<boolean> = new EventEmitter();
  constructor(private ele: ElementRef, private ngModel1: NgModel) {

  }

  ngOnChanges(param:SimpleChanges){
    if (param && param['ngModel'] && param['ngModel'].currentValue && param['ngModel'].currentValue != param['ngModel'].previousValue) {
      if(this.IsFirst) return ;
      this.IsFirst=true;
      var value = param['ngModel'].currentValue;
      $(this.ele.nativeElement).iCheck(value?'check':'uncheck');
    }
  }

  ngAfterViewInit() {
    $(this.ele.nativeElement).iCheck({
      checkboxClass: 'icheckbox_flat-green',
      radioClass: 'iradio_flat-green',
    });
    $(this.ele.nativeElement)
      .on('ifChecked',  (e: any) => {
        this.ngModel1.update.emit(true);
        this.onChanged.emit(true);
      })
      .on('ifUnchecked',  (e: any) => {
        this.ngModel1.update.emit(false);
        this.onChanged.emit(false);
      })
  }
}
