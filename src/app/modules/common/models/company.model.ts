
export class CompanyModel {
    ID: string;
    Name: string;
    CompanyName: string;
    Address1: string;
    Address2: string;
    City: string;
    State: string;
    ZipCode: string;
    Address: string;
    CellPhoneNumber: string;
    PhoneNumber: string;
    FaxNumber: string;
    Email: string;
    LicenseNumber: string;
    LicenseDate: Date;
    ProvideBy: string;
    OrganizationID: string;
    IsOrganization: boolean = false;
    RepresentativeID: string;
    LicenseTypeID: string;
    CompanyType: number;
    CompanyPicture: string;
    PayPalClientID: string;
    PayPalSecretKey: string;
    DomainURL: string;
    AppointmentPrice: number;
    ByPassPaymentCode: string;
    IsVaccineEnabled: boolean = false;
    SubscriptionTrialDays: number;
    IsExistPlan: boolean = false;
    get PayPalClientIDView(): string {
        let view = "";
        if (this.isFocusID) {
            return this.PayPalClientID;
        }
        if (this.PayPalClientID) {
            if (this.PayPalClientID.length > 4) {
                let firstClientID = this.PayPalClientID.substr(0, this.PayPalClientID.length - 4);
                let lastClientID = this.PayPalClientID.substr(this.PayPalClientID.length - 4, this.PayPalClientID.length - 1);
                if (firstClientID && lastClientID) {
                    for (let i = 0; i < firstClientID.length; i++) {
                        view += "*";
                    }
                    view += lastClientID;
                }
            }
            else {
                view = this.PayPalClientID;
            }
        }
        return view;
    }
    set PayPalClientIDView(value: string) {
        this.PayPalClientID = value;
    }
    get PayPalSecretKeyView(): string {
        let view = "";
        if (this.isFocusSecret) {
            return this.PayPalSecretKey;
        }
        if (this.PayPalSecretKey) {
            if (this.PayPalSecretKey.length > 4) {
                let first = this.PayPalSecretKey.substr(0, this.PayPalSecretKey.length - 4);
                let last = this.PayPalSecretKey.substr(this.PayPalSecretKey.length - 4, this.PayPalSecretKey.length - 1);
                if (first && last) {
                    for (let i = 0; i < first.length; i++) {
                        view += "*";
                    }
                    view += last;
                }
            }
            else {
                view = this.PayPalSecretKey;
            }
        }
        return view;
    }

    set PayPalSecretKeyView(value: string) {
        this.PayPalSecretKey = value;
    }

    isFocusID: boolean = false;
    isFocusSecret: boolean = false;
    DontKnowCopayPrice: number;
    constructor() {
        this.IsOrganization = false;
    }

    PortalFee: number;
}