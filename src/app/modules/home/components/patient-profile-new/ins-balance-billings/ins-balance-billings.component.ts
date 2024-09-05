import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { BaseCriteria } from 'src/app/modules/common/criterias/base.criteria';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { BalanceBillingService } from 'src/app/modules/common/services/balance-billing.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';

@Component({
  selector: 'app-ins-balance-billings',
  templateUrl: './ins-balance-billings.component.html',
  styleUrls: ['./ins-balance-billings.component.css'],
  providers: [DatePipe]
})
export class InsBalanceBillingsComponent extends BaseComponent implements OnInit,
  AfterViewInit {
  criteria: BaseCriteria = new BaseCriteria();
  serverLink = "/api/BalanceBilling/Search";
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;
  constructor(public authService: AuthenticationService,
    private datePipe: DatePipe,
    private balanceBillingService: BalanceBillingService,
    private dialog: CommonDialogService) {
    super(authService);
    this.criteria.CurrentUserID == this.currentUser.Id;
  }


  ngOnInit() {
    this.InitTable();
  }

  ngAfterViewInit() {

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

    this.criteria.CurrentPage = Math.ceil(this.criteria.CurrentPage / this.criteria.ItemPerPage);
    return this.criteria;
  }

  InitTable() {
    this.compRef = this;
    this.aaSorting = [[0, "desc"]];
    this.aoColumnDefs = [
      { "mData": "AppointmentTime", "aTargets": [0] },
      { "mData": "Amount", "aTargets": [1] },
      { "mData": "IsPaid", "aTargets": [2] },
      { "mData": "PaidDate", "aTargets": [3] },
      { "mData": "PatientName", "aTargets": [4] },
      { "mData": "ID", "aTargets": [5] }]

    this.aoColumns = [
      {
        "sTitle": "Appointment Time",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          if (data) {
            return this.datePipe.transform(data, 'MM/dd/yyyy hh:mm a');
          }
          return '';
        }
      },
      {
        "sTitle": "Amount",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          if (data) {
            return `\$${data}`;
          }
          return '';
        }
      },
      {
        "sTitle": "Paid",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          return data ? `<span class="badge badge-success">Paid</span>` : `<span class="badge badge-danger">Unpaid</span>`;
        }
      },
      {
        "sTitle": "Paid Date",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          if (data) {
            return this.datePipe.transform(data, 'MM/dd/yyyy hh:mm a');
          }
          return '';
        }
      }, {
        "sTitle": "Patient Name",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          if (data) {
            return data;
          }
          return '';
        }
      },
      {
        "sTitle": "Action",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          var action = "";
          if (!oObj.IsPaid) {
            var strBilling = JSON.stringify(oObj);
            action += "<a class='btn btn-medical-white btn-min-width' href='/insurance-balance-billing/" + oObj.ID + "' target='blank' title='Edit' style='margin-bottom:1px'>View Details</a> ";
          }
          return action;
        }
      }
    ];
  }

}