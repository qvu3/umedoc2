import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/modules/base.component';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { BaseCriteria } from 'src/app/modules/common/criterias/base.criteria';
import { StateNamePipe } from 'src/app/modules/common/directive/state-name.pipe';
import { ProviderLicenseModel } from 'src/app/modules/common/models/provider-license.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { ProviderLicenseService } from 'src/app/modules/common/services/provider-license.service';
import { ProviderProfileService } from 'src/app/modules/common/services/provider-profile.service';
import { ProviderLicenseInfoComponent } from './provider-license-info/provider-license-info.component';

@Component({
  selector: 'app-provider-licenses',
  templateUrl: './provider-licenses.component.html',
  styleUrls: ['./provider-licenses.component.css'],
  providers: [DatePipe, StateNamePipe]
})
export class ProviderLicensesComponent extends BaseComponent implements OnInit {
  criteria: BaseCriteria = new BaseCriteria();
  serverLink = "/api/ProviderLicense/SearchAsync";
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;
  @ViewChild('modal') modal: ProviderLicenseInfoComponent;

  constructor(public authService: AuthenticationService,
    private service: ProviderLicenseService,
    private activeRouter: ActivatedRoute,
    private stateNamePipe: StateNamePipe,
    private dialog: CommonDialogService,
    private datePipe: DatePipe) {
    super(authService);
    activeRouter.parent.params.subscribe(r => {
      if (r && r['{id}']) {
        this.criteria.CurrentUserID = r['{id}'];
      } else {
        this.criteria.CurrentUserID = this.currentUser.Id;
      }
    });
  }

  ngOnInit() {
    this.InitTable();
  }

  AddItem() {
    this.modal.show(null, this.criteria.CurrentUserID);
  }

  EditItem(id) {
    this.modal.show(id, this.criteria.CurrentUserID);
  }

  ViewImage(id) {

  }

  RemoveItem(id) {
    this.dialog.showSwalConfirmAlert("Are you sure you want to delete this item?")
      .then((isConfirm => {
        if (isConfirm) {
          this.service.Delete(id).subscribe(r => {
            this.dialog.showToastrSuccess('Provider License', MessageConstant.REQUEST_SUCCESS_CONST);
            this.RefreshTable();
          }, error => {
            this.dialog.showToastrError('Provider License', MessageConstant.FAILURE_REQUEST);
          });
        }
      }));
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
    this.aaSorting = [[0, "asc"]];
    this.aoColumnDefs = [
      { "mData": "LicenseState", "aTargets": [0] },
      { "mData": "LicenseNumber", "aTargets": [1] },
      { "mData": "EffectiveDate", "aTargets": [2] },
      { "mData": "ExpirationDate", "aTargets": [3] },
      { "mData": "DEANumber", "aTargets": [4] },
      { "mData": "DEAExpirationDate", "aTargets": [5] },
      { "mData": "MalpracticeRenewalDate", "aTargets": [6] },
      { "mData": "ID", "aTargets": [7] }]

    this.aoColumns = [
      {
        "sTitle": "State",
        "sClass": "text-left",
        "mRender": (data, type, oObj) => {
          if (data) {
            return this.stateNamePipe.transform(data);
          }
          return '';
        }
      },
      {
        "sTitle": "License Number",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          if (data) {
            return data;
          }
          return '';
        }
      },
      {
        "sTitle": "Effective Date",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          if (data) {
            return this.datePipe.transform(data, 'MM/dd/yyyy');
          }
          return '';
        }
      },
      {
        "sTitle": "Expiration Date",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          if (data) {
            return this.datePipe.transform(data, 'MM/dd/yyyy');
          }
          return '';
        }
      },
      {
        "sTitle": "DEA#",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          if (data) {
            return data;
          }
          return '';
        }
      },
      {
        "sTitle": "DEA Exp.",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          if (data) {
            return this.datePipe.transform(data, 'MM/dd/yyyy');
          }
          return '';
        }
      },
      {
        "sTitle": "Malpractice Ins. Exp.",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          if (data) {
            return this.datePipe.transform(data, 'MM/dd/yyyy');
          }
          return '';
        }
      },
      {
        "sTitle": "Action",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          var action = "";

          if (this.currentUser && this.currentUser.Role
            && (this.currentUser.Role == 'Special_Admin'
              || this.currentUser.Role == 'Company_Admin'
              || this.currentUser.Role == 'Provider')) {
            action += "<a class='btn btn-medical-white' href='javascript:void(0);' title='Edit Provider License' style='margin-bottom:1px' class='btn  btn-info btn-xs' param='" + oObj.ID + "' method-name='EditItem'><i class='la la-edit'></i></a> ";
            action += "<a class='btn btn-green' href='javascript:void(0);' title='Manage Appointment Slot' style='margin-bottom:1px' class='btn  btn-info btn-xs' param='" + oObj.ID + "' method-name='RemoveItem'><i class='la la-trash-o'></i></a> ";
          }

          if (oObj.LicenseImageUrlView) {
            action += "<a class='btn btn-medical-white' target='_blank' href='" + oObj.LicenseImageUrlView + "' title='View License Image' style='margin-bottom:1px' class='btn  btn-info btn-xs' param='" + oObj.ID + "' method-name='ViewImage'><i class='la la-file-picture-o'></i></a> ";
          }
          return action;
        }
      }
    ];
  }
}