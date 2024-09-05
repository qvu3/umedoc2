import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { BaseComponent } from 'src/app/modules/base.component';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import UserCriteria from 'src/app/modules/common/criterias/user.criteria';
import { RoleConstants } from 'src/app/Global';
import { CriteriaKey, MessageConstant } from 'src/app/modules/common/constant/message.const';
import RestrictedPatientLogModel from 'src/app/modules/common/models/restricted-patient-log.model';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { RestrictedPatientLogService } from 'src/app/modules/common/services/restricted-patient-log.service';
import { ResetPasswordComponent } from 'src/app/modules/common/component/reset-password/reset-password.component';
import { UserService } from 'src/app/modules/common/services/user.service';
import { AddPatientModalComponent } from './add-patient-modal/add-patient-modal.component';

@Component({
  selector: 'app-management-patients',
  templateUrl: './management-patients.component.html',
  styleUrls: ['./management-patients.component.css'],
  providers: [DatePipe]
})
export class ManagementPatientsComponent extends BaseComponent implements OnInit {
  criteria: UserCriteria = new UserCriteria();
  serverLink = "/api/User/Search";
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;
  @ViewChild('resetModal') resetModal: ResetPasswordComponent;
  @ViewChild('addPatient') addPatient:AddPatientModalComponent;
  constructor(public authService: AuthenticationService,
    private userService: UserService,
    private datePipe: DatePipe,
    private restrictedPatientLogService: RestrictedPatientLogService,
    private dialog: CommonDialogService,
    private router: Router) {
    super(authService);
  }

  ngOnInit() {
    this.criteria.Role = RoleConstants.Patient;
    this.InitTable();
  }

  onFilterColumn(event) {
    if (event) {

    }
  }

  AddPatient(){
    this.addPatient.show();
  }

