import { ApptCategoryModel } from './appt-category.model';
import { CompanyModel } from './company.model';
import { ProviderLicenseModel } from './provider-license.model';
import UserModel from './user.model';

export class ProviderServiceAssignmentModel {
    ID: string;
    CompanyID: string;
    Price: number;
    ApptCategoryID: string;
    ProviderID: string;
    Company: CompanyModel;
    ApptCategory: ApptCategoryModel;
    Provider: UserModel;
    ProviderLicenseID: string;
    ProviderLicense:ProviderLicenseModel;
}