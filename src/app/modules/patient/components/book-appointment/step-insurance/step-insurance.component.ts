import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Global from 'src/app/Global';
import { BaseComponent } from 'src/app/modules/base.component';
import { AppointmentModel } from 'src/app/modules/common/models/appointment.model';
import { CompanyModel } from 'src/app/modules/common/models/company.model';
import { PatientInsuranceModel } from 'src/app/modules/common/models/patient-insurance.model';
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
import { InsuranceUpdateComponent } from 'src/app/modules/home/components/insurance-update/insurance-update.component';
@Component({
  selector: 'app-step-insurance',
  templateUrl: './step-insurance.component.html',
  styleUrls: ['./step-insurance.component.css']
})
export class StepInsuranceComponent extends BaseComponent implements AfterViewInit {
  model: AppointmentModel = new AppointmentModel();
  companyModel: CompanyModel;
  patientModel: PatientProfileModel;
  us_statelist: any;
  apptCategoryID: string;
  insurances: PverifyPatientInsuranceModel[] = [];
  @ViewChild('insuranceUpdateModal') insuranceUpdateModal: InsuranceUpdateComponent;
  isTravelMedicine: boolean = false;
  isWeightLoss: boolean = false;

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
    this.activeRouter.parent.params.subscribe(r => {
      this.isTravelMedicine = r && r['category'] && r['category'].toLowerCase() === 'travel_medicine';
      this.isWeightLoss =  r && r['category'] && r['category'].toLowerCase() === 'weight_loss_consultation';
      if(this.isWeightLoss){
        this.router.navigate(['../payment'], { relativeTo: this.activeRouter });
      }
      // let isTravelMedicine = r && r['category'] && r['category'].toLowerCase() === 'travel_medicine';
      // let isCovidScreen = r && r['category'] && r['category'].toLowerCase() === 'covid_screening';
      // if (isTravelMedicine) {
      //   this.router.navigate(['../choose-provider'], { relativeTo: this.activeRouter });
      // }
      // else if (isCovidScreen) {
      //   this.model = this.authService.requestAppointment;
      //   this.activeRouter.queryParams.subscribe(r => {
      //     let submission_id = r['submission_id'];
      //     if (submission_id) {
      //       this.model.JFSubmissionID = submission_id;
      //       this.authService.requestAppointment = Object.assign({}, this.model);
      //       this.pverifyPatientInsuranceService.CheckBookingInsuranceByPatientID(this.model.PatientID).subscribe(r => {
      //         if (r) {
      //           this.router.navigate(['../choose-provider'], { relativeTo: this.activeRouter });
      //         }
      //         else {
      //           this.router.navigate(['../insurances'], { relativeTo: this.activeRouter });
      //         }
      //       });
      //     }
      //   });
      // }
    });

    this.authService.onLoadCategoryIDEvent.subscribe(r => {
      this.apptCategoryID = r;
    });

  }

  ngAfterViewInit(): void {
    this.model = this.authService.requestAppointment;
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
      && this.insurances.find(x => x.InsuranceType == 'Primary' && x.Status == 'Enabled'))) {
      return false;
    }

    return true;
  }


  checkShowVerificationInsurance() {
    if (this.model.isAddInsurance
      && this.insurances
      && this.insurances.length > 0
      && !this.insurances.find(x => x.InsuranceType == 'Primary' && x.Status == 'Enabled')) {
      return false;
    }

    return true;
  }



  save() {
    if (this.apptCategoryID) {
      if (!this.checkValidCaseSelectInsurance()) {
        this.dialog.showToastrError('Insurance', 'Please add your insurance');
        return;
      }
      this.model.ApptCategoryID = this.apptCategoryID;
      this.authService.requestAppointment = Object.assign({}, this.model);
      this.router.navigate(['../choose-provider'], { relativeTo: this.activeRouter });
    }
  }

  prev() {
    if (this.isTravelMedicine) {
      this.router.navigate(['../choose-countries'], { relativeTo: this.activeRouter });
    } else {
      this.router.navigate(['../reasons'], { relativeTo: this.activeRouter });
    }
  }

  selectUseInsurance(value) {
    this.model.isAddInsurance = value;
  }

  addInsurance() {
    if (this.patientModel.PatientID) {
      var pm = new PatientInsuranceModel();
      pm.PatientID = this.patientModel.PatientID;
      this.insuranceUpdateModal.show(pm);
    }
  }

  changeInsurance(id) {
    if (id) {
      this.patientInsuranceService.Get(id).subscribe(r => {
        if (r) {
          this.insuranceUpdateModal.show(r);
        }
      });
    }
  }

  onCloseInsurance(event) {
    if (event) {
      this.patientInsuranceService.GetByPatientID(this.patientModel.PatientID).subscribe(result => {
        if (result) {
          this.patientModel.PatientInsurances = result;
        }
      });
    }
  }

  removeAllInsurance() {
    if (this.patientModel.PatientInsurances?.length > 0) {
      this.patientInsuranceService.RemovedByPatientID(this.patientModel.PatientID).subscribe(r => {
        if (r) {
          this.patientInsuranceService.GetByPatientID(this.patientModel.PatientID).subscribe(result => {
            if (result) {
              this.patientModel.PatientInsurances = result;
            }
          });
        }
      });
    }
  }

  removeItemInsurance(id) {
    this.patientInsuranceService.Delete(id).subscribe(r => {
      if (r) {
        this.patientInsuranceService.GetByPatientID(this.patientModel.PatientID).subscribe(result => {
          if (result) {
            this.patientModel.PatientInsurances = result;
          }
        });
      }
    });
  }

  validateInsurance() {
    //return this.model.isAddInsurance == false || (this.model.isAddInsurance && this.patientModel && this.insurances && this.insurances.length > 0 && this.insurances.find(x => x.Status == 'Enabled'));
    return this.model.isAddInsurance == false || this.model.isAddInsurance == true;
  }

  changePVerifyInsurance(event) {
    this.insurances = event;
  }

  getByPatient() {
    this.pverifyPatientInsuranceService.getByPatient(this.model.PatientID).subscribe(r => {
      if (r) {
        this.insurances = r;
        if (r && r.length > 0 && r.find(x => x.InsuranceType == 'Primary' && x.Status == 'Enabled')) {
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