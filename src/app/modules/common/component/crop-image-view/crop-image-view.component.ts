import { Component, OnInit, ViewChild, forwardRef, Input, EventEmitter, Output } from '@angular/core';
import { CropImageComponent } from '../crop-image/crop-image.component';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ProviderProfileService } from '../../services/provider-profile.service';
import { CommonDialogService } from '../../services/dialog.service';
const TYPE_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CropImageViewComponent),
  multi: true
};
@Component({
  selector: 'app-crop-image-view',
  templateUrl: './crop-image-view.component.html',
  styleUrls: ['./crop-image-view.component.css'],
  providers: [TYPE_CONTROL_ACCESSOR]
})
export class CropImageViewComponent implements OnInit, ControlValueAccessor  {
  public value!: string;
  private onTouch: any = () => { };
  private onModelChange: any = () => { };
  @Input()
  ModelID!: string;
  @Input()
  userId!: string;
  @Input()
  typeUpload!: string;
  @Input()
  link!: string;
  @Input() autoSave:boolean =false; 
  @ViewChild('cropImageApp')
  cropImageApp!: CropImageComponent;
  constructor(private providerProfileService:ProviderProfileService,
    private dialog:CommonDialogService) { }

  ngOnInit() {
  }

  cropImage(){
    this.cropImageApp.show();
  }

  changeAvatar(event: any){
    if(event){
      this.writeValue(event);
      if(this.autoSave && this.userId ){
        this.providerProfileService.AutoSaveAvatar(this.userId ,event).subscribe(r=>{
          if(r){
            this.dialog.showToastrSuccess('Avatar','Your avatar changed successfuly');
          }
        },error=>{
          this.dialog.showToastrError('Avatar', 'Cannot save your avatar, please try again');
        });
      }
    }
  }

  writeValue(obj: any): void { 
    this.value = obj;
    this.onModelChange(obj);
    this.onTouch(obj); 
  }

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
