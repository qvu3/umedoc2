import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/modules/base.component';
import { PatientChildModalComponent } from 'src/app/modules/common/component/patient-child-modal/patient-child-modal.component';
import { AppointmentModel } from 'src/app/modules/common/models/appointment.model';
import { PatientProfileModel } from 'src/app/modules/common/models/patient-profile.model';
import { PverifyPatientInsuranceModel } from 'src/app/modules/common/models/pverify-patient-insurance.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { PatientProfileService } from 'src/app/modules/common/services/patient-profile.service';
import { PverifyPatientInsuranceService } from 'src/app/modules/common/services/pverify-patient-insurance.service';

@Component({
  selector: 'app-step-choose-patient',
  templateUrl: './step-choose-patient.component.html',
  styleUrls: ['./step-choose-patient.component.css']
})
export class StepChoosePatientComponent extends BaseComponent implements AfterViewInit {
  model: AppointmentModel = new AppointmentModel(); 
  apptCategoryID: string;
  patientModel: PatientProfileModel;
  children: PatientProfileModel[] = [];
  @ViewChild('modal') modal:PatientChildModalComponent;
  constructor(private authService: AuthenticationService,
    private patientProfileService: PatientProfileService,
    private pverifyPatientInsuranceService: PverifyPatientInsuranceService,
    private router: Router,
    private activeRouter: ActivatedRoute) {
    super(authService);
    this.authService.onLoadCategoryIDEvent.subscribe(r => {
      this.apptCategoryID = r;
    });
  }

  ngAfterViewInit(): void {
    this.getPatientProfileEntity();
    this.getChildren();
    this.model = Object.assign({}, this.authService.requestAppointment);
  }

  save() {
    if (this.apptCategoryID) {
      this.model.ApptCategoryID = this.apptCategoryID; 
      this.authService.requestAppointment = Object.assign({}, this.model);
      this.router.navigate(['../reasons'], { relativeTo: this.activeRouter });
    }
  }


  getPatientProfileEntity() {
    this.patientProfileService
      .GetPatientProfileInfo(this.currentUser.Id).subscribe(r => {
        this.patientModel = r;
      }); 
  }

  getChildren(){
    this.patientProfileService.GetChildren(this.currentUser.Id).subscribe(r => {
      this.children = r;
    });
  }

  addChild(){
    this.modal.show(null , this.currentUser.Id);
  }

  selectPatient(patientId){
    this.model.PatientID = patientId;
  }


}
