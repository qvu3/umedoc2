import { Directive, Output, EventEmitter, ElementRef, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgModel } from '@angular/forms';
declare var $: any;
@Directive({
  selector: '[appSwitchBoot]',

  providers: [NgModel]
})
export class SwitchBootDirective implements AfterViewInit, OnChanges {
  @Input() ngModel!: NgModel
  @Output() onChanged: EventEmitter<boolean> = new EventEmitter()
  IsFirst: boolean = false;
  constructor(private ele: ElementRef) {

  }

  ngOnChanges(param: SimpleChanges) {
    if (param && param['ngModel'] && param['ngModel'].currentValue && param['ngModel'].currentValue != param['ngModel'].previousValue) {
      if (this.IsFirst) return;
      this.IsFirst = true;
      var value = param['ngModel'].currentValue;
      $(this.ele.nativeElement).bootstrapSwitch('toggleState');
    }
  }

  ngAfterViewInit() {
    $(this.ele.nativeElement)
      .bootstrapSwitch()
      .on('switchChange.bootstrapSwitch',
         (e: any, data: any) => {
          this.onChanged.emit(data);
        });
  }
}
