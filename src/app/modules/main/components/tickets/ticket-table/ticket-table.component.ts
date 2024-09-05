import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';

import { DatePipe } from '@angular/common';
import { TicketType } from './../../../../common/constant/message.const';
import { TicketStatus, TicketPriority } from 'src/app/modules/common/constant/message.const';
import { TicketCriteria } from './../../../../common/criterias/ticket.criteria';
import { Component, Input, OnChanges, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-table',
  templateUrl: './ticket-table.component.html',
  styleUrls: ['./ticket-table.component.css'],
  providers: [DatePipe]
})
export class TicketTableComponent implements OnInit, OnChanges {
  @Input() isClosed: boolean;
  @Input() patientName: string;
  @Input() priority: number;
  @Output() refreshFnc: EventEmitter<Function> = new EventEmitter();

  criteria: TicketCriteria = new TicketCriteria();
  serverLink = "/api/Ticket/Search";
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;

  constructor(private authService: AuthenticationService, private datePipe: DatePipe, private router: Router) { 
    this.authService.onReloadTicketTable.subscribe(r=>{
      if(this.RefreshTable){
        this.RefreshTable();
      }
    });
  }

  ngOnInit(): void {
    this.InitTable();
    this.criteria.IsClosed = this.isClosed;
    this.criteria.PatientName = this.patientName;
    this.criteria.Priority = this.priority;

    this.refreshFnc.emit(this.RefreshTable);
  }

  ngOnChanges(params: SimpleChanges) {
    if (params) {
      if (params.isClosed?.currentValue && params.isClosed?.currentValue != params.isClosed.previousValue) {
        this.criteria.IsClosed = params.isClosed.currentValue;
      }
      if (params.patientName?.currentValue && params.patientName?.currentValue != params.patientName.previousValue) {
        this.criteria.PatientName = params.patientName.currentValue;
      }
      if (params.priority?.currentValue && params.priority?.currentValue != params.priority.previousValue) {
        this.criteria.Priority = params.priority.currentValue;
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
    this.aaSorting = [[4, "desc"]];
    this.aoColumnDefs = [
      { "mData": "PatientID", "aTargets": [0] },
      { "mData": "Status", "aTargets": [1] },
      { "mData": "Priority", "aTargets": [2] },
      { "mData": "Type", "aTargets": [3] },
      { "mData": "LastMessage", "aTargets": [4] },
      { "mData": "UseChatBot", "aTargets": [5] },
      { "mData": "ID", "aTargets": [6] }]

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
        "sClass": "",
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
        "sTitle": "Last Messge",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          if (data) {
            return this.datePipe.transform(data, 'MM/dd/yyyy hh:mm a');
          }
          return ''
        }
      },
      {
        "sTitle": "Assign",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          if (data) {
            return 'ChatBot';
          }
          return 'Human'
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
    this.router.navigate(['/management/admin-ticket-detail', id]);
  }

}
