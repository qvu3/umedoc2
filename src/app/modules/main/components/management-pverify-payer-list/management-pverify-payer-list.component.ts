import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/modules/base.component';
import { PverifyPayerListCriteria } from 'src/app/modules/common/criterias/pverify-payer-list.criteria';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { AddPverifyPayerListModalComponent } from './add-pverify-payer-list-modal/add-pverify-payer-list-modal.component';

@Component({
  selector: 'app-management-pverify-payer-list',
  templateUrl: './management-pverify-payer-list.component.html',
  styleUrls: ['./management-pverify-payer-list.component.css']
})
export class ManagementPverifyPayerListComponent extends BaseComponent implements OnInit {
  criteria: PverifyPayerListCriteria = new PverifyPayerListCriteria();
  serverLink = "/api/PVerifyPayerList/Search";
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;
  @ViewChild('addModal') addModal: AddPverifyPayerListModalComponent;
  constructor(public authService: AuthenticationService) {
    super(authService);
  }

  ngOnInit() {
    this.criteria.ChargeFullAmount = null;
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
    this.aaSorting = [[0, "desc"]];
    this.aoColumnDefs = [
      { "mData": "PayerName", "aTargets": [0] },
      { "mData": "ChargeFullAmount", "aTargets": [1] },
      { "mData": "ID", "aTargets": [2] }]

    this.aoColumns = [
      {
        "sTitle": "Name",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          if (data && !oObj.ParentUserID) {
            return "<span class='text-info'>" + data + "</span>";
          }
          return '';
        }
      },
      {
        "sTitle": "Full Charge",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          if (data) {
            return '<input class="icheckbox_flat-green checked" type="checkbox" name="ChargeFullAmount" checked="checked" disabled="disabled">';
          }
          return '<input class="icheckbox_flat-green checked" type="checkbox" name="ChargeFullAmount"  disabled="disabled">';
        }
      },
      {
        "sTitle": "Action",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          return "<a class='btn btn-medical-white' href='javascript:void(0);' title='Edit' style='margin-bottom:1px' class='btn  btn-info btn-xs' param='" + oObj.ID + "' method-name='EditItem'><i class='la la-edit'></i></a> ";
        }
      }
    ];
  }

  EditItem(id) {
    this.addModal.show(id);
  }
}