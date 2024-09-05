import { Component, OnInit, Input, forwardRef } from '@angular/core';

import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
const TYPE_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => EncryptTextBoxComponent),
  multi: true
};
@Component({
  selector: 'app-encrypt-text-box',
  templateUrl: './encrypt-text-box.component.html',
  styleUrls: ['./encrypt-text-box.component.css'],
  providers: [TYPE_CONTROL_ACCESSOR]
})
export class EncryptTextBoxComponent implements OnInit  , ControlValueAccessor{
  @Input('class') class:string="";
  @Input('placeholder') placeholder="";
  isFirst:boolean=false;
  public value:string;
  public valueBackup:string;
  private onTouch: any = () => { };
  private onModelChange: any = () => { };
  private onChange = (_: any) => { 
  };
  constructor() { }

  ngOnInit() {
    this.isFirst=true;
  }
  

  writeValue(obj: any): void { 
    this.valueBackup = this.value = obj;
    this.onChange(this.value);
    this.onModelChange(obj);
    this.onTouch(obj); 
    if(this.value && this.isFirst){
      this.value = '********************'+this.value.substr((this.value.length-5),this.value.length-1);
      this.isFirst=false;
    }
    
  }

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  focusIn(){ 
    this.value = this.valueBackup;
  }

  focusOut(){ 
    if(this.value){
      this.value = '********************'+this.value.substr((this.value.length-5),this.value.length-1);
    }
  }
}
