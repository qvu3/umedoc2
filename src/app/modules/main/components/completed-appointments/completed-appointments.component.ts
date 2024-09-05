import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { AppointmentCriteria } from 'src/app/modules/common/criterias/appointment.criteria';
import { BaseComponent } from 'src/app/modules/base.component';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { ProviderProfileService } from 'src/app/modules/common/services/provider-profile.service';
import { ProviderProfileModel } from 'src/app/modules/common/models/provider-profile.model';
import { CriteriaKey, MessageConstant } from 'src/app/modules/common/constant/message.const';
import { Router } from '@angular/router';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { RestrictedPatientLogService } from 'src/app/modules/common/services/restricted-patient-log.service';
import RestrictedPatientLogModel from 'src/app/modules/common/models/restricted-patient-log.model';

@Component({
  selector: 'app-completed-appointments',
  templateUrl: './completed-appointments.component.html',
  styleUrls: ['./completed-appointments.component.css'],
  providers: [DatePipe, CurrencyPipe]
})
export class CompletedAppointmentsComponent extends BaseComponent implements OnInit,
  AfterViewInit {
  criteria: AppointmentCriteria = new AppointmentCriteria();
  serverLink = "/api/Appointment/SearchCompletedAppointment";
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;
  isCacheCriteria: boolean = false;
  provides_List: Array<ProviderProfileModel> = new Array<ProviderProfileModel>();
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode == 116) {
      this.saveCriteria(CriteriaKey.completedCriteria, "");
    }
  }

  constructor(public authService: AuthenticationService,
    private datePipe: DatePipe,
    private providerProfileService: ProviderProfileService,
    private router: Router,
    private dialog: CommonDialogService,
    private restrictedPatientLogService: RestrictedPatientLogService,
    private currencyPipe: CurrencyPipe) {
    super(authService);
    this.getAllProvidersByCompany();
  }


  ngOnInit() {
    if (this.authService.browserRefresh) {
      this.saveCriteria(CriteriaKey.completedCriteria, "");
      this.authService.browserRefresh = false;
    }
    // Appointment Status are Completed or Cancelled
    this.criteria.AppointmentType = 1;
    this.criteria.AppointmentGroup = "All";
    if (this.currentUser && this.currentUser.Role && this.currentUser.Role == 'Provider') {
      this.criteria.Provider = this.currentUser.Id;
    } else {
      this.criteria.Provider = "";
    }
    var cacheCriteria = this.getCriteria(CriteriaKey.completedCriteria);
    if (cacheCriteria) {
      this.criteria = cacheCriteria;
      this.isCacheCriteria = true;
    }
    this.InitTable();
  }

  ngAfterViewInit() {

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

  completedSearch(event) {
    if (this.isCacheCriteria) {
      setTimeout(() => {
        this.table.page(this.criteria.CurrentPage).draw(false);
      }, 200);
    }
    this.isCacheCriteria = false;
  }

  onFilterColumn(event) {
    if (event) {

    }
  }

  RefreshTable() {
    this.saveCriteria(CriteriaKey.completedCriteria, this.criteria);
    this.table.ajax.reload();
  }

  catchTable(event) {
    this.table = event;
  }

  SetCriteria(aoData: any) {
    if (aoData && !this.isCacheCriteria) {
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
    this.aaSorting = [[2, "desc"]];
    this.aoColumnDefs = [
      { "mData": "PatientName", "aTargets": [0] },
      { "mData": "AppointmentTime", "aTargets": [1] },
      { "mData": "LastUpdatedTime", "aTargets": [2] },
      { "mData": "GenerateReasonAssignment", "aTargets": [3] },
      { "mData": "ProviderName", "aTargets": [4] },
      { "mData": "SelfPay", "aTargets": [5] },
      { "mData": "StatusName", "aTargets": [6] },
      { "mData": "ID", "aTargets": [7] }]

    this.aoColumns = [
      {
        "sTitle": "Patient",
        "sClass": "",
        "mRender": (data, type, oObj) => {

          var returnValue = '';
          if (oObj && oObj.PatientProfilePicture) {
            if (oObj.IsFromMobileApp) {
              returnValue = '<img width="30px" height="30px" src="' + oObj.PatientProfilePicture + '" alt="" class="rounded-circle"><strong>' + ' ' + oObj.PatientName + '</strong>' + '<span style="font-size:1.5em;margin-left:2px;margin-top:1px;" class="la la-mobile"></span>';
            } else {
              returnValue = '<img width="30px" height="30px" src="' + oObj.PatientProfilePicture + '" alt="" class="rounded-circle"><strong>' + ' ' + oObj.PatientName + '</strong>' + '<span style="font-size:1.5em;margin-left:2px;margin-top:1px;" class="la la-television"></span>';
            }
          }
          else if (oObj && !oObj.PatientProfilePicture) {
            if (oObj.IsFromMobileApp) {
              returnValue = '<img width="30px" height="30px" src="https://umedoc-prod.s3.amazonaws.com/RandomFiles/umedoc-defaultavatar.png" alt="" class="rounded-circle"><strong>' + ' ' + oObj.PatientName + '</strong>' + '<span style="font-size:1.5em;margin-left:2px;margin-top:1px;" class="la la-mobile"></span>';
            } else {
              returnValue = '<img width="30px" height="30px" src="https://umedoc-prod.s3.amazonaws.com/RandomFiles/umedoc-defaultavatar.png" alt="" class="rounded-circle"><strong>' + ' ' + oObj.PatientName + '</strong>' + '<span style="font-size:1.5em;margin-left:2px;margin-top:1px;" class="la la-television"></span>';
            }
          }

          // Check restricted
          if (oObj.IsRestricted) {
            returnValue += '<span style="font-size:1.5em;margin-left:2px;margin-top:1px;" class="la la-unlock warning"></span>';
          }

          if (oObj.IsInactiveUser) {
            returnValue += " <p class='text-center' style='color:red'>Suspended</p>";
          }

          if (oObj.BlockedType) {
            returnValue += "<br/><span class='text-danger'>" + oObj.BlockedType + " " + " List</span>";
          }
          if (oObj.PartnerName) {
            returnValue += "<br/><span class='badge badge-info'>" + oObj.PartnerName + " " + "</span>";
          }


          return returnValue;
        }
      },
      {
        "sTitle": "Appointment Time",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          if (oObj) {
            if (oObj.IsOnDemand) {
              return this.datePipe.transform(data, 'MM/dd/yyyy hh:mm a') + "<br/>" + "<span class='info'>On Demand</span>";
            } else {
              return this.datePipe.transform(data, 'MM/dd/yyyy hh:mm a') + "<br/>" + "<span class='success'>Scheduled</span>";
            }
          }
          return '';
        }
      },
      {
        "sTitle": "Last Updated Time",
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
          return `<span class="info">${oObj?.ApptCategoryName ?? ''} </span><p class="text-bold-600 text-primary">${data ?? ''} </p>`;
        }
      },
      {
        "sTitle": "Provider",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          if (oObj && oObj.ProviderProfilePicture) {
            return '<img width="30px" height="30px" *ngIf="oObj.ProviderProfilePicture" src="' + oObj.ProviderProfilePicture +
              '" alt="" class="rounded-circle"><strong>' + ' ' + oObj.ProviderName + '</strong>';
          }
          return '';
        }
      },
      {
        "sTitle": "Patient Paid",
        "sClass": "text-right",
        "mRender": (data, type, oObj) => {
          if (oObj?.PaidByInsurance) {
            return `<span class="info text-right">Paid w Ins ${oObj.PayByCrypto ? '(Crypto)' : ''}</span><p class="text-right">${this.currencyPipe.transform(data)} </p>`;
          } else {
            return `<span class="warning text-right">Paid w/o Ins ${oObj.PayByCrypto ? '(Crypto)' : ''}</span><p class="text-right">${this.currencyPipe.transform(data)} </p>`;
          }
        }
      },

      {
        "sTitle": "Status",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          if (data && oObj) {
            var html = '';
            if (data === 'Completed') {
              html = `<span class="badge badge-success">${data}</span>`;

              if (oObj.IsMissingNote) {
                html += `<p style="max-width:200px;color:red;">Note Missing</p>`;
              }
              if (oObj.ICDCodes) {
                html += `<br/><span style="max-width:200px;"><strong>ICDCodes:</strong> ${oObj.ICDCodes}</span>`;
              }

              if (oObj.CPTCode) {
                html += `<br/><span style="max-width:200px;"><strong>CPTCode:</strong> ${oObj.CPTCode}</span>`;
              }

              if (oObj.Modifier) {
                html += `<br/><span style="max-width:200px;"><strong>Modifier:</strong> ${oObj.Modifier}</span>`;
              }

              if (oObj.PlaceOfService) {
                html += `<br/><span style="max-width:200px;"><strong>PlaceOfService:</strong> ${oObj.PlaceOfService}</span>`;
              }

              if (oObj.TimeInMinutes) {
                html += `<br/><span style="max-width:200px;"><strong>TimeInMinutes:</strong> ${oObj.TimeInMinutes}</span>`;
              }
            } else {
              html = '<span class="badge badge-secondary">' + data + '</span>';
              if (oObj.IsNoShow) {
                html += `<br><span class="badge badge-warning">No Show</span>`;
              }
              if (oObj.CancelReason) {
                html += `<p style="max-width:200px;">${oObj.CancelReason}</p>`;
              }

            }

            return html;
          }
          return "";
        }
      },
      {
        "sTitle": "Action",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          var action = "";
          action += "<a class='btn btn-medical-white btn-min-width' href='javascript:void(0);' title='View Appointment Details' style='margin-bottom:1px' param='" + oObj.ID + "|" + oObj.IsRestricted + "|" + oObj.PatientID + "' method-name='ViewItem'>View Details</a> ";
          return action;
        }
      }
    ];
  }

  ViewItem(inputParam) {
    var params = inputParam.split("|");
    var id = params[0];
    var isRestricted = params[1];
    var patientId = params[2];
    if (isRestricted && isRestricted === 'true') {
      this.dialog.showSwalConfirmChangeRestrict("You are entering a protected and restricted chart. Any unauthorized access of chart may result in penalties and disciplinary action.").then((isConfirm => {
        if (isConfirm) {
          var restrict = new RestrictedPatientLogModel();
          restrict.ProviderID = this.currentUser.Id;
          restrict.PatientID = patientId;
          this.restrictedPatientLogService.Create(restrict).subscribe(r => {
            if (r) {
              this.saveCriteria(CriteriaKey.completedCriteria, this.criteria);
              this.router.navigateByUrl(`/management/completed-appointment-details/${id}?activeTab=Appointment-Info`);
            } else {
              this.dialog.showSwalErrorAlert('Restrict Patient', MessageConstant.FAILURE_REQUEST);
            }
          },
            error => {
              this.dialog.showSwalErrorAlert('Restrict Patient', error.error);
            });

        }
      }));
    } else {
      this.saveCriteria(CriteriaKey.completedCriteria, this.criteria);
      this.router.navigateByUrl(`/management/completed-appointment-details/${id}?activeTab=Appointment-Info`);
    }
  }
}