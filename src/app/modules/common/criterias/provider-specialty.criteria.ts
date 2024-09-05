import { BaseCriteria } from './base.criteria';
export class ProviderSpecialtyCriteria extends BaseCriteria {
    ID!: string;
    SpecialtyName!: string;
    SortOrder!: number;
    IsInactived!: boolean;
}