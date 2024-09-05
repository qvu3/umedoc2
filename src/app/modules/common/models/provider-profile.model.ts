import { ProviderDegreeModel } from './provider-degree.model';
import { ProviderRoleModel } from './provider-role.model';
import { ProviderSpecialtyAssignmentModel } from './provider-specialty-assignment.model';
import { ProviderEducationModel } from './provider-education.model';
import UserModel from './user.model';
import { ProviderLicenseModel } from './provider-license.model';
import { ProviderBadgeModel } from './provider-badge.model';
import { ProviderLanguageModel } from './provider-language.model';

export class ProviderProfileModel {
    ID!: string;
    ProviderID!: string;
    ProviderDegreeID!: string;
    ProviderRoleID!: string;
    YearsInPractice!: number;
    LicensedIn!: string;
    SelfDescription!: string;
    NumberOfAppointmentLike!: number;
    IsAvailable!: boolean;
    IsBackupAvailable!: boolean;
    ProviderDegree: ProviderDegreeModel;
    ProviderRole: ProviderRoleModel;
    SpecialtyAssignments: ProviderSpecialtyAssignmentModel[];
    Educations: ProviderEducationModel[];
    ProviderUser: UserModel;
    ProviderLicenses: ProviderLicenseModel[];
    DS_UserID!: number;
    ProviderBadges: ProviderBadgeModel[];
    ProviderLanguages: ProviderLanguageModel[];
    constructor() {
        this.ProviderUser = new UserModel();
        this.ProviderDegree = new ProviderDegreeModel();
        this.ProviderRole = new ProviderRoleModel();
        this.SpecialtyAssignments = [];
        this.ProviderLicenses = [];
        this.Educations = [];
        this.ProviderBadges = [];
        this.ProviderLanguages = [];
    }

    IsHideAppointment!: boolean;
    CountNumberOfPatientWaiting!: number;
    ProviderName!: string;
    NPINumber!: string;
    LicenseNumber!: string;
    IsVerified!: boolean;
}