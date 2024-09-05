import { WeightLossPrecheck } from './weight-loss-precheck.model';
import { AppointmentImageModel } from './appointment-image.model';
import { AppointmentReasonAssignmentModel } from './appointment-reason-assignment.model';
import TransactionPaypalModel from './transaction-paypal.model';
import { AppointmentStatusModel } from './appointment-status.model';
import UserModel from './user.model';
import { ProviderProfileModel } from './provider-profile.model';
import { CreditCardModel } from './credit-card.model';
import { PreCheckModel } from './pre-check.model';
import { PatientProfileModel } from './patient-profile.model';
import { ProviderProfileViewModel } from './provider-profile-request.model';
import { ApptCategoryModel } from './appt-category.model';

export class AppointmentModel {
    ID!: string;
    PatientID!: string;
    ProviderID!: string;
    StatusID!: string;
    ReasonID!: string;
    IsOnDemand: boolean;
    ApptCategoryID!: string;
    AppointmentTime!: Date;
    AppointmentTimeSort!: Date;
    Liked: boolean;
    Description!: string;
    AppointmentImageList: Array<AppointmentImageModel>;
    AppointmentReasonList: Array<AppointmentReasonAssignmentModel>;
    TransactionPaypal!: TransactionPaypalModel;
    AppointmentVideoLink!: string;
    AppointmentStatus!: AppointmentStatusModel;
    TokboxSessionId!: string;
    CreatedOn!: Date;
    WasReferral!: boolean;
    AppointmentSlotID: string;
    CreditCard: CreditCardModel;
    Reasons: Array<string>;
    IsNewPatient!: boolean;
    CategoryName!: string;
    State!: string;
    Gender!: string;
    RequestDate?: Date;
    isAddInsurance: boolean | null = null;
    ApptCategoryCode!: string;
    PaidByInsurance!: boolean;
    ApptCategory!: ApptCategoryModel;
    CancelReason!: string;
    IsNoShow!: boolean;
    JFSubmissionID!: string;
    CoinBaseChargeID!: string;
    PayByCrypto: boolean;
    Countries!: Array<string>;
    Rating?: number;
    Review!: string;
    IsCovidRelated:boolean;
    WeightLoss!: WeightLossPrecheck;
    WeightLossPrecheck!: WeightLossPrecheck;
    constructor() {
        this.Liked = false;
        this.IsOnDemand = true;
        this.PayByCrypto = false;
        this.IsCovidRelated = false;
        this.AppointmentImageList = new Array<AppointmentImageModel>();
        this.AppointmentReasonList = new Array<AppointmentReasonAssignmentModel>();
        this.ProviderUser = new UserModel();
        this.CreditCard = new CreditCardModel();
        this.PreCheckModel = new PreCheckModel();
        this.Reasons = new Array<string>();
        this.AppointmentSlotID = "";
    }

    ByPassPaymentCode!: string;

    // Not Mapped
    ProviderUserName!: string;
    PatientUserName!: string;
    GenerateReasonAssignment!: string;
    PatientUser: any;
    ProviderUser: UserModel;
    ProviderProfile!: ProviderProfileModel;
    SelectedProvider!: ProviderProfileViewModel;
    AppointmentFollowUp!: string;
    PatientProfile!: PatientProfileModel;
    // Apply for payment Stripe
    IsCharge!: boolean;
    IsUseDailyCo: boolean = true;
    RoomName!: string;

    PreCheckModel: PreCheckModel;

    IsReadAndAgreedTreatment: boolean = true;
    GroupName!: string;
    LastUpdatedTime?: Date;
    IsFromMobileApp!: boolean;
    ApptCategoryName!: string;
    Language!: string;
    IsCancelCompletedAppt!: boolean;
    PartnerName!: string;
}