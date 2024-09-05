import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from 'express';
import { BaseComponent } from 'src/app/modules/base.component';
import { RestrictedPatientLogCriteria } from 'src/app/modules/common/criterias/restricted-patient-log.criteria';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { ProviderProfileService } from 'src/app/modules/common/services/provider-profile.service';
import { UserService } from 'src/app/modules/common/services/user.service';

@Component({
  selector: 'app-restricted-patient-log',
  templateUrl: './restricted-patient-log.component.html',
  styleUrls: ['./restricted-patient-log.component.css'],
  providers: [DatePipe]
})
export class RestrictedPatientLogComponent extends BaseComponent implements OnInit {
  criteria: RestrictedPatientLogCriteria = new RestrictedPatientLogCriteria();
  serverLink = "/api/RestrictedPatientLog/SearchAsync";
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;
  constructor(public authService: AuthenticationService,
    private datePipe: DatePipe) {
    super(authService);
  }

  ngOnInit() {
    this.InitTable();
  }

  onFilterColumn(event) {
    if (event) {

    }
  }

  RefreshTable() {
    this.table.ajax.reload();
  }
  catchTable(event) {
    this.table = event;
  }

  SetCriteria(aoData: any) {
    if (aoData) {
      aoData.forEach(element => {
        switch (element.name) {
          case "iDisplayStart":
            this.criteria.CurrentPage = element.value;
            break;
          case "iDisplayLength":
            this.criteria.ItemPerPage = element.value;
            break;
          case "iSortCol_0":
            this.criteria.SortColumn = this.aoColumnDefs[element.value].mData;
            break;
          case "sSortDir_0":
            this.criteria.SortDirection = element.value;
            break;
          case "sSearch":
            this.criteria.SearchText = element.value;
            break;
        }
      });
    }

    this.criteria.CurrentPage = Math.ceil(this.criteria.CurrentPage / this.criteria.ItemPerPage);
    return this.criteria;
  }

  InitTable() {
    this.compRef = this;
    this.aaSorting = [[1, "desc"]];
    this.aoColumnDefs = [
      { "mData": "PatientID", "aTargets": [0] },
      { "mData": "ProviderID", "aTargets": [1] },
      { "mData": "CreatedOn", "aTargets": [2] }]

    this.aoColumns = [
      {
        "sTitle": "Patient Name",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          if (oObj) {
            return '<img width="30px" height="30px" *ngIf="oObj.PatientUser.ProfilePicture" src="' + oObj.PatientUser.ProfilePicture + '" alt="" class="rounded-circle"><strong>' + ' ' + oObj.PatientUser.FirstName + ' ' + oObj.PatientUser.LastName + '</strong>';
          }
          return '';
        }
      },
      {
        "sTitle": "Provider Name",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          if (data) {
            return '<img width="30px" height="30px" *ngIf="oObj.PatientUser.ProfilePicture" src="' + oObj.ProviderUser.ProfilePicture + '" alt="" class="rounded-circle"><strong>' + ' ' + oObj.ProviderUser.FirstName + ' ' + oObj.ProviderUser.LastName + '</strong>';
          }
          return '';
        }
      },
      {
        "sTitle": "Date",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          if (data) {
            return this.datePipe.transform(data, "MM/dd/yyyy hh:mm a");
          }
          return '';
        }
      }
    ];
  }
}
