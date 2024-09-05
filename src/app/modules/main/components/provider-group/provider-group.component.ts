import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/modules/base.component';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { BaseCriteria } from 'src/app/modules/common/criterias/base.criteria';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { ProviderGroupService } from 'src/app/modules/common/services/provider-group.service';
import { EditProviderGroupComponent } from './edit-provider-group/edit-provider-group.component';

@Component({
  selector: 'app-provider-group',
  templateUrl: './provider-group.component.html',
  styleUrls: ['./provider-group.component.css']
})
export class ProviderGroupComponent extends BaseComponent implements OnInit {
  criteria: BaseCriteria = new BaseCriteria();
  serverLink = "/api/ProviderGroup/Search";
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;
  @ViewChild('modal') modal: EditProviderGroupComponent;

  constructor(public authService: AuthenticationService,
    private service: ProviderGroupService,
    private router: Router,
    private dialog: CommonDialogService,) {
    super(authService);
  }


  ngOnInit() {
    this.InitTable();
  }

  AddItem() {
    this.modal.show(null);
  }

  EditItem(id) {
    this.modal.show(id);
  }

  RemoveItem(id) {
    this.dialog.showSwalConfirmAlert("Are you sure you want to delete this item?")
      .then((isConfirm => {
        if (isConfirm) {
          this.service.Delete(id).subscribe(r => {
            if (r) {
              this.dialog.showToastrSuccess('Provider Groups', MessageConstant.REQUEST_SUCCESS_CONST);
              this.RefreshTable();
            }
          }, error => {
            this.dialog.showToastrError('Provider Groups', error.error);
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
      { "mData": "Name", "aTargets": [0] },
      { "mData": "ID", "aTargets": [1] }]

    this.aoColumns = [

      {
        "sTitle": "Group Name",
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