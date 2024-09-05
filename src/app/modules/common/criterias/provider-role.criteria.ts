import { BaseCriteria } from './base.criteria';
export class ProviderRoleCriteria extends BaseCriteria {
    ID!: string;
    RoleName!: string;
    SortOrder!: number;
    IsInactived!: boolean;
}