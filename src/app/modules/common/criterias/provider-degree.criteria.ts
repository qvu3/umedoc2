import { BaseCriteria } from './base.criteria';
export class ProviderDegreeCriteria extends BaseCriteria {
    ID: string;
    DegreeName: string;
    ImagePath: string;
    SortOrder: number;
    IsInactived: boolean;
}