import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/modules/base.component';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { BaseCriteria } from 'src/app/modules/common/criterias/base.criteria';
import { StateNamePipe } from 'src/app/modules/common/directive/state-name.pipe';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { ProviderProfileService } from 'src/app/modules/common/services/provider-profile.service';
import { EditProviderServiceComponent } from './edit-provider-service/edit-provider-service.component';

@Component({
  selector: 'app-provider-services',
  templateUrl: './provider-services.component.html',
  styleUrls: ['./provider-services.component.css'],
  providers: [StateNamePipe]
})
export class ProviderServicesComponent extends BaseComponent implements OnInit {
  criteria: BaseCriteria = new BaseCriteria();
  serverLink = "/api/ProviderProfile/SearchProviderService";
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;
  @ViewChild('modal') modal: EditProviderServiceComponent;

  constructor(public authService: AuthenticationService,
    private service: ProviderProfileService,
    private activeRouter: ActivatedRoute,
    private stateNamePipe:StateNamePipe,
    private router: Router,
    private dialog: CommonDialogService,) {
    super(authService);
    activeRouter.parent.params.subscribe(r => {
      if (r && r['{id}']) {
        this.criteria.CurrentUserID = r['{id}'];
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

  RemoveItem(id) {
    this.dialog.showSwalConfirmAlert("Are you sure you want to delete this item?")
      .then((isConfirm => {
        if (isConfirm) {
          this.service.DeleteProviderService(id).subscribe(r => {
            this.dialog.showToastrSuccess('Provider Service', MessageConstant.REQUEST_SUCCESS_CONST);
            this.RefreshTable();
          }, error => {
            this.dialog.showToastrError('Provider Service', MessageConstant.FAILURE_REQUEST);
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
    this.aaSorting = [[0, "desc"]];
    this.aoColumnDefs = [
      { "mData": "ProviderLicense.LicenseState", "aTargets": [0] },
      { "mData": "ApptCategory.Name", "aTargets": [1] },
      { "mData": "Price", "aTargets": [2] },
      { "mData": "ID", "aTargets": [3] }]

    this.aoColumns = [
      {
        "sTitle": "State",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          if (data) {
            return this.stateNamePipe.transform(data);
          }
          return '';
        }
      },
      {
        "sTitle": "Service Name",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          if (data) {
            return data;
          }
          return '';
        }
      },
      {
        "sTitle": "Price",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          return `$${data ?? 0}`;
        }
      },
      {
        "sTitle": "Action",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          var action = "";
          action += "<a class='btn btn-medical-white' href='javascript:void(0);' title='Edit Staff Profile' style='margin-bottom:1px' class='btn  btn-info btn-xs' param='" + oObj.ID + "' method-name='EditItem'><i class='la la-edit'></i></a> ";
          action += "<a class='btn btn-green' href='javascript:void(0);' title='Manage Appointment Slot' style='margin-bottom:1px' class='btn  btn-info btn-xs' param='" + oObj.ID + "' method-name='RemoveItem'><i class='la la-trash-o'></i></a> ";
          return action;
        }
      }
    ];
  }


}