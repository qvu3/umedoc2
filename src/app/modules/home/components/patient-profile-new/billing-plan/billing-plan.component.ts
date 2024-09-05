import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/modules/base.component';
import { ConfirmUmecarAgreementComponent } from 'src/app/modules/common/component/confirm-umecar-agreement/confirm-umecar-agreement.component';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { PatientProfileModel } from 'src/app/modules/common/models/patient-profile.model';
import { PatientSubscriptionModel } from 'src/app/modules/common/models/patient-subscription.model';
import { SubscriptionPlanModel } from 'src/app/modules/common/models/subscription-plan.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { PatientProfileService } from 'src/app/modules/common/services/patient-profile.service';
import { PatientSubscriptionService } from 'src/app/modules/common/services/patient-subscription.service';
import { SubscriptionPlanService } from 'src/app/modules/common/services/subscription-plan.service';
import { CardInfoComponent } from '../../card-info/card-info.component';

@Component({
  selector: 'app-billing-plan',
  templateUrl: './billing-plan.component.html',
  styleUrls: ['./billing-plan.component.css']
})
export class BillingPlanComponent extends BaseComponent implements OnInit {
  @Input() patientID: string;
  @ViewChild('cardInfoModal') cardInfoModal: CardInfoComponent;
  @ViewChild('agreementModal') agreementModal: ConfirmUmecarAgreementComponent;
  subscriptionPlans: Array<SubscriptionPlanModel> = new Array<SubscriptionPlanModel>();
  patientSubscriptions: Array<PatientSubscriptionModel> = new Array<PatientSubscriptionModel>();
  model: PatientSubscriptionModel = new PatientSubscriptionModel();
  patientInfo: PatientProfileModel = new PatientProfileModel();
  currentSubscription: string = '';
  currentPlan: string = '';
  selectPlan: any;
  constructor(public authenticateService: AuthenticationService,
    private subscriptionPlanService: SubscriptionPlanService,
    private patientSubscriptionService: PatientSubscriptionService,
    private patientProfileService: PatientProfileService,
    private dialog: CommonDialogService,
    private router:Router) {
    super(authenticateService);
    if (this.currentUser.Role == 'Patient') {
      this.patientID = this.currentUser.Id;
    }
  }

  ngOnInit(): void {
    this.getPatientInfo();
    this.getSubscriptionPlans();
    this.getPatientSubscriptions();

  }

  closeCardInfo(){
    this.getPatientInfo();
    this.upgradeSubcriptionPlan(this.selectPlan);
  }

  getPatientInfo() {
    this.patientProfileService.GetIncludePatientUser(this.currentUser.Id).subscribe(r => {
      if (r) {
        this.patientInfo = r;
      }
    });
  }

  getSubscriptionPlans() {
    this.subscriptionPlanService.GetAll().subscribe(r => {
      if (r) {
        this.subscriptionPlans = r;
      }
    });
  }

  getPatientSubscriptions() {
    this.patientSubscriptions = [];
    this.patientSubscriptionService.GetByPatientId(this.patientID).subscribe(r => {
      if (r) {
        this.patientSubscriptions = r;
        const currentSubscriptionPlan = this.patientSubscriptions.filter(p => p.IsActive);
        if (currentSubscriptionPlan && currentSubscriptionPlan.length > 0) {
          this.currentPlan = currentSubscriptionPlan[0].SubscriptionPlan.StripePriceID;
          this.currentSubscription = currentSubscriptionPlan[0].StripeSubscriptionID;
        } else {
          this.currentPlan = '';
          this.currentSubscription = '';
        }
      }
    });
  }

  showAgreementPlan(plan){
    this.selectPlan = plan;
    this.agreementModal.show();
  }

  validateCreditCard() {
    var plan = this.selectPlan;
    if (plan?.ProductName?.toUpperCase().includes("STUDENT")) {
      if (!this.currentUser?.Email?.toUpperCase().includes(".EDU")) {
        this.dialog.showSwalErrorAlert("Upgrade Subscription Plan", "Student Email EDU is required. Please update your email and then try again!");
        return;
      }
    }
    // Check patient has Credit Card before upgrade subscription
    if (!this.patientInfo.CustomerID || !this.patientInfo.CardID) {
      this.cardInfoModal.show(this.patientInfo.CardID);
    } else {
      this.upgradeSubcriptionPlan(plan);
    }
  }

  upgradeSubcriptionPlan(plan) {
     if (!plan) return;

    if (plan?.ProductName?.toUpperCase().includes("STUDENT")) {
      if (!this.currentUser?.Email?.toUpperCase().includes(".EDU")) {
        this.dialog.showSwalErrorAlert("Upgrade Subscription Plan", "Student Email EDU is required. Please update your email and then try again!");
        return;
      }
    }

    this.model.SubscriptionPlan = plan;
    this.model.PatientID = this.patientID;
    this.patientSubscriptionService.Create(this.model).subscribe(r => {
      if (r) {
        this.dialog.showToastrSuccess("Upgrade Subscription Plan", MessageConstant.REQUEST_SUCCESS_CONST);
        this.getPatientSubscriptions();
      } else {
        this.dialog.showSwalErrorAlert("Upgrade Subscription Plan", MessageConstant.FAILURE_REQUEST);
      }
    }, error => {
      this.dialog.showSwalErrorAlert("Upgrade Subscription Plan", MessageConstant.FAILURE_REQUEST);
    });
  }

  cancelSubcriptionPlan(subscriptionId) {
    this.dialog.showSwalConfirmAlert("Are you sure you want to cancel this plan?").then((isConfirm => {
      if (isConfirm) {
        this.patientSubscriptionService.CancelledSubscription(subscriptionId).subscribe(r => {
          if (r) {
            this.dialog.showToastrSuccess("Cancelled Subscription Plan", MessageConstant.REQUEST_SUCCESS_CONST);
            this.getPatientSubscriptions();
          } else {
            this.dialog.showSwalErrorAlert("Cancelled Subscription Plan", MessageConstant.FAILURE_REQUEST);
          }
        }, error => {
          this.dialog.showSwalErrorAlert("Cancelled Subscription Plan", MessageConstant.FAILURE_REQUEST);
        });
      }
    }));
  }
}
