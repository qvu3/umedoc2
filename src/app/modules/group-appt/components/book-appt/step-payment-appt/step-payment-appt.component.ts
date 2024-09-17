import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { BaseComponent } from '../../../../base.component';
import { MessageConstant } from '../../../../common/constant/message.const';
import { GroupApptPatientModel } from '../../../../common/models/group-appt-patient.model';
import { PatientProfileModel } from '../../../../common/models/patient-profile.model';
import { PverifyPatientInsuranceModel } from '../../../../common/models/pverify-patient-insurance.model';
import { CardInfoModel } from '../../../../common/models/stripe-info.model';
import { AppointmentService } from '../../../../common/services/appointment.service';
import { AuthenticationService } from '../../../../common/services/authentication.service';
import { CommonDialogService } from '../../../../common/services/dialog.service';
import { GroupApptPatientService } from '../../../../common/services/group-appt-patient.service';
import { PatientProfileService } from '../../../../common/services/patient-profile.service';
import { PverifyPatientInsuranceService } from '../../../../common/services/pverify-patient-insurance.service';
import { CardInfoComponent } from '../../../../home/components/card-info/card-info.component';
declare var $: any;
declare var gtag: any;

interface Window {
  uetq: any[];
}

declare var window: Window & typeof globalThis;

@Component({
  selector: 'app-step-payment-appt',
  templateUrl: './step-payment-appt.component.html',
  styleUrls: ['./step-payment-appt.component.css']
})
export class StepPaymentApptComponent extends BaseComponent implements AfterViewInit {
  model: GroupApptPatientModel = new GroupApptPatientModel(); // Ensure model is initialized
  @Input()
  routerName!: string;
  patientModel!: PatientProfileModel;

  IsSubmitting: boolean = false;
  IsShowStripePayment: boolean = false;
  IsChangeCardInfo: boolean = false;
  cardInfo: CardInfoModel = new CardInfoModel();
  @ViewChild('cardInfoModal')
  cardInfoModal!: CardInfoComponent;
  insurances: PverifyPatientInsuranceModel[] = [];

  constructor(private authService: AuthenticationService,
    private appointmentService: AppointmentService,
    private router: Router,
    private patientProfileService: PatientProfileService,
    private dialog: CommonDialogService,
    private activeRouter: ActivatedRoute,
    private groupApptPatientService: GroupApptPatientService,
    private pverifyPatientInsuranceService: PverifyPatientInsuranceService) {
    super(authService);
    this.model = this.authService.groupApptPatient || new GroupApptPatientModel(); // Default to a new model if null
  }

  override ngAfterViewInit(): void {
    this.getPatientProfileEntity();
  }

  getPatientProfileEntity() {
    this.patientModel = new PatientProfileModel();
    this.pverifyPatientInsuranceService.getByPatient(this.model.PatientID).subscribe(r => {
      if (r) {
        this.insurances = r;
        if (this.canChangePaidByInsurance()) {
          this.model.PaidByInsurance = true;
        }else{
          this.model.PaidByInsurance = false; 
        }
      } else {
        this.insurances = [];
      }
    });

    this.patientProfileService.GetIncludePatientUser(this.currentUser.Id).subscribe(r => {
      this.patientModel = r;

      if (this.patientModel.CustomerID && this.patientModel.CardID) {
        this.appointmentService.CheckValidCardInfoAsync(this.patientModel.CustomerID, this.patientModel.CardID).subscribe(c => {
          this.cardInfo = c;
          this.IsShowStripePayment = this.cardInfo.IsShowStripePayment;
        });
      } else {
        this.IsShowStripePayment = true;
      }
    });
  }

  canChangePaidByInsurance() {
    return (this.insurances && this.insurances.length > 0
      && this.insurances.find(x => x.PayerName == 'Medicare Part A and B' && x.InsuranceType == 'Primary' && x.Status == 'Enabled'))
  }

  addCardInfo() {
    if (this.currentUser) {
      this.cardInfoModal.model = new CardInfoModel();
      this.cardInfoModal.show();
    }
  }

  save() {
    this.groupApptPatientService.Create(this.model as any).subscribe(r => {
      if (r) {
        this.dialog.showSwalSuccesAlert('Create Group Appt Patient', MessageConstant.REQUEST_SUCCESS_CONST);
        this.router.navigateByUrl(`/group-appt-waiting-room/${r.GroupApptID}`);
      }
      else {
        this.dialog.showSwalErrorAlert("Error", MessageConstant.FAILURE_REQUEST);
      }
    }, error => {
      this.dialog.showSwalErrorAlert("Error", error.error);
    });
  }

  selectPaidByInsurance(value: boolean) {
    if (this.canChangePaidByInsurance()) {
      this.model.PaidByInsurance = value;
    } else {
      this.model.PaidByInsurance = false;
    }
  }

  prev() {
    this.router.navigate(['../appt-group-session'], { relativeTo: this.activeRouter });
  }

  calculateAppointmentPrice() {
    // Set appointment Fee for Group Appt
    if (this.model.PaidByInsurance) {
      this.model.TotalPrice = 0; 
    } else {
      this.model.TotalPrice = this.model.GroupAppt?.Price || 0; // Ensure GroupAppt exists
    } 
    return this.model.TotalPrice.toFixed(2);
  }

  changeInsurance(event: PverifyPatientInsuranceModel[]) {
    this.insurances = event;
    this.selectPaidByInsurance(true); 
  }

  runGoogleAds() {
    gtag('event', 'conversion', { 'send_to': 'AW-638647302/D2J9CNPHo-EBEIb4w7AC' });
  }

  runBingAds() {
    window.uetq = window.uetq || [];
    window.uetq.push('event', 'RequestedAppt', { 'event_category': 'RequestedAppt', 'event_label': 'RequestedAppt', 'event_value': 1 });
  }
}
