import { Component, OnInit, Input } from "@angular/core";
import { AppointmentService } from "src/app/modules/common/services/appointment.service";
import { AuthenticationService } from "src/app/modules/common/services/authentication.service";
import { AppointmentCriteria } from "src/app/modules/common/criterias/appointment.criteria";
import { BaseComponent } from "src/app/modules/base.component";
import { DatePipe } from "@angular/common";
import { Router } from '@angular/router';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';

@Component({
  selector: "app-patient-history-appointment",
  templateUrl: "./patient-history-appointment.component.html",
  styleUrls: ["./patient-history-appointment.component.css"],
  providers: [DatePipe]
})
export class PatientHistoryAppointmentComponent extends BaseComponent
  implements OnInit {
  @Input() appointmentID: string;
  criteria: AppointmentCriteria = new AppointmentCriteria();
  serverLink = "/api/Appointment/SearchHistoryAppointmentByCriteria";
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;
  constructor(
    public authService: AuthenticationService,
    private datePipe: DatePipe,
    private appointmentService: AppointmentService,
    private router: Router,
    private dialog: CommonDialogService
  ) {
    super(authService);
  }

  ngOnInit() {
    this.InitTable();
    if (this.appointmentID) {
      this.criteria.ID = this.appointmentID;
    } else {
      this.criteria.PatientID = this.currentUser.Id;
    }
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

  gotoWatingRoom(id) {
    if (this.currentUser && this.currentUser.Role) {
      if (this.currentUser.Role == "Patient") {
        this.router.navigate(['/appointment-room', id]);
      } else {
        this.router.navigateByUrl(`/management/requested-appointment-details/${id}`);
      }
    }

  }

  cancelAppointment(id) {
    if (!id) return;
    this.dialog.showSwalConfirmAlert("Are you sure you want to cancel this appointment?").then((isConfirm => {
      if (isConfirm) {
        this.appointmentService.CancelledAppointment(id).subscribe(
          r => {
            this.dialog.showToastrWarning('Appointment has been cancelled!');
            this.RefreshTable();
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

  InitTable() {
    this.compRef = this;
    this.aaSorting = [[2, "desc"]];
    this.aoColumnDefs = [
      { mData: "ProviderUserName", aTargets: [0] },
      { mData: "AppointmentTime", aTargets: [1] },
      { mData: "CreatedOn", aTargets: [2] },
      { mData: "GenerateReasonAssignment", aTargets: [3] },
      { mData: "AppointmentFollowUp", aTargets: [4] },
      { mData: "FirstName", aTargets: [5] },
      { mData: "ID", aTargets: [6] }
    ];

    this.aoColumns = [
      {
        sTitle: "Provider",
        sClass: "",
        mRender: (data, type, oObj) => {
          if (
            oObj &&
            oObj.ProviderUser &&
            oObj.ProviderUser.FirstName &&
            oObj.ProviderUser.LastName
          ) {
            return (
              '<img width="30px" height="30px" *ngIf="oObj.ProviderUser.ProfilePicture" src="' +
              oObj.ProviderUser.ProfilePicture +
              '" alt="" class="rounded-circle"><strong>' +
              " " +
              oObj.ProviderUser.FirstName +
              " " +
              oObj.ProviderUser.LastName +
              "</strong>"
            );
          }
          return "";
        }
      },
      {
        "sTitle": "Appointment Time",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          if (oObj && oObj.IsOnDemand) {
            return 'On Demand';
          } else {
            return this.datePipe.transform(data, 'MM/dd/yyyy hh:mm a');
          }
        }
      },
      {
        sTitle: "Requested On",
        sClass: "",
        mRender: (data, type, oObj) => {
          if (data) {
            return this.datePipe.transform(data, "MM/dd/yyyy hh:mm a");
          }
          return "";
        }
      },
      {
        sTitle: "Reasons",
        sClass: "",
        mRender: (data, type, oObj) => {
          if (data) {
            return (
              '<span class="text-bold-600 text-primary">' + data + "</span>"
            );
          }
          return "";
        }
      },
      {
        sTitle: "Follow Up",
        sClass: "",
        mRender: (data, type, oObj) => {
          if (data) {
            return '<span style="white-space:normal;">' + data + '</span>';
          }
          return "";
        }
      },
      {
        sTitle: "Status",
        sClass: "text-center",
        mRender: (data, type, oObj) => {
          if (oObj && oObj.AppointmentStatus) {
            if (oObj.AppointmentStatus.StatusName === "Requested") {
              return (
                '<span class="badge badge-danger">' +
                oObj.AppointmentStatus.StatusName +
                "</span>"
              );
            } else if (oObj.AppointmentStatus.StatusName === "InSession") {
              return (
                '<span class="badge badge-warning">' +
                oObj.AppointmentStatus.StatusName +
                "</span>"
              );
            } else if (oObj.AppointmentStatus.StatusName === "Completed") {
              return (
                '<span class="badge badge-success">' +
                oObj.AppointmentStatus.StatusName +
                "</span>"
              );
            } else {
              return (
                '<span class="badge badge-secondary">' +
                oObj.AppointmentStatus.StatusName +
                "</span>"
              );
            }
          }
          return "";
        }
      },
      {
        sTitle: "Action",
        sClass: "text-center",
        mRender: (data, type, oObj) => {
          if (data) {
            if (oObj && oObj.AppointmentStatus) {
              if (oObj.AppointmentStatus.StatusName === "Requested" || oObj.AppointmentStatus.StatusName === "InSession") {
                var action = `<a href='javascript:void(0)' param="${oObj.ID}" method-name='gotoWatingRoom' class='btn btn-green mr-1'>Join Visit </a>`;
                action += `<a href='javascript:void(0)' param="${oObj.ID}" method-name='cancelAppointment' class='btn btn-medical-white'>Cancel Appt</a>`;
                return action;
              }
            }
          }
          return "";
        }
      },
    ];
  }
}
