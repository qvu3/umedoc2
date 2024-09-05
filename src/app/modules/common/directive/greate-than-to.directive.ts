import { Directive, Input, forwardRef, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
 


@Directive({
  selector: '[appGreateThanTo]',
  providers: [
    {
      provide: NG_VALIDATORS, useExisting: forwardRef(() => GreateThanToDirective),
      multi: true
    }
  ]
})
export class GreateThanToDirective implements Validator, OnChanges {
  @Input() gtTo: FormControl;
  _control: AbstractControl;
  constructor() {
     
  }

  ngOnChanges(params: SimpleChanges) {
    if(params && params.gtTo && params.gtTo.currentValue && params.gtTo.currentValue!= params.gtTo.previousValue)
    {
      this.gtTo.valueChanges.subscribe(r => {
        if (this._control) {
          this._control.updateValueAndValidity();
        }
      });
    }
  }

  validate(c: AbstractControl) {
    this._control = c;
    if (!c.value) return null;
    return c.value > this.gtTo.value ? null : { gtt: true };
  }

}
