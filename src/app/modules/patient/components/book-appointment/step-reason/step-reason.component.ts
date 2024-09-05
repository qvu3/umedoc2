import { LetterMedicationRefillComponent } from './../../../../common/component/letter-medication-refill/letter-medication-refill.component';
import { WeightLossPrecheck } from './../../../../common/models/weight-loss-precheck.model';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/modules/base.component';
import { AppointmentModel } from 'src/app/modules/common/models/appointment.model';
import { PatientProfileModel } from 'src/app/modules/common/models/patient-profile.model';
import { PverifyPatientInsuranceModel } from 'src/app/modules/common/models/pverify-patient-insurance.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { PatientProfileService } from 'src/app/modules/common/services/patient-profile.service';
import { PverifyPatientInsuranceService } from 'src/app/modules/common/services/pverify-patient-insurance.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-step-reason',
  templateUrl: './step-reason.component.html',
  styleUrls: ['./step-reason.component.css']
})
export class StepReasonComponent extends BaseComponent implements AfterViewInit {
  @ViewChild('infoModal') modal: LetterMedicationRefillComponent;
  model: AppointmentModel = new AppointmentModel();
  isUploading: boolean = false;
  apptCategoryID: string;
  patientModel: PatientProfileModel;
  insurances: PverifyPatientInsuranceModel[] = [];
  isWeightLoss: boolean = false;
  isTravelMedicine: boolean = false;
  isCovidScreening: boolean = false;
  isCovidRelated: boolean = false;
  isGroupAppt: boolean = false;
  isPrimaryCare: boolean = false;
  travelJotFormID: string;
  travelJotFormUrl: any;
  covidScreeningJotFormID: string;
  covidScreeningJotFormUrl: any;
  isWarnedEmergency: boolean = false;
  isWeightLossAnswered: boolean = false;
  isDiabeticManagement: boolean = false;
  isSkinCare: boolean = false;
  isFitness: boolean = false;
  isMedicationRefill = false;
  isAgreedMedicationRefill = false;
  constructor(private authService: AuthenticationService,
    private patientProfileService: PatientProfileService,
    private dialog: CommonDialogService,
    private pverifyPatientInsuranceService: PverifyPatientInsuranceService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private santizier: DomSanitizer) {
    super(authService);
    this.authService.onLoadCategoryIDEvent.subscribe(r => {
      this.apptCategoryID = r;
      this.travelJotFormID = environment.travelJotFormID;
      this.travelJotFormUrl = this.santizier.bypassSecurityTrustResourceUrl('https://form.jotform.com/' + this.travelJotFormID);
      this.covidScreeningJotFormID = environment.covidScreeningJotFormID;
      this.covidScreeningJotFormUrl = this.santizier.bypassSecurityTrustResourceUrl('https://form.jotform.com/' + this.covidScreeningJotFormID);
    });
    this.activeRouter.parent.params.subscribe(r => {
      this.isPrimaryCare = r && r['category'] && r['category'].toLowerCase() === 'primary_care_urgent_care';
      this.isWeightLoss = r && r['category'] && r['category'].toLowerCase() === 'weight_loss_consultation';
      this.isTravelMedicine = r && r['category'] && r['category'].toLowerCase() === 'travel_medicine';
      this.isCovidScreening = r && r['category'] && r['category'].toLowerCase() === 'covid_screening';
      this.isDiabeticManagement = r && r['category'] && r['category'].toLowerCase() === 'diabetic_management';
      this.isSkinCare = r && r['category'] && r['category'].toLowerCase() === 'skin_care';
      this.isFitness = r && r['category'] && r['category'].toLowerCase() === 'fitness';
      this.isGroupAppt = r && r['category'] && r['category'].toLowerCase() === 'group_appt';
      this.isMedicationRefill = r && r['category'] && r['category'].toLowerCase() === 'medication_refill';
      this.isWeightLossAnswered = !this.isWeightLoss;
    });
  }

