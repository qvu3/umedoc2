import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import UserCriteria from 'src/app/modules/common/criterias/user.criteria';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from 'src/app/modules/common/services/user.service';
import { RoleConstants } from 'src/app/Global';
import { ProviderProfileService } from 'src/app/modules/common/services/provider-profile.service';

@Component({
  selector: 'app-manage-staffs',
  templateUrl: './manage-staffs.component.html',
  styleUrls: ['./manage-staffs.component.css'],
  providers: [DatePipe]
})
export class ManageStaffsComponent extends BaseComponent implements OnInit {
  criteria: UserCriteria = new UserCriteria();
  serverLink = "/api/User/SearchStaff";
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;
  constructor(public authService: AuthenticationService,
    private datePipe: DatePipe,
    private providerProfileService: ProviderProfileService,
    private router: Router,
    private userService: UserService) {
    super(authService);
  }

  ngOnInit() {
    this.criteria.IsStaff = true;
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
    this.aaSorting = [[1, "desc"]];
    this.aoColumnDefs = [
      { "mData": "FirstName", "aTargets": [0] },
      { "mData": "Degree", "aTargets": [1] },
      { "mData": "Email", "aTargets": [2] },
      { "mData": "CellPhone", "aTargets": [3] },
      { "mData": "NumberOfLikes", "aTargets": [4] },
      { "mData": "Role", "aTargets": [5] },
      { "mData": "IsInactived", "aTargets": [6] },
      { "mData": "Availability", "aTargets": [7] },
      { "mData": "BackupAvailability", "aTargets": [8] },
      { "mData": "Id", "aTargets": [9] }]

    this.aoColumns = [
      {
        "sTitle": "Name",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          if (oObj) {
            return '<img width="30px" height="30px" *ngIf="oObj.ProfilePicture" src="' + oObj.ProfilePicture + '" alt="" class="rounded-circle"><strong>' + ' ' + oObj.FirstName + ' ' + oObj.LastName + '</strong>';
          }
          return '';
        }
      },
      {
        "sTitle": "Degree",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          if (data) {
            return data;
          }
          return '';
        }
      },
      {
        "sTitle": "Email",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          if (data) {
            return '<span class="text-info">' + data + '</span>';
          }
          return '';
        }
      },
      {
        "sTitle": "Cell Phone",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          if (data) {
            return data;
          }
          return '';
        }
      },
      {
        "sTitle": "Likes",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          if (data) {
            return '<div class="badge border-left-danger border-right-success round badge-striped" *ngIf="model.NumberOfAppointmentLike"><label><strong>' + data + '</strong></label><i class="font-medium-4 icon-line-height la la-thumbs-up ic"></i></div>';
          }
          return '';
        }
      },
      {
        "sTitle": "Role",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          if (data) {
            return data;
          }
          return '';
        }
      },
      {
        "sTitle": "Is Inactived",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          if (data) {
            return '<input class="icheckbox_flat-green checked" type="checkbox" name="IsInactived" checked="checked" disabled="disabled">';
          }
          return '<input class="icheckbox_flat-green checked" type="checkbox" name="IsInactived"  disabled="disabled">';
        }
      },
      {
        "sTitle": "Availability",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          var action = "";
          if (oObj && oObj.Role == RoleConstants.Provider) {
            if (data) {
              action += "<a  href='javascript:void(0);' title='Change Available' style='margin-bottom:1px' param='" + oObj.Id + "' method-name='changeAvailable'><div class='custom-control-inline custom-switch' style='position: relative;'><input type = 'checkbox' checked='checked' class='custom-control-input switch' name = 'IsAvailable' style = 'z-index: 2;top:5px;left:7px;font-size: 37px;' > <label class='custom-control-label' style = 'padding-top:5px;'> </label></div></a>";
            } else {
              action += "<a  href='javascript:void(0);' title='Change Available' style='margin-bottom:1px' param='" + oObj.Id + "' method-name='changeAvailable'><div class='custom-control-inline custom-switch' style='position: relative;'><input type = 'checkbox' class='custom-control-input switch' name = 'IsAvailable' style = 'z-index: 2;top:5px;left:7px;font-size: 37px;' > <label class='custom-control-label' style = 'padding-top:5px;'> </label></div></a>";
            }
          }

          return action;
        }
      },
      {
        "sTitle": "Backup Availability",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          var action = "";
          if (oObj && oObj.Role == RoleConstants.Provider) {
            if (data) {
              action += "<a  href='javascript:void(0);' title='Change Available' style='margin-bottom:1px' param='" + oObj.Id + "' method-name='changeBackupAvailable'><div class='custom-control-inline custom-switch' style='position: relative;'><input type = 'checkbox' checked='checked' class='custom-control-input switch' name = 'IsBackupAvailable' style = 'z-index: 2;top:5px;left:7px;font-size: 37px;' > <label class='custom-control-label' style = 'padding-top:5px;'> </label></div></a>";
            } else {
              action += "<a  href='javascript:void(0);' title='Change Available' style='margin-bottom:1px' param='" + oObj.Id + "' method-name='changeBackupAvailable'><div class='custom-control-inline custom-switch' style='position: relative;'><input type = 'checkbox' class='custom-control-input switch' name = 'IsBackupAvailable' style = 'z-index: 2;top:5px;left:7px;font-size: 37px;' > <label class='custom-control-label' style = 'padding-top:5px;'> </label></div></a>";
            }
          }

          return action;
        }
      },
      {
        "sTitle": "Action",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          var action = "";
          action += "<a class='btn btn-medical-white' href='javascript:void(0);' title='Edit Staff Profile' style='margin-bottom:1px' class='btn  btn-info btn-xs' param='" + oObj.Id + "' method-name='EditItem'><i class='la la-edit'></i></a> ";
          action += "<a class='btn btn-green' href='javascript:void(0);' title='Manage Appointment Slot' style='margin-bottom:1px' class='btn  btn-info btn-xs' param='" + oObj.Id + "' method-name='managementSlot'><i class='la la-list-alt'></i></a> ";          return action;
        }
      }
    ];
  }

  EditItem(id) {
    this.router.navigateByUrl(`/management/edit-staff-profile/${id}`);
  }

  managementSlot(id) {
    this.router.navigateByUrl(`/management/manage-appointment-slot/${id}`);
  }

  changeAvailable(id) {
    this.providerProfileService.UpdateProviderIsAvailable(id).subscribe(r => {
      if (r) {
        this.RefreshTable();
      }
    });
  }

  changeBackupAvailable(id) {
    this.providerProfileService.UpdateProviderIsBackup(id).subscribe(r => {
      if (r) {
        this.RefreshTable();
      }
    });
  }
}