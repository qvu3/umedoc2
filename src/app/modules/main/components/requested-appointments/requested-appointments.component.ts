import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { AppointmentCriteria } from 'src/app/modules/common/criterias/appointment.criteria';
import { BaseComponent } from 'src/app/modules/base.component';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ProviderProfileModel } from 'src/app/modules/common/models/provider-profile.model';
import { ProviderProfileService } from 'src/app/modules/common/services/provider-profile.service';

@Component({
  selector: 'app-requested-appointments',
  templateUrl: './requested-appointments.component.html',
  styleUrls: ['./requested-appointments.component.css'],
  providers: [DatePipe]
})
export class RequestedAppointmentsComponent extends BaseComponent implements OnInit {
  criteria: AppointmentCriteria = new AppointmentCriteria();
  serverLink = "/api/Appointment/SearchRequest";
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;
  provides_List: Array<ProviderProfileModel> = new Array<ProviderProfileModel>();

  constructor(public authService: AuthenticationService,
    private datePipe: DatePipe,
    private providerProfileService: ProviderProfileService,
    private router: Router,
    private appointmentService: AppointmentService) {
    super(authService);
    this.getAllProvidersByCompany();
  }

  ngOnInit() {
    if (this.currentUser && this.currentUser.Role && this.currentUser.Role == 'Provider') {
      this.criteria.ProviderID = this.currentUser.Id;
    } else {
      this.criteria.ProviderID = "All";
    }

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
    this.aaSorting = [[0, "asc"]];
    this.aoColumnDefs = [
      { "mData": "GroupName", "aTargets": [0], 'visible': false },
      { "mData": "PatientName", "aTargets": [1] },
      { "mData": "AppointmentTime", "aTargets": [2] },
      { "mData": "CreatedOn", "aTargets": [3] },
      { "mData": "GenerateReasonAssignment", "aTargets": [4] },
      { "mData": "ProviderName", "aTargets": [5] },
      { "mData": "StatusName", "aTargets": [6] },
      { "mData": "ID", "aTargets": [7] }]

    this.aoColumns = [
      {
        "sTitle": "GroupName",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          if (data) {
            return data;
          }
          return '';
        }
      },
      {
        "sTitle": "Patient",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          var patient = '';
          if (oObj && oObj.PatientProfilePicture) {
            if (oObj.IsFromMobileApp) {
              patient = '<img width="30px" height="30px" src="' + (oObj?.PatientProfilePicture ?? '') + '" alt="" class="rounded-circle"><strong>' + ' ' + oObj?.PatientName + '</strong>' + '<span style="font-size:1.5em;margin-left:2px;margin-top:1px;" class="la la-mobile"></span>';
            } else {
              patient = '<img width="30px" height="30px" src="' + (oObj?.PatientProfilePicture ?? '') + '" alt="" class="rounded-circle"><strong>' + ' ' + oObj?.PatientName + '</strong>' + '<span style="font-size:1.5em;margin-left:2px;margin-top:1px;" class="la la-television"></span>';
            }
          }
          else if (oObj && !oObj.PatientProfilePicture) {
            if (oObj.IsFromMobileApp) {
              patient = '<img width="30px" height="30px" src="https://umedoc-prod.s3.amazonaws.com/RandomFiles/umedoc-defaultavatar.png" alt="" class="rounded-circle"><strong>' + ' ' + oObj?.PatientName + '</strong>' + '<span style="font-size:1.5em;margin-left:2px;margin-top:1px;" class="la la-mobile"></span>';
            }
            else {
              patient = '<img width="30px" height="30px" src="https://umedoc-prod.s3.amazonaws.com/RandomFiles/umedoc-defaultavatar.png" alt="" class="rounded-circle"><strong>' + ' ' + oObj?.PatientName + '</strong>' + '<span style="font-size:1.5em;margin-left:2px;margin-top:1px;" class="la la-television"></span>';
            }
          }

          if (patient && oObj.IsNewPatient) {
            patient += " <span class='badge badge-danger'>New</span>";
          }

          if (patient && oObj.IsInactiveUser) {
            patient += " <p class='text-center' style='color:red'>Suspended</p>";
          }

          if (oObj && oObj.BlockedType) {
            patient += "<br/><span class='badge badge-danger'>" + oObj.BlockedType + " " + " List</span>";
          }

          if (oObj && oObj.MatchedPatient) {
            patient += "<br/><span class='badge badge-warning'>" + oObj.MatchedPatient + "</span>";
          }

          if(oObj && oObj.PartnerName){
            patient += "<br/><span class='badge badge-info'>" + oObj.PartnerName + "</span>";
          }

          return patient;
        }
      },
      {
        "sTitle": "Appointment Time",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          if (oObj && !oObj.IsOnDemand) {
            var requestTime = '<div class="text-bold-600" style="color:#016670;">' + this.datePipe.transform(data, 'MM/dd/yyyy hh:mm a') + '</div>';
            if (oObj.DateInfo && oObj.DateInfo == 'Today') {
              requestTime += " <div class='badge badge-danger'>" + oObj.DateInfo + "</div>";
            }
            if (oObj.DateInfo && oObj.DateInfo == 'Future') {
              requestTime += " <div class='badge badge-success'>" + oObj.DateInfo + "</div>";
            }
            //requestTime += " <p class='text-center' style='color:red'>" + oObj.DateInfo + "</p>";
            return requestTime;
          }
          if (oObj && oObj.IsOnDemand) {
            return '<span class="info text-bold-600">ON DEMAND</span>';
          }

          return "";
        }
      },
      {
        "sTitle": "Requested At",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          if (data) {
            return this.datePipe.transform(data, 'MM/dd/yyyy hh:mm a');
          }
          return '';
        }
      },
      {
        "sTitle": "Reasons",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          return `<span class="info">${oObj?.ApptCategoryName ?? ""} </span><p class="text-bold-600 text-primary">${data ?? ""} </p>`;
        }
      },
      {
        "sTitle": "Provider",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          if (oObj && oObj.ProviderName) {
            return '<img width="30px" height="30px" *ngIf="oObj.ProviderProfilePicture" src="' + oObj.ProviderProfilePicture +
              '" alt="" class="rounded-circle"><strong>' + ' ' + oObj.ProviderName + '</strong>';
          }
          return '';
        }
      },

      {
        "sTitle": "Status",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          if (oObj && oObj.StatusName) {
            if (oObj.StatusName === 'Requested') {
              return '<span class="badge badge-danger">' + oObj.StatusName + '</span>';
            } else {
              return '<span class="badge" style="background-color: #ff9149">' + oObj.StatusName + '</span>';
            }

          }
          return "";
        }
      },
      {
        "sTitle": "Actions",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          var action = "";
          action += "<a class='btn btn-green btn-min-width' href='javascript:void(0);' title='View Appointment Details' style='margin-bottom:1px' param='" + oObj.ID + "' method-name='ViewItem'>View Details</a> ";
          return action;
        }
      }
    ];
  }

  ViewItem(id) {
    this.router.navigateByUrl(`/management/requested-appointment-details/${id}`);
  }

  getAllProvidersByCompany() {
    this.providerProfileService.GetAllProvidersByCompanyID().subscribe(r => {
      if (r) {
        this.provides_List = r;

        if (this.currentUser && this.currentUser.Role) {
          if (this.currentUser.Role == 'Provider') {
            var item = this.provides_List.find(x => x.ProviderID === this.currentUser.Id);
            if (item) {
              this.criteria.Provider = item.ProviderID;
            } else {
              this.criteria.Provider = "All";
            }
          } else {
            this.criteria.Provider = "All";
          }
        }
      }
    });
  }
}

