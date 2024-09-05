import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { AppointmentReasonService } from 'src/app/modules/common/services/appointment-reason.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { AppointmentReasonModel } from 'src/app/modules/common/models/appointment-reason.model';
import { NgForm } from '@angular/forms';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';

@Component({
  selector: 'app-appointment-reason-info',
  templateUrl: './appointment-reason-info.component.html',
  styleUrls: ['./appointment-reason-info.component.css']
})
export class AppointmentReasonInfoComponent extends BaseComponent implements OnInit {
  @ViewChild('childModal') modal:ModalDirective;
  @Output() onClosed:EventEmitter<boolean> = new EventEmitter();
  @ViewChild('f') form:NgForm;
  model:AppointmentReasonModel = new AppointmentReasonModel();
  isEdit:boolean=false;
  constructor( authService:AuthenticationService , 
    private dialog:CommonDialogService,
    private appointmentReasonService:AppointmentReasonService) {

    super(authService);
  }

  ngOnInit() {
  }

  show(isEdit, item){
    this.isEdit = isEdit;
    this.model = isEdit?item:new AppointmentReasonModel();
    this.modal.show();
  }

  hide(){
    this.form.resetForm();
    this.modal.hide();
  }

  save(){
    if( this.isEdit){
      this.appointmentReasonService.Edit(this.model).subscribe(r=>{
        this.dialog.showToastrSuccess('Appointment Reason', MessageConstant.REQUEST_SUCCESS_CONST);
        this.onClosed.emit(true);
        this.hide();
      },error=>{
        this.dialog.showSwalErrorAlert('Appointment Reason',MessageConstant.FAILURE_REQUEST);
      });
    }
    else{
      this.appointmentReasonService.Create(this.model).subscribe(r=>{
        this.dialog.showToastrSuccess('Appointment Reason', MessageConstant.REQUEST_SUCCESS_CONST);
        this.onClosed.emit(true);
        this.hide();
      },error=>{
        this.dialog.showSwalErrorAlert('Appointment Reason',MessageConstant.FAILURE_REQUEST);
      });
    }
  }

}