  RefreshTable() {
    if (this.criteria && this.criteria.DOB && (this.criteria.DOB instanceof Date)) {
      this.criteria.DOB = this.datePipe.transform(this.criteria.DOB, "MM/dd/yyyy");
    }
    if (this.criteria.RefID) {
      var reg = new RegExp('^\\d+$');
      if (reg.test(this.criteria.RefID.toString())) {
        this.table.ajax.reload();
      }
    }
    else {
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
    this.aaSorting = [[6, "desc"]];
    this.aoColumnDefs = [
      { "mData": "FirstName", "aTargets": [0] },
      { "mData": "DOB", "aTargets": [1] },
      { "mData": "Email", "aTargets": [2] },
      { "mData": "CellPhone", "aTargets": [3] },
      { "mData": "Address1", "aTargets": [4] },
      { "mData": "LastIP", "aTargets": [5] },
      { "mData": "CreatedOn", "aTargets": [6] },
      { "mData": "Id", "aTargets": [7] }]

    this.aoColumns = [
      {
        "sTitle": "Patient",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          if (oObj) {
            var returnValue = "";
            if (oObj.IsInactived) {
              returnValue = '<img width="30px" height="30px" *ngIf="oObj.ProfilePicture" src="' + oObj.ProfilePicture + '" alt="" class="rounded-circle"><strong>' + ' ' + oObj.FirstName + ' ' + oObj.LastName + '</strong>' + "<span style='margin-left:3px;' class='badge badge-danger'>Suspended</span>";

            } else {
              returnValue = '<img width="30px" height="30px" *ngIf="oObj.ProfilePicture" src="' + oObj.ProfilePicture + '" alt="" class="rounded-circle"><strong>' + ' ' + oObj.FirstName + ' ' + oObj.LastName + '</strong>';
            }

            // Check register from web or mobile app
            if (oObj.FromMobileApp) {
              returnValue += '<span style="font-size:1.5em;margin-left:2px;margin-top:1px;" class="la la-mobile"></span>';
            } else {
              returnValue += '<span style="font-size:1.5em;margin-left:2px;margin-top:1px;" class="la la-television"></span>';
            }

            // Check restricted
            if (oObj.IsRestricted) {
              returnValue += '<span style="font-size:1.5em;margin-left:2px;margin-top:1px;" class="la la-unlock warning"></span>';
            }

            if (oObj.RefID && oObj.RefID > 0) {
              returnValue += `<br><label class='badge badge-success'>Ref ID: ${oObj.RefID}</label>`
            }

            if (oObj.TotalDuplicateName && oObj.TotalDuplicateName > 1) {
              returnValue += `<br><label class='badge badge-warning'>${oObj.TotalDuplicateName} duplicates</label>`
            }

            if (oObj.ParentUserID) {
              returnValue += `<br><label class='badge badge-success'>Child</label>`
            }

            if (oObj && oObj.BlockedType) {
               returnValue += "<br/><span class='text-danger'>" + oObj.BlockedType + " " + " List</span>";
            }

            if(oObj && oObj.IsActiveSubcription){
              returnValue += `<br><label class='badge badge-danger'>Umecare</label>`
            }

            if(oObj && oObj.PartnerName){
              returnValue += "<br/><span class='badge badge-info'>" + oObj.PartnerName + "</span>";
            }

            return returnValue;

          }
          return '';
        }
      },
      {
        "sTitle": "DOB",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          if (data) {
            var str = this.datePipe.transform(data, 'MM/dd/yyyy');
            var yearsOld = this.calculateAge(new Date(str));
            str += `<br><span>${yearsOld == 0 ? 1 : yearsOld} y/o</span>`;
            return str;
          }
          return '';
        }
      },
      {
        "sTitle": "Email",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          if (data && !oObj.ParentUserID) {
            return "<span class='text-info'>" + data + "</span>";
          }
          return '';
        }
      },
      {
        "sTitle": "Cell Phone",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          if (data) {
            var str = data;
            if (oObj && oObj.TotalDuplicatePhone > 1) {
              str += `<br><label class='badge badge-warning'>${oObj.TotalDuplicatePhone} duplicates</label>`;
            }
            return str;
          }
          return '';
        }
      },
      {
        "sTitle": "Address",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          if (oObj && oObj.Address1) {
            return oObj.Address1 + ' ' + oObj.Address2 + '<br/>' + oObj.City + ' ' + oObj.State + ' ' + oObj.ZipCode;
          }
          return '';
        }
      },
      {
        "sTitle": "Last IP",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          if (data) {
            var str = data;
            if (oObj && oObj.TotalDuplicateIP > 1) {
              str += `<br><label class='badge badge-warning'>${oObj.TotalDuplicateIP} duplicates</label>`;
            }
            return str;
          }
          return '';
        }
      },
      {
        "sTitle": "Signed Up On",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          if (data) {
            var signUpOn = this.datePipe.transform(data, 'MM/dd/yyyy HH:mm');;
            if(oObj.DiscoverFrom){
              signUpOn += `<br><label class='badge badge-primary'>${oObj.DiscoverFrom}</label>`;
            }
            return signUpOn;
          }

          return '';
        }
      },
      {
        "sTitle": "Action",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          var action = `
          <div class="btn-group mr-1 mb-1">
          <button type="button" class="btn btn-medical-white dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
          Actions
          </button>
          <div class="dropdown-menu">
            <button class="dropdown-item" type="button" param='${oObj.Id + "|" + oObj.IsRestricted + "|" + oObj.Id}' method-name='ViewItem'>View Details</button>
            <button class="dropdown-item" type="button" param='${oObj.Id}' method-name='ResetPassword'>Reset Password</button>
            <button class="dropdown-item" type="button" param='${oObj.Id}' method-name='ResetLoginAttempts'>Reset Login Failed Attempts</button>
          </div>
        </div>
          `;
          return action;
        }
      }
    ];
  }

  ResetPassword(id) {
    this.resetModal.show(id);
  }

  ResetLoginAttempts(id) {
    this.userService.ResetLoginAttemptUser({ Id: id })
    .subscribe(result => {
      if (result) {
        this.dialog.showSwalSuccesAlert('Reset Login Attempts', MessageConstant.REQUEST_SUCCESS_CONST);
        this.RefreshTable();
      }
      else {
        this.dialog.showSwalErrorAlert('Reset Login Attemptsd', MessageConstant.FAILURE_REQUEST);
      }
    }, error => {
      this.dialog.showSwalErrorAlert('Error', error.error);
    });
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
              this.router.navigateByUrl(`/management/patient-detail-view/${id}?active=Patient-Info`);
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
      this.router.navigateByUrl(`/management/patient-detail-view/${id}?active=Patient-Info`);
    }
  }
}