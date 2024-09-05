import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentCriteria } from 'src/app/modules/common/criterias/appointment.criteria';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';

@Component({
  selector: 'app-appt-status-histories',
  templateUrl: './appt-status-histories.component.html',
  styleUrls: ['./appt-status-histories.component.css'],
  providers: [DatePipe]
})
export class ApptStatusHistoriesComponent implements OnInit {
  criteria: AppointmentCriteria = new AppointmentCriteria();
  serverLink = "/api/Appointment/SearchStatusHistories";
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;
  appointmentId: string;
  constructor(public authService: AuthenticationService,
    private datePipe: DatePipe,
    private activeRouter: ActivatedRoute,
    private dialog: CommonDialogService) {
    activeRouter.parent.params.subscribe(r => {
      this.criteria.ID = r['{id}'];
    });
  }

  ngOnInit(): void {
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

    this.criteria.CurrentPage = Math.ceil(this.criteria.CurrentPage / this.criteria.ItemPerPage);
    return this.criteria;
  }

  InitTable() {
    this.compRef = this;
    this.aaSorting = [[0, "desc"]];
    this.aoColumnDefs = [
      { "mData": "UpdatedAt", "aTargets": [0] },
      { "mData": "Status", "aTargets": [1] },
      { "mData": "UpdatedBy", "aTargets": [2] }]

    this.aoColumns = [
      {
        "sTitle": "Update At",
        "sClass": "",
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
          if (data && oObj) {
            if (data === 'Completed') {
              return '<span class="badge badge-success">' + data + '</span>';
            } else if (data === 'Requested') {
              return '<span class="badge badge-danger">' + data + '</span>';
            } else if (data === 'InSession') {
              return '<span class="badge badge-warning">' + data + '</span>';
            }
            else {
              var html = '<span class="badge badge-secondary">' + data + '</span>';
              return html;
            }
          }
          return "";
        }
      },
      {
        "sTitle": "Updated By",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          return data ?? '';
        }
      }
    ];
  }
}
