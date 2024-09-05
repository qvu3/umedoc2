import { TicketModel } from './../../../common/models/ticket.model';
import { NewTicketModalComponent } from './../../../common/component/new-ticket-modal/new-ticket-modal.component';
import { TicketStatus, TicketPriority, TicketType } from './../../../common/constant/message.const';
import { CommonDialogService } from './../../../common/services/dialog.service';
import { TicketService } from './../../../common/services/ticket.service';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from './../../../common/services/authentication.service';
import { TicketCriteria } from './../../../common/criterias/ticket.criteria';
import { BaseComponent } from './../../../base.component';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PatientSubscriptionService } from 'src/app/modules/common/services/patient-subscription.service';

@Component({
  selector: 'app-patient-tickets',
  templateUrl: './patient-tickets.component.html',
  styleUrls: ['./patient-tickets.component.css'],
  providers: [DatePipe]
})
export class PatientTicketsComponent extends BaseComponent implements OnInit,
  AfterViewInit {
  @ViewChild('ticketModal') modal: NewTicketModalComponent;
  criteria: TicketCriteria = new TicketCriteria();
  serverLink = "/api/Ticket/PatientSearch";
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;
  isExistSubscriptionPlan: boolean = false;

  constructor(public authService: AuthenticationService,
    private datePipe: DatePipe,
    private patientSubscriptionService: PatientSubscriptionService,
    private ticketService: TicketService,
    private router: Router,
    private dialog: CommonDialogService) {
    super(authService);
  }


  ngOnInit() {
    this.checkExistsPlanInPatientUser();
    this.InitTable();
  }

  ngAfterViewInit() {

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
    this.aaSorting = [[4, "desc"]];
    this.aoColumnDefs = [
      { "mData": "PatientID", "aTargets": [0] },
      { "mData": "Status", "aTargets": [1] },
      { "mData": "Priority", "aTargets": [2] },
      { "mData": "Type", "aTargets": [3] },
      { "mData": "CreatedOn", "aTargets": [4] },
      { "mData": "ID", "aTargets": [5] }]

    this.aoColumns = [
      {
        "sTitle": "Patient",
        "sClass": "",
        "mRender": (data, type, oObj) => {

          var returnValue = '';
          if (oObj && oObj.Patient) {
            returnValue = '<img width="30px" height="30px" src="' + (oObj.Patient.ProfilePicture ?? 'https://umedoc-prod.s3.amazonaws.com/RandomFiles/umedoc-defaultavatar.png') + '" alt="" class="rounded-circle"><strong>' + ' ' + oObj.Patient.FirstName + ' ' + oObj.Patient.LastName + '</strong>';
          }

          return returnValue;
        }
      },
      {
        "sTitle": "Status",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          if (data) {
            switch (data) {
              case TicketStatus.Open:
                return '<span class="badge badge-warning">Open</span>';
              case TicketStatus.Closed:
                return '<span class="badge badge-success">Closed</span>';
              case TicketStatus.WaitingforPatientResponse:
                return '<span class="badge badge-danger">Waiting for Patient Response</span>';
              case TicketStatus.WaitingforUmedocResponse:
                return '<span class="badge badge-info">Waiting for Umedoc Response</span>';
            }
          }
          return '';
        }
      },
      {
        "sTitle": "Priority",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          if (data) {
            switch (data) {
              case TicketPriority.High:
                return 'High';
              case TicketPriority.Highest:
                return 'Highest';
              case TicketPriority.Low:
                return 'Low';
              case TicketPriority.Lowest:
                return 'Lowest';
              case TicketPriority.Medium:
                return 'Medium';
            }
          }
          return '';
        }
      },
      {
        "sTitle": "Type",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          if (data) {
            switch (data) {
              case TicketType.Billing:
                return 'Billing';
              case TicketType.MedicalQuestions:
                return 'Medical Questions';
              case TicketType.MedicineRefill:
                return 'Medicine Refill';
              case TicketType.FAQ:
                return 'FAQs';
            }
          }
          return '';
        }
      },
      {
        "sTitle": "Created Time",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          if (data) {
            return this.datePipe.transform(data, 'MM/dd/yyyy hh:mm a');
          }
          return ''
        }
      },
      {
        "sTitle": "Action",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          var action = "";
          action += "<a class='btn btn-medical-white btn-min-width' href='javascript:void(0);' title='View Appointment Details' style='margin-bottom:1px' param='" + oObj.ID + "' method-name='ViewItem'>View Details</a> ";
          return action;
        }
      }
    ];
  }

  ViewItem(id) {
    this.router.navigate(['/patient-ticket-detail', id]);
  }

  newTicket() {
     this.ticketService.Create(new TicketModel()).subscribe(r=>{
      this.router.navigate(['/patient-ticket-detail', r.ID]);
     }, error => { 
      this.dialog.showSwalErrorAlert('Error', error.error);
    });
  }

  checkExistsPlanInPatientUser() {
     this.patientSubscriptionService.CheckExistsPlanInPatientUser(this.currentUser.Id).subscribe(r => {
      if (r) {
        this.isExistSubscriptionPlan = r;
      }else{
        this.isExistSubscriptionPlan = false;
      }
    });
  }
}
