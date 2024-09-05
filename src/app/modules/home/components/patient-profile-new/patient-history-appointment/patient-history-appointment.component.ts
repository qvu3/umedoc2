import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { AppointmentService } from "src/app/modules/common/services/appointment.service";
import { AuthenticationService } from "src/app/modules/common/services/authentication.service";
import { AppointmentCriteria } from "src/app/modules/common/criterias/appointment.criteria";
import { BaseComponent } from "src/app/modules/base.component";
import { DatePipe } from "@angular/common";
import { Router } from '@angular/router';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { RescheduleModalComponent } from 'src/app/modules/home/components/reschedule-modal/reschedule-modal.component';
import { PatientCancelAppointmentModalComponent } from "../../patient-cancel-appointment-modal/patient-cancel-appointment-modal.component";
import { AppointmentModel } from "src/app/modules/common/models/appointment.model";
import { GroupApptPatientService } from "src/app/modules/common/services/group-appt-patient.service";

@Component({
  selector: "app-patient-history-appointment-new",
  templateUrl: "./patient-history-appointment.component.html",
  styleUrls: ["./patient-history-appointment.component.css"],
  providers: [DatePipe]
})
export class PatientHistoryAppointmentNewComponent extends BaseComponent
  implements OnInit {
  @Input() appointmentID: string;
  criteria: AppointmentCriteria = new AppointmentCriteria();
  serverLink = "/api/Appointment/SearchHistoryAppointmentByCriteria";
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;
  @ViewChild('cancelReasonModal') cancelReasonModal: PatientCancelAppointmentModalComponent;
  @ViewChild('rescheduleModal') rescheduleModal: RescheduleModalComponent;

  totalAppt: number = 0;
  totalGroupAppt: number = 0;

  constructor(
    public authService: AuthenticationService,
    private datePipe: DatePipe,
    private appointmentService: AppointmentService,
    private router: Router,
    private dialog: CommonDialogService,
    private groupApptPatientService: GroupApptPatientService
  ) {
    super(authService);
     // get count data
     this.getNumberAppointmentOfPatient();
     this.getNumberGroupApptOfPatient();
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

  reschedule(id) {
    this.rescheduleModal.show(id);
  }

  cancelAppointment(id) {
    if (!id) return;
    this.dialog.showSwalConfirmAlert("Are you sure you want to cancel this appointment?").then((isConfirm => {
      if (isConfirm) {
        this.cancelReasonModal.show(id);
      }
    }));
  }


  cancelReasonCallback(event) {
    if (!event) return false;
    var appt = new AppointmentModel();
    appt.ID = event.id;
    appt.CancelReason = event.text;
    this.appointmentService.CancelledAppointmentWithReason(appt).subscribe(
      r => {
        this.dialog.showToastrWarning('Appointment has been cancelled!');
        this.RefreshTable();
      },
      error => {
        this.dialog.showSwalErrorAlert(
          'Error',
          MessageConstant.FAILURE_REQUEST
        );
      }
    );
  }

  InitTable() {
    this.compRef = this;
    this.aaSorting = [[2, "desc"]];
    this.aoColumnDefs = [
      { mData: "ProviderUserName", aTargets: [0], width: "20%" },
      { mData: "AppointmentTime", aTargets: [1], width: "20%" },
      { mData: "CreatedOn", aTargets: [2], width: "20%" },
      { mData: "PatientUser", aTargets: [3], width: "20%" },
      { mData: "AppointmentFollowUp", aTargets: [4], width: "20%" },
      { mData: "FirstName", aTargets: [5], width: "20%" },
      { mData: "ID", aTargets: [6], width: "20%" }
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
            return '<span class="badge badge-info">On Demand</span>';
          } else {
            return '<span class="badge bg-primary">' + this.datePipe.transform(data, 'MM/dd/yyyy hh:mm a') + '</span>';
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
        sTitle: "Patient",
        sClass: "",
        mRender: (data, type, oObj) => {
          if (data) {
            return `<strong>${data.FirstName} ${data.LastName}</strong>`;
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
                '<span class="badge" style="background-color: #ff9149">' +
                oObj.AppointmentStatus.StatusName +
                '</span>'
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
              var action = "";
              if (oObj.AppointmentStatus.StatusName === "Requested" || oObj.AppointmentStatus.StatusName === "InSession") {
                action += `<a href='javascript:void(0)' param="${oObj.ID}" method-name='gotoWatingRoom' class='btn btn-green btn-sm btn-min-width mb-1'>Join Visit </a>`;
                action += `<br><a href='javascript:void(0)' param="${oObj.ID}" method-name='cancelAppointment' class='btn btn-medical-white btn-sm btn-min-width' style="margin:0;">Cancel Appt</a>`;

              }
              if (oObj.AppointmentStatus.StatusName === "Requested" && !oObj.IsOnDemand) {
                action += `<br><a href='javascript:void(0)' param="${oObj.ID}" method-name='reschedule' class='btn btn-danger btn-sm btn-min-width mt-1'>Reschedule</a>`;
              }
              return action;
            }
          }
          return "";
        }
      },
    ];
  }

  getNumberAppointmentOfPatient() {
    if (this.currentUser) {
      this.appointmentService.GetNumberAppointmentOfPatient().subscribe(r => {
        this.totalAppt = r;
      })
    }
  }

  getNumberGroupApptOfPatient() {
    this.groupApptPatientService.GetNumberGroupApptOfPatient().subscribe(r => {
      this.totalGroupAppt = r;
    });
  }

}
