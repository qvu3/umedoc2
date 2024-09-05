export class BaseCriteria {
  CurrentPage: number = 0;
  ItemPerPage: number = 20;
  SortColumn: string = 'Name';
  SortDirection: string = 'asc';
  SearchText: string;
  HealthPatientID:string="";
  CurrentUserID:string;
}
