import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/modules/base.component';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { BaseCriteria } from 'src/app/modules/common/criterias/base.criteria';
import { InsuranceBalanceBillingModel } from 'src/app/modules/common/models/balance-billing.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { BalanceBillingService } from 'src/app/modules/common/services/balance-billing.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { InsuranceBalanceBillingModalComponent } from './insurance-balance-billing-modal/insurance-balance-billing-modal.component';
import { InsuranceBalanceBillingViewerComponent } from './insurance-balance-billing-viewer/insurance-balance-billing-viewer.component';

@Component({
  selector: 'app-insurance-balance-billings',
  templateUrl: './insurance-balance-billings.component.html',
  styleUrls: ['./insurance-balance-billings.component.css'],
  providers: [DatePipe]
})
export class InsuranceBalanceBillingsComponent extends BaseComponent implements OnInit,
  AfterViewInit {
  criteria: BaseCriteria = new BaseCriteria();
  serverLink = "/api/BalanceBilling/Search";
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;
  @ViewChild('modal') modal: InsuranceBalanceBillingModalComponent;
  @ViewChild('modalViewer') modalViewer: InsuranceBalanceBillingViewerComponent;
  constructor(public authService: AuthenticationService,
    private datePipe: DatePipe,
    private balanceBillingService: BalanceBillingService,
    private router: Router,
    private dialog: CommonDialogService) {
    super(authService);

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
      { "mData": "PatientName", "aTargets": [0] },
      { "mData": "AppointmentTime", "aTargets": [1] },
      { "mData": "DOB", "aTargets": [2] },
      { "mData": "Amount", "aTargets": [3] },
      { "mData": "IsPaid", "aTargets": [4] },
      { "mData": "PaidDate", "aTargets": [5] },
      { "mData": "ID", "aTargets": [6] }]

    this.aoColumns = [
      {
        "sTitle": "Patient Name",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          return data ?? '';
        }
      },
      {
        "sTitle": "Appointment Time",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          if (data) {
            return this.datePipe.transform(data, 'MM/dd/yyyy hh:mm a');
          }
          return '';
        }
      }, {
        "sTitle": "DOB",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          if (data) {
            return this.datePipe.transform(data, 'MM/dd/yyyy');
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
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          return data ? `<span class="badge badge-success">Paid</span>` : `<span class="badge badge-danger">Unpaid</span>`;
        }
      },
      {
        "sTitle": "Paid Date",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          if (data) {
            return this.datePipe.transform(data, 'MM/dd/yyyy hh:mm a');
          }
          return '';
        }
      },
      {
        "sTitle": "Action",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          var action = "";
          var strBilling = JSON.stringify(oObj);
          if (!oObj.IsPaid) {
            action += "<a class='btn btn-green btn-min-width' href='javascript:void(0);' title='Edit' style='margin-bottom:1px' param='" + strBilling + "' method-name='EditItem'>Edit</a> ";
            action += "<a class='btn btn-danger btn-min-width' href='javascript:void(0);' title='Remove' style='margin-bottom:1px' param='" + oObj.ID + "' method-name='RemoveItem'>Remove</a> ";
          }

          action += "<a class='btn btn-medical-white btn-min-width' href='javascript:void(0);' title='View PDF' style='margin-bottom:1px' param='" + strBilling + "' method-name='ViewItem'>View PDF</a> ";
          return action;
        }
      }
    ];
  }

  EditItem(strObj) {
    if (strObj) {
      var billing = JSON.parse(strObj) as InsuranceBalanceBillingModel;
      this.modal.show(billing.ID, billing.AppointmentID);
    }
  }

  ViewItem(strObj) {
    if (strObj) {
      var billing = JSON.parse(strObj) as InsuranceBalanceBillingModel;
      this.modalViewer.show(billing.ID);
    }
  }

  RemoveItem(id) {
    this.dialog.showSwalConfirmAlert('Delete this item?').then(r => {
      if (r) {
        this.balanceBillingService.Delete(id).subscribe(r => {
          this.dialog.showToastrSuccess('Delete Insurance Balance Billing', MessageConstant.REQUEST_SUCCESS_CONST);
          this.RefreshTable();
        }, error => {
          this.dialog.showSwalErrorAlert('Delete Insurance Balance Billing', 'This billing  is using by other.');
        });
      }
    })
  }
}