import { Directive, AfterViewInit, ElementRef } from '@angular/core';
import { NgModel } from '@angular/forms';
declare var $: any;

@Directive({
  selector: '[ngModel][appColorPicker]',
  providers: [NgModel]
})
export class ColorPickerDirective implements AfterViewInit {
  constructor(private ele: ElementRef, private ngModel: NgModel) {
    this.ngModel.valueChanges.subscribe(r => {
      if (r)
        $(this.ele.nativeElement).ColorPickerSetColor(r);
    });
  }

  ngAfterViewInit() {
    this.register();
  }
  register() {
    $(this.ele.nativeElement).ColorPicker({
      eventName: 'click',
      onChange: function (hsb, hex, rgb, el) {
        this.ngModel.update.emit(`#${hex}`);
      }.bind(this) 
    });
  }
}
