import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { BaseCriteria } from 'src/app/modules/common/criterias/base.criteria';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { ProviderInsuranceInNetService } from 'src/app/modules/common/services/provider-insurance-in-net.service';
import { EditProviderInsuranceInNetComponent } from './edit-provider-insurance-in-net/edit-provider-insurance-in-net.component';
import { StateNamePipe } from 'src/app/modules/common/directive/state-name.pipe';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-provider-insurance-in-net',
  templateUrl: './provider-insurance-in-net.component.html',
  styleUrls: ['./provider-insurance-in-net.component.css'],
  providers: [StateNamePipe]
})
export class ProviderInsuranceInNetComponent extends BaseComponent implements OnInit {
  criteria: BaseCriteria = new BaseCriteria();
  serverLink = "/api/ProviderInsuranceInNet/Search";
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;
  @ViewChild('modal') modal: EditProviderInsuranceInNetComponent;

  constructor(public authService: AuthenticationService,
    private service: ProviderInsuranceInNetService,
    private router: Router,
    private stateNamePipe: StateNamePipe,
    activeRouter: ActivatedRoute,
    private dialog: CommonDialogService,) {
    super(authService);
    activeRouter.parent.params.subscribe(r => {
      if (r && r['{id}']) {
        this.criteria.CurrentUserID = r['{id}'];
      }
      else {
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
    this.modal.show(id, null);
  }

  RemoveItem(id) {
    this.dialog.showSwalConfirmAlert("Are you sure you want to delete this item?")
      .then((isConfirm => {
        if (isConfirm) {
          this.service.Delete(id).subscribe(r => {
            if (r) {
              this.dialog.showToastrSuccess('Provider Insurance In Net', MessageConstant.REQUEST_SUCCESS_CONST);
              this.RefreshTable();
            }
          }, error => {
            this.dialog.showToastrError('Provider Insurance In Net', error.error);
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
      { "mData": "PayerName", "aTargets": [0] },
      { "mData": "ID", "aTargets": [1] }]

    this.aoColumns = [ 
      {
        "sTitle": "Insurance",
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
          action += "<a class='btn btn-medical-white' href='javascript:void(0);' title='Edit Staff Profile' style='margin-bottom:1px' class='btn  btn-info btn-xs' param='" + oObj.ID + "' method-name='EditItem'><i class='la la-edit'></i></a> ";
          action += "<a class='btn btn-green' href='javascript:void(0);' title='Manage Appointment Slot' style='margin-bottom:1px' class='btn  btn-info btn-xs' param='" + oObj.ID + "' method-name='RemoveItem'><i class='la la-trash-o'></i></a> ";
          return action;
        }
      }
    ];
  }


}