  ngAfterViewInit(): void {
    this.model = Object.assign({}, this.authService.requestAppointment);
    if (this.isWeightLoss) {
      this.model.WeightLoss = new WeightLossPrecheck();
    }
    this.model.PatientID = this.authService.AppointmentPatientID ?? this.currentUser.Id;
    this.model.ApptCategoryID = this.apptCategoryID;
    this.authService.requestAppointment = Object.assign({}, this.model);
    this.getPatientProfileEntity();
  }

  onValidSubmitedHanlder(wlprecheck: WeightLossPrecheck) {
    this.isWeightLossAnswered = wlprecheck.isAgreed;
    this.model.WeightLoss = wlprecheck;
  }

  save() {
    if (!this.isWarnedEmergency) {
      if (this.model.Description) {
        var isHasEmergencyWord = false;
        this.emergencyWords.forEach(ew => {
          if (this.model.Description.toLocaleLowerCase().includes(ew)) {
            isHasEmergencyWord = true;
          }
        });
        if (isHasEmergencyWord) {
          this.dialog.showSwalConfirmAlert('<strong>If you have emergency symptoms, please call 911</strong>.<br/>Are you want to continute to make appointment?', true).then((isConfirm) => {
            if (isConfirm) {
              this.isWarnedEmergency = true;
              this.gotoNextScreen();
            }
          });
          return;
        }
      }
    }
    this.gotoNextScreen();
  }

  gotoNextScreen() {
    if (this.apptCategoryID && this.model?.PatientID) {
      this.model.ApptCategoryID = this.apptCategoryID;
      this.authService.requestAppointment = Object.assign({}, this.model);
      if (this.isTravelMedicine) {
        this.router.navigate(['../choose-countries'], { relativeTo: this.activeRouter });
      }
      else if (this.isDiabeticManagement || this.isSkinCare || this.isWeightLoss) {
        this.model.PaidByInsurance = false;
        this.model.isAddInsurance = false;
        this.authService.requestAppointment = Object.assign({}, this.model);
        this.router.navigate(['../choose-provider'], { relativeTo: this.activeRouter });
      }
      else {
        this.pverifyPatientInsuranceService.CheckBookingInsuranceByPatientID(this.model.PatientID).subscribe(r => {
          if (r) {
            this.router.navigate(['../choose-provider'], { relativeTo: this.activeRouter });
          } else {
            this.router.navigate(['../insurances'], { relativeTo: this.activeRouter });
          }
        });
      }
    }
  }

  uploaded(event) {
    if (event) {
      this.model.AppointmentImageList.push(event);
    }
  }

  uploadStatus(isCompleted) {
    this.isUploading = !isCompleted;
  }

  removeAttach(index) {
    this.model.AppointmentImageList.splice(index, 1);
  }

  getPatientProfileEntity() {
    if (this.model?.PatientID) {
      this.pverifyPatientInsuranceService.ReCheck(this.model.PatientID).subscribe(r => {
        if (this.isTravelMedicine) {
          this.model.isAddInsurance = false;
          this.model.PaidByInsurance = false;
          this.model.ApptCategoryID = this.apptCategoryID;
          this.authService.requestAppointment = Object.assign({}, this.model);
        }
        else {
          this.insurances = r;
          if (r && r.length > 0 && r.find(x => x.Status == 'Enabled')) {
            this.model.isAddInsurance = true;
            this.model.PaidByInsurance = true;
          }
          else if (this.model.isAddInsurance != null) {
            this.model.isAddInsurance = false;
            this.model.PaidByInsurance = false;
          }
          this.authService.requestAppointment = Object.assign({}, this.model);
        }

      });
    }
    else {
      this.dialog.showToastrError('Choose Reason', 'Your are missing choose patient!!!');
      this.prev();
    }
  }


  prev() {
    this.router.navigate(['../choose-patient'], { relativeTo: this.activeRouter });
  }

  showInfo() {
    this.modal.show();
  }

}
