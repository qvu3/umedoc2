import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/modules/base.component';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { PatientPaymentHistoryCriteria } from 'src/app/modules/common/models/patient-payment-history.criteria';
import RestrictedPatientLogModel from 'src/app/modules/common/models/restricted-patient-log.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { RestrictedPatientLogService } from 'src/app/modules/common/services/restricted-patient-log.service';
import { Options } from 'select2';
import Global from 'src/app/Global';
import { Select2OptionData } from 'ng-select2';
import { BaseCriteria } from 'src/app/modules/common/criterias/base.criteria';

@Component({
  selector: 'app-management-patient-payment-history',
  templateUrl: './management-patient-payment-history.component.html',
  styleUrls: ['./management-patient-payment-history.component.css'],
  providers: [DatePipe]
})
export class ManagementPatientPaymentHistoryComponent extends BaseComponent implements OnInit {
  criteria: PatientPaymentHistoryCriteria = new PatientPaymentHistoryCriteria();
  serverLink = "/api/PatientProfile/SearchTransactionPaymentHistory";
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;

  options: Options
  ajaxOptions: any;
  results: any = [];

  constructor(public authService: AuthenticationService,
    private datePipe: DatePipe,
    private restrictedPatientLogService: RestrictedPatientLogService,
    private dialog: CommonDialogService,
    private router: Router) {
    super(authService);
  }

  ngOnInit() {
    var date = new Date();
    date.setDate(date.getDate() - 7);
    this.criteria.FromDate = date;
    this.criteria.ToDate = new Date();
    this.InitTable();

    this.ajaxOptions = {
      url: `${Global.apiUrl}/api/User/SearchPatientUser`,
      dataType: 'json',
      delay: 250,
      cache: true,
      method: 'POST',
      headers: {
        "Authorization": Global.getToken()
      },
      data: (params: any) => {
        let criteria = new BaseCriteria();
        criteria.SearchText = params.term;
        criteria.CurrentPage = params.page ? params.page : 0;
        return criteria;
      },
      processResults: (data: any, params: any) => {
        params.page = params.page || 1;
        return {
          results: $.map(data.Data, function (obj) {
            return { id: obj.CustomerID, text: obj.PatientName, additional: { image: obj.Avatar } }
          }),
          pagination: {
            more: (params.page * 20) < data.TotalRecords
          }
        };
      }
    };

    this.options = {
      width: 'auto',
      minimumInputLength: 3,
      ajax: this.ajaxOptions,
      templateResult: this.templateResult,
      templateSelection: this.templateSelection
    } as Options;
  }


  // function for result template
  public templateResult = (state: Select2OptionData): JQuery | string => {
    if (!state.id) {
      return state.text; 
    }

    let image = '';

    // if (state.additional.image) {
    //   image = '<span class="mr-1"><img  width="25" height="25" src="' + state.additional.image + '"</span>';
    // }

    return jQuery('<span>' + image + ' ' + state.text + '</span>');
  }

  // function for selection template
  public templateSelection = (state: Select2OptionData): JQuery | string => {
    if (!state.id) {
      return state.text;
    }

    let image = '';

    // if (state.additional.image) {
    //   image = '<span class="mr-1"><img width="25" height="25" src="' + state.additional.image + '"</span>';
    // }

    return jQuery('<span>' + image + ' ' + state.text + '</span>');
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
    this.aaSorting = [[7, "desc"]];
    this.aoColumnDefs = [
      { "mData": "PatientName", "aTargets": [0] },
      { "mData": "DOB", "aTargets": [1] },
      { "mData": "Email", "aTargets": [2] },
      { "mData": "CellPhone", "aTargets": [3] },
      { "mData": "Amount", "aTargets": [4] },
      { "mData": "Description", "aTargets": [5] },
      { "mData": "Status", "aTargets": [6] },
      { "mData": "Date", "aTargets": [7] }]

    this.aoColumns = [
      {
        "sTitle": "Patient Name",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          if (oObj.Avatar) {
            return '<img width="30px" height="30px" *ngIf="oObj.Avatar" src="' + oObj.Avatar + '" alt="" class="rounded-circle"><strong>' + ' ' + oObj.PatientName + '</strong>';
          } else {
            return '<strong>' + ' ' + oObj.PatientName + '</strong>';
          }
        }
      },
      {
        "sTitle": "DOB",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          if (data) {
            return `${this.datePipe.transform(data, 'MM/dd/yyyy')}`
          }
          return '';
        }
      }, {
        "sTitle": "Email",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          if (data) {
            return data;
          }
          return '';
        }
      }, {
        "sTitle": "Cell Phone",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          if (data) {
            return data;
          }
          return '';
        }
      },
      {
        "sTitle": "Amount",
        "sClass": "text-right",
        "mRender": (data, type, oObj) => {
          return `\$${data}`;
        }
      }, {
        "sTitle": "Description",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          if (data) {
            return data;
          }
          return '';
        }
      },

      {
        "sTitle": "Status",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          if (data) {
            if (data === 'charge - succeeded') {
              return '<span class="badge badge-success">' + data + '</span>';
            } else if (data === 'charge - holding') {
              return '<span class="badge badge-warning">' + data + '</span>';
            } else if (data === 'holding - canceled') {
              return '<span class="badge badge-danger">' + data + '</span>';
            } else {
              return '<span class="badge badge-secondary">' + data + '</span>';
            }
          } else {
            return "";
          }
        }
      },

      {
        "sTitle": "CreatedDate",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          if (data) {
            return `${this.datePipe.transform(data, 'MM/dd/yyyy hh:mm a')}`
          }
          return '';
        }
      }
    ];
  }

  ValueChange(event){
    this.RefreshTable();
  }
}
