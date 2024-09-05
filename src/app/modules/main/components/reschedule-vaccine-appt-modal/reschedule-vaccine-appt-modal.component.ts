import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { BaseComponent } from 'src/app/modules/base.component';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { AppointmentSlotCriteria } from 'src/app/modules/common/criterias/appointment-slot.criteria';
import { AppointmentSlotGroupModel } from 'src/app/modules/common/models/appointment-slot-group.model';
import { VaccineApptModel } from 'src/app/modules/common/models/vaccin-appt.model';
import { AppointmentSlotService } from 'src/app/modules/common/services/appointment-slot.service';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
declare var moment:any;
@Component({
  selector: 'app-reschedule-vaccine-appt-modal',
  templateUrl: './reschedule-vaccine-appt-modal.component.html',
  styleUrls: ['./reschedule-vaccine-appt-modal.component.css']
})
export class RescheduleVaccineApptModalComponent extends  BaseComponent implements OnInit {
  model: VaccineApptModel = new VaccineApptModel();  
  slot: AppointmentSlotGroupModel;  
  criteria:AppointmentSlotCriteria = new AppointmentSlotCriteria();
  pickedDate:Date;
  @ViewChild('childModal') modal:ModalDirective;
  @Output() onClosed :EventEmitter<boolean> = new EventEmitter();
  id:string;
  @ViewChild('f') f:NgForm;
  constructor(authService:AuthenticationService,
    private appointmentService:AppointmentService , 
    private appointmentSlotService:AppointmentSlotService ,
    private dialog :CommonDialogService) {
    super(authService);
  }

  ngOnInit(): void {
  }

  getEntity(id){
    this.appointmentService.GetVaccineScheduleApptById(id).subscribe(r=>{
      this.model = r;
      this.modal.show(); 
    },error=>{
      this.dialog.showSwalErrorAlert('Reschedule Vaccine Appt', MessageConstant.FAILURE_REQUEST);
    });
  }

  show(id){
    this.id = id;
    this.criteria.StartTime =  new Date(new Date().toDateString()); 
    this.getSlots();
    this.getEntity(id);
  }

  hide(){
    this.modal.hide();
  }

  changeDate(event) {
    this.criteria.StartTime = event; 
    this.getSlots();
  }

  ConvertDateToStringLocal(date) {
    if (date) {
      date = date.replace('Z', '');
      return moment(date).format('MMM D, Y');
    }
    return ''
  }
 

  getSlots() {
    this.slot = null;
    this.appointmentSlotService.GetAvaiableVaccineAppointmentSlots(this.criteria).subscribe(r => {
      this.slot = r;
    });
  } 
  save() {
     this.appointmentService.RescheduleVaccineScheduleAppt(this.model).subscribe(r=>{
      if(r){
        this.dialog.showSwalSuccesAlert('Reschedule Vaccine Appointment', MessageConstant.REQUEST_SUCCESS_CONST);
        this.onClosed.emit(true);
        this.hide();
      }
     },error=>{
       this.dialog.showSwalErrorAlert('Reschedule Vaccine Appointment', 'Sorry, Maybe it was booked by another, please select another')
     })
  } 

  getCurrentTimezoneInfo() {
    var hours = new Date().getTimezoneOffset() / 60;
    return `${Intl.DateTimeFormat().resolvedOptions().timeZone} UTC (${(hours > 0 ? '-' + hours.toString() : hours.toString())})`;
  } 

  selectSlot(slot) {
    this.model.SlotID = slot.ID;
    this.model.ApptTime = slot.StartTime;
  } 

}
