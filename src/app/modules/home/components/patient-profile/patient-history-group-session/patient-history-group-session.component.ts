import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/modules/base.component';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { GroupApptPatientCriteria } from 'src/app/modules/common/criterias/group-appt-patient.criteria';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { GroupApptDocumentsService } from 'src/app/modules/common/services/group-appt-documents.service';
import { GroupApptPatientService } from 'src/app/modules/common/services/group-appt-patient.service';
import { GroupApptDocumentViewsComponent } from './group-appt-document-views/group-appt-document-views.component';

@Component({
  selector: 'app-patient-history-group-session',
  templateUrl: './patient-history-group-session.component.html',
  styleUrls: ['./patient-history-group-session.component.css'],
  providers: [DatePipe]
})
export class PatientHistoryGroupSessionComponent extends BaseComponent implements OnInit {
  criteria: GroupApptPatientCriteria = new GroupApptPatientCriteria();
  @ViewChild('groupApptDocumentModal') groupApptDocumentModal: GroupApptDocumentViewsComponent;

  serverLink = "/api/GroupApptPatient/Search";
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;
  constructor(
    public authService: AuthenticationService,
    private datePipe: DatePipe,
    private groupApptPatientService: GroupApptPatientService,
    private router: Router,
    private dialog: CommonDialogService,
    private groupApptDocumentService: GroupApptDocumentsService
  ) {
    super(authService);
  }

  ngOnInit() {
    this.InitTable();
    this.criteria.PatientID = this.currentUser.Id;
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

    this.criteria.CurrentPage = Math.ceil(
      this.criteria.CurrentPage / this.criteria.ItemPerPage
    );
    return this.criteria;
  }

  join(id) {
    this.router.navigateByUrl(`/group-appt-waiting-room/${id}`);
  }

  ViewItem(id) {
    this.groupApptDocumentModal.groupApptID = id;
    this.groupApptDocumentModal.show(id);
  }

  cancelled(id) {
    if (!id) return;
    this.dialog.showSwalConfirmAlert("Are you sure you want to cancel this Appointment?").then((isConfirm => {
      if (isConfirm) {
        this.groupApptPatientService.Cancelled(id).subscribe(
          r => {
            this.dialog.showSwalSuccesAlert("Group Appt Session", 'Group Appt Patient has been cancelled!');
            this.RefreshTable();
          },
          error => {
            this.dialog.showSwalErrorAlert(
              'Group Appt Session',
              MessageConstant.FAILURE_REQUEST
            );
          }
        );
      }
    }));
  } 

  InitTable() {
    this.compRef = this;
    this.aaSorting = [[2, "desc"]];
    this.aoColumnDefs = [
      { mData: "GroupApptID", aTargets: [0] },
      { mData: "GroupApptID", aTargets: [1] },
      { mData: "GroupApptID", aTargets: [2] },
      { mData: "GroupApptID", aTargets: [3] },
      { mData: "ID", aTargets: [4] }
    ];

    this.aoColumns = [
      {
        sTitle: "Provider",
        sClass: "",
        mRender: (data, type, oObj) => {
          if (
            oObj &&
            oObj.GroupAppt &&
            oObj.GroupAppt.Provider
          ) {
            return (
              '<img width="30px" height="30px" *ngIf="oObj.GroupAppt.ProviderAvatar" src="' +
              oObj.GroupAppt.ProviderAvatar +
              '" alt="" class="rounded-circle"><strong>' +
              " " +
              oObj.GroupAppt.ProviderName +
              "</strong>"
            );
          }
          return "";
        }
      },
      {
        sTitle: "Category",
        sClass: "",
        mRender: (data, type, oObj) => {
          if (oObj.GroupAppt) {
            return '<span style="white-space:normal;">' + oObj.GroupAppt.CategoryName + '</span>';
          }
          return "";
        }
      },

      {
        "sTitle": "Start Time",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          if (oObj && oObj.GroupAppt && oObj.GroupAppt.StartTime) {
            return this.datePipe.transform(oObj.GroupAppt.StartTime, 'MM/dd/yyyy hh:mm a');
          }

          return '';
        }
      },
      {
        sTitle: "Status",
        sClass: "text-center",
        mRender: (data, type, oObj) => {
          if (oObj && oObj.GroupAppt) {
            if (oObj.IsCancelled) {
              return (
                '<span class="badge badge-secondary"> Cancelled</span>'
              );
            } else {
              if (oObj.GroupAppt.Status === "Scheduled") {
                return (
                  '<span class="badge badge-danger">' +
                  oObj.GroupAppt.Status +
                  "</span>"
                );
              } else if (oObj.GroupAppt.Status === "InSession") {
                return (
                  '<span class="badge badge-warning">' +
                  oObj.GroupAppt.Status +
                  "</span>"
                );
              } else if (oObj.GroupAppt.Status === "Completed") {
                return (
                  '<span class="badge badge-success">' +
                  oObj.GroupAppt.Status +
                  "</span>"
                );
              } else {
                return (
                  '<span class="badge badge-secondary">' +
                  oObj.GroupAppt.Status +
                  "</span>"
                );
              }
            }
          }
          return "";
        }
      },
      {
        sTitle: "Action",
        sClass: "text-center",
        mRender: (data, type, oObj) => {
          var action = '';
          if (oObj && !oObj.IsCancelled && oObj.GroupAppt && (oObj.GroupAppt.Status == 'Scheduled' || oObj.GroupAppt.Status == 'InSession')) {
            action = `<a href='javascript:void(0)' param="${oObj.GroupApptID}" method-name='join' class='btn btn-green btn-sm btn-min-width' style='margin-bottom:1px'>Join Session</a>`;
          }
          if (oObj && !oObj.IsCancelled && oObj.GroupAppt && oObj.GroupAppt.Status == 'Scheduled') {
            action += `<a href='javascript:void(0)' param="${oObj.ID}" method-name='cancelled' class='btn btn-medical-white btn-sm btn-min-width ml-1' style='margin-bottom:1px'>Cancel</a>`;
          }

          if (oObj.GroupApptDocuments && oObj.GroupApptDocuments.length > 0) {
            action += `<a href='javascript:void(0)' param="${oObj.GroupApptID}" method-name='ViewItem' class='btn btn-info btn-sm btn-min-width' style='margin-bottom:1px'>View Documents</a>`;

          }

          return action;
        }
      },
    ];
  }
}
