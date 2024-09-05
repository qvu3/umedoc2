import { Directive, AfterViewInit, ElementRef } from '@angular/core';
import { NgModel } from '@angular/forms';
declare var $: any;

@Directive({
  selector: '[ngModel][appColorPicker]',
  providers: [NgModel]
})
export class ColorPickerDirective implements AfterViewInit {
  constructor(private ele: ElementRef, private ngModel: NgModel) {
    // Check if valueChanges is not null before subscribing
    if (this.ngModel.valueChanges) {
      this.ngModel.valueChanges.subscribe(r => {
        if (r) {
          $(this.ele.nativeElement).ColorPickerSetColor(r);
        }
      });
    }
  }

  ngAfterViewInit() {
    this.register();
  }

  register() {
    $(this.ele.nativeElement).ColorPicker({
      eventName: 'click',
      onChange: function (this: ColorPickerDirective, hsb: any, hex: any, rgb: any, el: any) {
        // Use setValue to update the form control value
        this.ngModel.control.setValue(`#${hex}`);
      }
    });
  }
}
