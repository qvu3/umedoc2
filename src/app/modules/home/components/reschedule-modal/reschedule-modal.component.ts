import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { ModalDirective } from 'ngx-bootstrap';
import { ProviderProfileModel } from '../../../common/models/provider-profile.model';
import { NgForm } from '@angular/forms';
import { AppointmentModel } from '../../../common/models/appointment.model';
import { ScheduleProviderAppointmentComponent } from '../../../common/component/schedule-provider-appointment/schedule-provider-appointment.component';
import { AuthenticationService } from '../../../common/services/authentication.service';
import { ProviderProfileService } from '../../../common/services/provider-profile.service';
import { AppointmentService } from '../../../common/services/appointment.service';
import { AppointmentSlotService } from '../../../common/services/appointment-slot.service';
import { CommonDialogService } from '../../../common/services/dialog.service';
import { ProviderProfileComponent } from '../request-appointment/provider-profile/provider-profile.component';

@Component({
  selector: 'app-reschedule-modal',
  templateUrl: './reschedule-modal.component.html',
  styleUrls: ['./reschedule-modal.component.css']
})
export class RescheduleModalComponent  extends BaseComponent implements OnInit {
  @ViewChild('childModal') modal: ModalDirective;
  @ViewChild('modal') modalProfile: ProviderProfileComponent;
  @ViewChild('f') form: NgForm;
  providers: Array<ProviderProfileModel> = new Array<ProviderProfileModel>(); 
  model: AppointmentModel = new AppointmentModel(); 
  Submitting: boolean = false; 
  provider: ProviderProfileModel; 
  @ViewChild('scheduler') scheduler: ScheduleProviderAppointmentComponent;
  @Output() onClosed :EventEmitter<any> = new EventEmitter();
  isSearching:boolean=false;
  constructor(authService: AuthenticationService,
    private providerProfileService: ProviderProfileService,
    private appointmentService: AppointmentService, 
    private appointmentSlotService: AppointmentSlotService,
    private dialog: CommonDialogService) {
    super(authService);
  }

  ngOnInit(): void {  
  } 

  validateSlot() {
    if (!this.model.AppointmentTime) {
      this.dialog.showSwalErrorAlert("Error", "Please select Appointment Time");
      return false;
    }
    return true;
  }

   

  save() { 
    if (!this.validateSlot()) return; 

    this.Submitting = true;
    this.appointmentSlotService.CheckAvailableAppointSlot(this.model).subscribe(k => {
      if (k) {
        this.appointmentService.RescheduleAppointment(this.model)
          .subscribe(r => {
            this.Submitting = false;
            if (r) {
              this.onClosed.emit(true);
              this.dialog.showToastrSuccess("Reschedule Appointment Visit", "Appointment is rescheduled successfully");
              this.hide();
            }
          }, error => {
            this.Submitting=false;
            this.dialog.showSwalErrorAlert("Error", error.error);
          });
      } else {
        this.Submitting = false;
        this.dialog.showSwalErrorAlert("Error", "Appointment slot is unavailable. Please select another slot.")
      }
    },error=>{
      this.Submitting = false;
    });
  }

  getScheduleProvider() {
    this.isSearching=true;
    this.providers =[];
    this.providerProfileService.GetProviderRescheduleAvailableFuture(this.model.ID).subscribe(r => {
      this.isSearching = false;
      this.providers = r;   
      if (r && r.length == 1) {
        this.model.ProviderID = r[0].ProviderID;
        this.provider = r[0];
      }
    },error=>{
      this.isSearching = false;
    });
  }

  viewProfile(id) {
    this.modalProfile.show(id);
  }

  selectDoctor(userId) { 
    this.model.ProviderID = userId;
  }

  show(appointmentId) {
    if(!appointmentId) return;
    this.model = new AppointmentModel(); 
    this.model.ID = appointmentId;
    this.model.IsOnDemand=false; 
    this.getScheduleProvider();  
    this.modal.show();
  }

  hide() {
    this.form.resetForm();
    this.modal.hide();
  }

}
