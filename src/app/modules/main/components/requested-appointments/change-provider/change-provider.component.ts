import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { UserService } from 'src/app/modules/common/services/user.service';
import UserModel from 'src/app/modules/common/models/user.model';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-change-provider',
  templateUrl: './change-provider.component.html',
  styleUrls: ['./change-provider.component.css']
})
export class ChangeProviderComponent extends BaseComponent implements OnInit {
  @ViewChild('childModal') modal: ModalDirective;
  @ViewChild('f') form:NgForm;
  list:Array<UserModel>  = new Array<UserModel>();
  appointmentId:string;
  @Output() onClosed:EventEmitter<boolean> = new EventEmitter();
  currentProvider:UserModel;
  selectedProvider:string;
  constructor(authService:AuthenticationService , 
    private userService:UserService,
    private dialog:CommonDialogService,
    private appointmentService:AppointmentService
    ) {
    super(authService);
   }

  ngOnInit() {

  }

  getProviders(){
    this.userService.GetProviders().subscribe(r=>{
      this.list  = r;
      
    })
  }

  update() {
    this.appointmentService.ChangeProvider(this.appointmentId, this.selectedProvider).subscribe(r=>{
       this.dialog.showToastrSuccess('Change Provider',MessageConstant.REQUEST_SUCCESS_CONST);
       this.onClosed.emit(true);
       this.hide();
    },error=>{
      this.dialog.showSwalErrorAlert('Error',MessageConstant.FAILURE_REQUEST);
    });
  }

  show(id , currentProvider){
    this.selectedProvider = null;
    this.currentProvider = currentProvider;
    this.appointmentId = id;
    this.getProviders();
    this.modal.show();
  }

  hide(){
    this.form.resetForm();
    this.modal.hide();
  } 
}
