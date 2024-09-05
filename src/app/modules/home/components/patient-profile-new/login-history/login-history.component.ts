import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/modules/base.component';
import { BaseCriteria } from 'src/app/modules/common/criterias/base.criteria';
import { LoginHistoryCriteria } from 'src/app/modules/common/criterias/login-history.criteria';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';

@Component({
  selector: 'app-login-history',
  templateUrl: './login-history.component.html',
  styleUrls: ['./login-history.component.css'],
  providers: [DatePipe]
})
export class LoginHistoryComponent extends BaseComponent
  implements OnInit {

  criteria: LoginHistoryCriteria = new LoginHistoryCriteria();
  serverLink = "/api/LoginHistory/Search";
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;
  isUploading: boolean = false;
  @Input() userId: string;
  id: string;
  constructor(
    public authService: AuthenticationService,
    private datePipe: DatePipe,
  ) {
    super(authService);
  }

  ngOnInit() {
    this.criteria.CurrentUserID = this.userId;
    this.InitTable();
  }

  RefreshTable() {
    this.table.ajax.reload();
  }
  catchTable(event) {
    this.table = event;
  }

  uploadStatus(isCompleted) {
    this.isUploading = !isCompleted;
  }

  uploaded(event) {
    if (event != null) {
      this.RefreshTable();
    }
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

    this.criteria.CurrentPage = Math.ceil(
      this.criteria.CurrentPage / this.criteria.ItemPerPage
    );
    return this.criteria;
  }

  InitTable() {
    this.compRef = this;
    this.aaSorting = [[2, "desc"]];
    this.aoColumnDefs = [
      { mData: "IP", aTargets: [0] },
      { mData: "OS", aTargets: [1] },
      { mData: "OS_Version", aTargets: [2] },
      { mData: "Model", aTargets: [3] },
      { mData: "Browser", aTargets: [4] },
      { mData: "IsLoginFromMobileApp", aTargets: [5] },
      { mData: "LoginDate", aTargets: [6] }
    ];

    this.aoColumns = [
      {
        sTitle: "IP",
        sClass: "",
        mRender: (data, type, oObj) => {
          if (data
          ) {
            return "<a target='_blank' href='https://whatismyipaddress.com/ip/" + data + "'>" + data + "</a>";
          }
          return "";
        }
      },
      {
        sTitle: "OS",
        sClass: "",
        mRender: (data, type, oObj) => {
          if (data
          ) {
            return data;
          }
          return "";
        }
      },
      {
        sTitle: "OS Version",
        sClass: "",
        mRender: (data, type, oObj) => {
          if (data
          ) {
            return data;
          }
          return "";
        }
      },
      {
        sTitle: "Model",
        sClass: "",
        mRender: (data, type, oObj) => {
          if (data) {
            return data;
          }
          return "";
        }
      },
      {
        sTitle: "Browser",
        sClass: "",
        mRender: (data, type, oObj) => {
          if (data) {
            return data;
          }
          return "";
        }
      },
      {
        sTitle: "Login on App",
        sClass: "",
        mRender: (data, type, oObj) => {
          if (data
          ) {
            return "<span class='badge badge-success'>Yes</span>";
          }
          return "<span class='badge badge-danger'>No</span>";
        }
      },
      {
        sTitle: "Login Date",
        sClass: "",
        mRender: (data, type, oObj) => {
          if (data) {
            return this.datePipe.transform(data, "MM/dd/yy hh:mm a");
          }
          return "";
        }
      },
    ];
  }
}

