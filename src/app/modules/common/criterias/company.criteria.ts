import { BaseCriteria } from './base.criteria';

export class CompanyCriteria extends BaseCriteria{
    Name!: string;
    Address!: string;
    CellPhoneNumber!: string;
    PhoneNumber!: string;
    Email!: string;
    LicenseNumber!: string;
    LicenseDate!: Date;
    ProvideBy!: string;
    OrganizationID!: string;
    IsOrganization: boolean=false;
    RepresentativeID!: string;
    LicenseTypeID!: string;
}