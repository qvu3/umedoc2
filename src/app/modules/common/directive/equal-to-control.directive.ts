import { Directive, forwardRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appEqualToControl]',
  providers: [
    {
      provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualToControlDirective),
      multi: true
    }
  ]
})
export class EqualToControlDirective implements Validator , OnChanges{
  @Input() equalControl: FormControl;
  _control: AbstractControl;
  constructor() { }
 
  ngOnChanges(params: SimpleChanges) {
    if(params && params.gtTo && params.gtTo.currentValue && params.gtTo.currentValue!= params.gtTo.previousValue)
    {
      this.equalControl.valueChanges.subscribe(r => {
        if (this._control) {
          this._control.updateValueAndValidity();
        }
      });
    }
  }

  validate(c: AbstractControl) {
    this._control = c;
    if (!c.value) return null;
    return c.value === this.equalControl.value ? null : { equalC: true };
  }

}
