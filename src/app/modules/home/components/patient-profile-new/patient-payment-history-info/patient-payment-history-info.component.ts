import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component'; 
import { StripePaymentHistoryCriteria } from 'src/app/modules/common/criterias/stripe-payment-history.criteria';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service'; 
@Component({
  selector: 'app-patient-payment-history-info',
  templateUrl: './patient-payment-history-info.component.html',
  styleUrls: ['./patient-payment-history-info.component.css'],
  providers: [DatePipe]
})
export class PatientPaymentHistoryInfoComponent extends BaseComponent implements OnInit {
  criteria: StripePaymentHistoryCriteria = new StripePaymentHistoryCriteria();
  serverLink = "/api/Appointment/GetStripePaymentPatientHistory";
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;
  @Input() patientID: string; 
  constructor(public authService: AuthenticationService,
    private appointmentService: AppointmentService,
    private dialog: CommonDialogService,
    private datePipe: DatePipe,) {
    super(authService);
  }

  ngOnInit() {
    this.criteria.PatientID = this.patientID;
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
    this.aaSorting = [[4, "desc"]];
    this.aoColumnDefs = [
      { "mData": "Amount", "aTargets": [0] },
      { "mData": "Currency", "aTargets": [1] },
      { "mData": "Status", "aTargets": [2] },
      { "mData": "Description", "aTargets": [3] },
      { "mData": "CreatedDate", "aTargets": [4] }]

    this.aoColumns = [
      {
        "sTitle": "Amount",
        "sClass": "text-right",
        "mRender": (data, type, oObj) => {
          return data;
        }
      },
      {
        "sTitle": "Currency",
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
}