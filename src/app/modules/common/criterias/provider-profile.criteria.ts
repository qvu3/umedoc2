import { BaseCriteria } from './base.criteria';
export class ProviderProfileCriteria extends BaseCriteria {
    ID: string;
    ProviderID: string;
    ProviderDegreeID: string;
    ProviderRoleID: string;
    YearsInPractice: number;
    LicensedIn: string;
    SelfDescription: string;
    NumberOfAppointmentLike: number;
    IsAvailable: boolean;
}