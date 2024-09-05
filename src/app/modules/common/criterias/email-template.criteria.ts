import { BaseCriteria } from './base.criteria';
export class EmailTemplateCriteria extends BaseCriteria {
    ID!: string;
    CompanyID!: string;
    TemplateName!: string;
    Subject!: string;
    Body!: string;
}