import { PatientRequestService } from './../../../../common/services/patient-request.service';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { PatientRequestModalComponent } from './../patient-request-modal/patient-request-modal.component';
import { ModalDirective } from 'ngx-bootstrap';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { PatientRequestCriteria } from './../../../../common/criterias/patient-request.criteria';
import { Component, OnInit, OnChanges, Input, SimpleChanges, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-request-table',
  templateUrl: './patient-request-table.component.html',
  styleUrls: ['./patient-request-table.component.css'],
  providers: [DatePipe]
})
export class PatientRequestTableComponent implements AfterViewInit, OnChanges {
  @Input() isClosed: boolean;
  @Input() patientName: string;
  @Input() requestCategory: string;
  @ViewChild('modal') modal: PatientRequestModalComponent;

  criteria: PatientRequestCriteria = new PatientRequestCriteria();
  serverLink = "/api/PatientRequest/Search";
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;

  constructor(private authService: AuthenticationService, private datePipe: DatePipe, private router: Router,
    private service: PatientRequestService,
    private dialog: CommonDialogService) {
    this.criteria.Status = this.isClosed ? "Closed" : "To Do";
    this.InitTable();
    this.authService.onReloadPatientRequestTable.subscribe(r => {
      if (this.RefreshTable) {
        this.RefreshTable();
      }
    });
  }

  ngAfterViewInit(): void {
    this.criteria.Status = this.isClosed ? "Closed" : "To Do";
    this.criteria.PatientName = this.patientName;
    this.criteria.RequestCategory = this.requestCategory;
  }

  ngOnChanges(params: SimpleChanges) {
    if (params) {
      if (params.isClosed?.currentValue && params.isClosed?.currentValue != params.isClosed?.previousValue) {
        this.criteria.Status = params.isClosed.currentValue ? "Closed" : "To Do";
      }
      if (params.patientName?.currentValue != params.patientName?.previousValue) {
        this.criteria.PatientName = params.patientName.currentValue??"";
      }
      if (params.requestCategory?.currentValue != params.requestCategory?.previousValue) {
        this.criteria.RequestCategory = params.requestCategory.currentValue??"";
      }

      this.RefreshTable();
    }
  }

  onFilterColumn(event) {
    if (event) {

    }
  }

  RefreshTable() {
    if (this.table) {
      this.table.ajax.reload();
    }
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
    this.aaSorting = [[3, "desc"]];
    this.aoColumnDefs = [
      { "mData": "PatientID", "aTargets": [0] },
      { "mData": "RequestCategory", "aTargets": [1] },
      { "mData": "CreatedDate", "aTargets": [2] },
      { "mData": "CreatedBy", "aTargets": [3] },
      { "mData": "ID", "aTargets": [4] }]

    this.aoColumns = [
      {
        "sTitle": "Patient",
        "sClass": "",
        "mRender": (data, type, oObj) => {

          var returnValue = '';
          if (oObj && oObj.User) {
            returnValue = '<img width="30px" height="30px" src="' + (oObj.User.ProfilePicture ?? 'https://umedoc-prod.s3.amazonaws.com/RandomFiles/umedoc-defaultavatar.png') + '" alt="" class="rounded-circle"><strong>' + ' ' + oObj.User.FirstName + ' ' + oObj.User.LastName + '</strong>';
          }

          return returnValue;
        }
      },
      {
        "sTitle": "RequestCategory",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          return data ?? '';
        }
      },
      {
        "sTitle": "Created Date",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          if (data) {
            return this.datePipe.transform(data, 'MM/dd/yyyy hh:mm a');
          }
          return ''
        }
      },
      {
        "sTitle": "Provider",
        "sClass": "",
        "mRender": (data, type, oObj) => {

          var returnValue = '';
          if (oObj && oObj.CreatedByUser) {
            returnValue = '<img width="30px" height="30px" src="' + (oObj.CreatedByUser.ProfilePicture ?? 'https://umedoc-prod.s3.amazonaws.com/RandomFiles/umedoc-defaultavatar.png') + '" alt="" class="rounded-circle"><strong>' + ' ' + oObj.CreatedByUser.FirstName + ' ' + oObj.CreatedByUser.LastName + '</strong>';
          }

          return returnValue;
        }
      },
      {
        "sTitle": "Action",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          var action = "";
          if (this.isClosed) {
            action += "<a class='btn btn-green btn-sm' href='javascript:void(0);' title='Delete' style='margin-bottom:1px' param='" + oObj.ID + "' method-name='MarkToDo'><i class='la la-circle-o'></i> Mark To Do</a> ";
          } else {
            action += "<a class='btn btn-green btn-min-width' href='javascript:void(0);' title='Delete' style='margin-bottom:1px' param='" + oObj.ID + "' method-name='MarkClosed'><i class='la la-check'></i> Mark Closed</a> ";
          }
          action += "<a class='btn btn-medical-white btn-min-width mr-0' href='javascript:void(0);' title='View Appointment Details' style='margin-bottom:1px' param='" + oObj.ID + "' method-name='EditItem'>View Details</a> ";
          action += "<a class='btn btn-outline-danger btn-min-width' href='javascript:void(0);' title='Delete' style='margin-bottom:1px' param='" + oObj.ID + "' method-name='DeleteItem'><i class='la la-remove'></i> Delete</a> ";
          return action;
        }
      }
    ];
  }

  AddItem() {
    this.modal.show(this.isClosed, null);
  }

  MarkToDo(id){
      this.service.MarkStatus(id, false).subscribe(r=>{
        this.dialog.showToastrWarning('Patient Request has been updateds!');
        this.authService.onReloadPatientRequestTable.emit(true);
      },error=>{
        this.dialog.showToastrError(
          'Error',
          MessageConstant.FAILURE_REQUEST
        );
      });
  }

  MarkClosed(id){
    this.service.MarkStatus(id, true).subscribe(r=>{
      this.dialog.showToastrWarning('Patient Request has been updateds!');
      this.authService.onReloadPatientRequestTable.emit(true);
    },error=>{
      this.dialog.showToastrError(
        'Error',
        MessageConstant.FAILURE_REQUEST
      );
    });
  }

  EditItem(id) {
    this.modal.show(this.isClosed, id);
  }

  DeleteItem(id) {
    if (!id) return;
    this.dialog.showSwalConfirmAlert("Are you sure you want to delete this request?").then((isConfirm => {
      if (isConfirm) {
        this.service.Delete(id).subscribe(
          r => {
            this.dialog.showToastrWarning('Patient Request has been deleted!');
            this.authService.onReloadPatientRequestTable.emit(true);
          },
          error => {
            this.dialog.showToastrError(
              'Error',
              MessageConstant.FAILURE_REQUEST
            );
          }
        );
      }
    }));
  }

}
