import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core'; 
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/modules/base.component';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { VaccineApptCriteria } from 'src/app/modules/common/criterias/vaccin-appt.criteria';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { RescheduleModalComponent } from 'src/app/modules/home/components/reschedule-modal/reschedule-modal.component';

@Component({
  selector: 'app-vaccine-appointment',
  templateUrl: './vaccine-appointment.component.html',
  styleUrls: ['./vaccine-appointment.component.css'],
  providers:[DatePipe]
})
export class VaccineAppointmentComponent extends BaseComponent implements OnInit {
  criteria: VaccineApptCriteria = new VaccineApptCriteria();
  serverLink = "/api/VaccineAppt/Search";
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any; 
  @ViewChild('rescheduleModal') rescheduleModal: RescheduleModalComponent;
  constructor(public authService: AuthenticationService,
    private datePipe: DatePipe, 
    private dialog:CommonDialogService,
    private router: Router,
    private appointmentService: AppointmentService) {
    super(authService); 
  }

  ngOnInit() { 
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
      { "mData": "Patient.FirstName", "aTargets": [0] },
      { "mData": "ApptTime", "aTargets": [1] },
      { "mData": "Patient.DOB", "aTargets": [2] },
      { "mData": "Patient.Email", "aTargets": [3] },
      { "mData": "Patient.CellPhone", "aTargets": [4] },
      { "mData": "CreatedOn", "aTargets": [5] },
      { "mData": "StatusID", "aTargets": [6] },
      { "mData": "ID", "aTargets": [7] }]

    this.aoColumns = [ 
      {
        "sTitle": "Patient",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          var patient = '';
          if (oObj) {
            if (oObj.IsFromMobileApp) {
              patient = '<img width="30px" height="30px" src="' + (oObj?.Patient.ProfilePicture ?? 'https://umedoc-prod.s3.amazonaws.com/RandomFiles/umedoc-defaultavatar.png') + '" alt="" class="rounded-circle"><strong>' + ' ' + oObj?.Patient.FirstName+ ' ' + oObj?.Patient.LastName + '</strong>' + '<span style="font-size:1.5em;margin-left:2px;margin-top:1px;" class="la la-mobile"></span>';
            } else {
              patient = '<img width="30px" height="30px" src="' + (oObj?.Patient.ProfilePicture ?? 'https://umedoc-prod.s3.amazonaws.com/RandomFiles/umedoc-defaultavatar.png') + '" alt="" class="rounded-circle"><strong>' + ' ' + oObj?.Patient.FirstName+ ' ' + oObj?.Patient.LastName+ '</strong>' + '<span style="font-size:1.5em;margin-left:2px;margin-top:1px;" class="la la-television"></span>';
            }
          } 
          

          return patient;
        }
      },
      {
        "sTitle": "Appointment Time",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => { 
            var requestTime = '<div class="text-bold-600" style="color:#016670;">' + this.datePipe.transform(data, 'MM/dd/yyyy hh:mm a') + '</div>';
             
          return requestTime;
        }
      },
      {
        "sTitle": "DOB",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          if (data) {
            return this.datePipe.transform(data, 'MM/dd/yyyy');
          }
          return '';
        }
      },
      
      {
        "sTitle": "Email",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          if (data) {
            return data;
          }
          return '';
        }
      }, 
      {
        "sTitle": "Phone",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          if (data) {
            return data;
          }
          return '';
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
        "sTitle": "Status",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          if (oObj && oObj.ApptStatus) {
            if (oObj.ApptStatus.StatusName === 'Requested') {
              return '<span class="badge badge-danger">' + oObj.ApptStatus.StatusName + '</span>';
            } else {
              return '<span class="badge" style="background-color: #ff9149">' + oObj.ApptStatus.StatusName + '</span>';
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
          /* action += "<a class='btn btn-green btn-min-width' href='javascript:void(0);' title='View Appointment Details' style='margin-bottom:1px' param='" + oObj.ID + "' method-name='ViewItem'>View Details</a> ";
          if (oObj.ApptStatus.StatusName === "Requested") {
            action += `<a href='javascript:void(0)' param="${oObj.ID}" method-name='reschedule' class='btn btn-warning btn-md btn-min-width'>Reschedule</a>`;
            action += `<a href='javascript:void(0)' param="${oObj.ID}" method-name='cancelAppt' class='btn btn-danger btn-md btn-min-width ml-1'>Cancel</a>`;
          } */
          action += `<div class="btn-group mr-1 mb-1">
          <button type="button" class="btn btn-medical-white dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Actions</button>
          <div class="dropdown-menu">`;
          action += "<button class='dropdown-item' type='button' title='View Appointment Details' param='" + oObj.ID + "' method-name='ViewItem'>View Details</button> ";
          if (oObj.ApptStatus.StatusName === "Requested") {
            action += `<button class='dropdown-item' type='button' param="${oObj.ID}" method-name='reschedule'>Reschedule</button>`;
            action += `<button class='dropdown-item' type='button' param="${oObj.ID}" method-name='cancelAppt'>Cancel</button>`;
          };
          action += `</div>
            </div>`;
          return action;
        }
      }
    ];
  }

  ViewItem(id) {
    this.router.navigate(['/management/vaccine-appt-detail',id]);
  }

  reschedule(id) {
    this.rescheduleModal.show(id);
  }

  cancelAppt(id)
  {
    this.dialog.showSwalConfirmAlert('Are you sure you want to cancel this appointment?').then(r=>{
      if(r){
        this.appointmentService.CancelledVaccineSchedulerAppointment(id).subscribe(res=>{
          this.dialog.showToastrSuccess('Cancel Vaccine Schedule Appointment', MessageConstant.REQUEST_SUCCESS_CONST);
          this.RefreshTable();
        },error=>{
          this.dialog.showSwalErrorAlert('Cancel Vaccine Schedule Appointment' , MessageConstant.FAILURE_REQUEST);
        });
      }
    });
  }
 
}

