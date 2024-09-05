import { AfterViewInit, Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/modules/base.component';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { AppointmentSlotCriteria } from 'src/app/modules/common/criterias/appointment-slot.criteria';
import { AppointmentSlotGroupModel } from 'src/app/modules/common/models/appointment-slot-group.model';
import { VaccineApptModel } from 'src/app/modules/common/models/vaccin-appt.model';
import { AppointmentSlotService } from 'src/app/modules/common/services/appointment-slot.service';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { PatientProfileService } from 'src/app/modules/common/services/patient-profile.service';
declare var moment:any;
@Component({
  selector: 'app-vaccine-schedule-step-two',
  templateUrl: './vaccine-schedule-step-two.component.html',
  styleUrls: ['./vaccine-schedule-step-two.component.css']
})
export class VaccineScheduleStepTwoComponent  extends BaseComponent implements AfterViewInit {
   
  model: VaccineApptModel = new VaccineApptModel();  
  slot: AppointmentSlotGroupModel;  
  criteria:AppointmentSlotCriteria = new AppointmentSlotCriteria();
  pickedDate:Date;
  constructor(private authService: AuthenticationService, 
    private appointmentSlotService: AppointmentSlotService, 
    private appointmentService:AppointmentService,
    private patientService:PatientProfileService,
    private dialog :CommonDialogService,
    private router: Router) {
    super(authService); 

  }

  ngAfterViewInit(): void {  
    this.criteria.StartTime = new Date(new Date().toDateString()); 
    this.checkHasCompletedAppt();
    this.model = Object.assign({},this.authenticationService.vaccineAppointment);
    this.model.PatientID = this.authService.AppointmentPatientID;
    
  }

  checkHasCompletedAppt() {
    this.patientService.CheckExistedApptCompleted(this.currentUser.Id).subscribe(r => {
      if (!r) {
        this.router.navigateByUrl('/');
      }
      else{
        this.getSlots();
      }
    });
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
     this.appointmentService.CreateVaccineScheduleAppt(this.model).subscribe(r=>{
      if(r){
        this.authenticationService.vaccineAppointment = new VaccineApptModel();
        this.dialog.showSwalSuccesAlert('Vaccine Schedule', MessageConstant.REQUEST_SUCCESS_CONST);
        this.router.navigate(['/vaccine-schedule-appointment-confirmation', r]);
      }
     },error=>{
       this.dialog.showSwalErrorAlert('Vaccine Schedule', 'Sorry, Maybe it was booked by another, please select another')
     })
  }

  prev() {
    this.router.navigate(['/vaccine-appt-schedule']);
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
