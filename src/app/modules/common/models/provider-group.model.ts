import { ProviderGroupAssignmentModel } from './provider-group-assignment.model';

export class ProviderGroupModel {
    ID!: string;
    Name!: string;
    Assignments: ProviderGroupAssignmentModel[] = [];
}