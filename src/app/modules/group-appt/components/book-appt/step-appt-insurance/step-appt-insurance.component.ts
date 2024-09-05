import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Global from 'src/app/Global';
import { BaseComponent } from 'src/app/modules/base.component';
import { PverifyInsuranceModalComponent } from 'src/app/modules/common/component/pverify-insurance-modal/pverify-insurance-modal.component';
 import { CompanyModel } from 'src/app/modules/common/models/company.model';
import { GroupApptPatientModel } from 'src/app/modules/common/models/group-appt-patient.model';
 import { PatientProfileModel } from 'src/app/modules/common/models/patient-profile.model';
import { PverifyPatientInsuranceModel } from 'src/app/modules/common/models/pverify-patient-insurance.model';
import { AppointmentSlotService } from 'src/app/modules/common/services/appointment-slot.service';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CompanyService } from 'src/app/modules/common/services/company.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { PatientInsuranceService } from 'src/app/modules/common/services/patient-insurance.service';
import { PatientProfileService } from 'src/app/modules/common/services/patient-profile.service';
import { PverifyPatientInsuranceService } from 'src/app/modules/common/services/pverify-patient-insurance.service';
import { UtilityService } from 'src/app/modules/common/services/utility.service';
 
@Component({
  selector: 'app-step-appt-insurance',
  templateUrl: './step-appt-insurance.component.html',
  styleUrls: ['./step-appt-insurance.component.css']
})
export class StepApptInsuranceComponent extends BaseComponent implements AfterViewInit {
  model: GroupApptPatientModel = new GroupApptPatientModel();
  companyModel: CompanyModel;
  patientModel: PatientProfileModel;
  us_statelist: any;
  apptCategoryID: string;
  insurances: PverifyPatientInsuranceModel[] = [];
  @ViewChild('modal') pverifyAddInsuranceModal: PverifyInsuranceModalComponent;
  constructor(private authService: AuthenticationService,
    private router: Router,
    private patientProfileService: PatientProfileService,
    public companyService: CompanyService,
    private utilityService: UtilityService,
    public appointmentSlotService: AppointmentSlotService,
    private dialog: CommonDialogService,
    private patientInsuranceService: PatientInsuranceService,
    private pverifyPatientInsuranceService: PverifyPatientInsuranceService,
    private activeRouter: ActivatedRoute,
    private cdChanged: ChangeDetectorRef) {
    super(authService);

    this.model = this.authService.groupApptPatient;
    this.model.isAddInsurance = false;
  }

  ngAfterViewInit(): void {
    this.getPatientProfileEntity();
    this.getCurrentCompanyInfo();
    this.us_statelist = Global.US_StateList;
    this.getByPatient();
  }

  checkValidCaseSelectInsurance() {
    // Case not has insurance
    if (this.model.isAddInsurance == false) {
      return true;
    }

    // Case choice insurance but not add insurance
    if (this.model.isAddInsurance && !this.insurances) {
      return false;
    }

    // Case has insurance but have not status enabled
    if (!(this.model.isAddInsurance
      && this.patientModel
      && this.insurances
      && this.insurances.length > 0
      && this.insurances.find(x => x.InsuranceType == 'Primary' && x.PayerName == 'Medicare Part A and B' && x.Status == 'Enabled'))) {
      return false;
    }

    return true;
  }

  checkShowVerificationInsurance() {
    if (this.model.isAddInsurance
      && this.insurances
      && this.insurances.length > 0
      && !this.insurances.find(x => x.InsuranceType == 'Primary' && x.PayerName == 'Medicare Part A and B' && x.Status == 'Enabled')) {
      return false;
    }

    return true;
  }


  save() {
    if (!this.checkValidCaseSelectInsurance()) {
      this.dialog.showSwalErrorAlert('Insurance', 'Please add valid Medicare Insurance');
      return;
    }
    this.authService.groupApptPatient = Object.assign({}, this.model);
    this.router.navigate(['../appt-group-session'], { relativeTo: this.activeRouter });
  }


  selectUseInsurance(value) {
    this.model.isAddInsurance = value;
  }

  addInsurance() {
    this.pverifyAddInsuranceModal.IsMedicarePartAAndB = true;
    this.pverifyAddInsuranceModal.show("Primary", this.currentUser.Id);
  }

  validateInsurance() {
    return this.model.isAddInsurance == false || (this.model.isAddInsurance && this.patientModel && this.insurances && this.insurances.length > 0 && this.insurances.find(x => x.Status == 'Enabled'));
  }

  changePVerifyInsurance(event) {
    this.insurances = event;
  }

  getByPatient() {
    this.pverifyPatientInsuranceService.getByPatient(this.model.PatientID).subscribe(r => {
      if (r) {
        this.insurances = r;
        if (r && r.length > 0 && r.find(x => x.InsuranceType == 'Primary' && x.PayerName == 'Medicare Part A and B' && x.Status == 'Enabled')) {
          this.model.isAddInsurance = true;
        }
        else if (this.model.isAddInsurance != null) {
          this.model.isAddInsurance = false;
        }
      }
    })
  }

  getPatientProfileEntity() {
    this.patientModel = new PatientProfileModel();
    this.patientProfileService.GetInsurances(this.model.PatientID)
      .subscribe(r => {
        this.patientModel = r;
      });
  }

  getCurrentCompanyInfo() {
    this.companyModel = new CompanyModel();
    this.companyService.Get(this.currentUser.CompanyID).subscribe(r => {
      this.companyModel = r;
      if (this.companyModel && !this.companyModel.CompanyPicture) {
        this.companyModel.CompanyPicture = "https://via.placeholder.com/400x600.png";;
      }
    });
  }

}
