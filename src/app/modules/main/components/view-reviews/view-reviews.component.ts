import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/modules/base.component';
import { BaseCriteria } from 'src/app/modules/common/criterias/base.criteria';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';

@Component({
  selector: 'app-view-reviews',
  templateUrl: './view-reviews.component.html',
  styleUrls: ['./view-reviews.component.css'],
  providers: [DatePipe]
})
export class ViewReviewsComponent extends BaseComponent implements OnInit {
  criteria: BaseCriteria = new BaseCriteria();
  serverLink = "/api/Appointment/AppointmentViewReviews";
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;

  constructor(public authService: AuthenticationService,
    private datePipe: DatePipe,
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
      { "mData": "PatientName", "aTargets": [0] },
      { "mData": "AppointmentTime", "aTargets": [1] },
      { "mData": "ProviderName", "aTargets": [2] },
      { "mData": "Rating", "aTargets": [3] },
      { "mData": "Review", "aTargets": [4] }
    ]

    this.aoColumns = [
      {
        "sTitle": "Patient",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          if (data) {
            return '<img width="30px" height="30px" src="' + (oObj?.PatientAvatar ?? 'https://umedoc-prod.s3.amazonaws.com/RandomFiles/umedoc-defaultavatar.png') + '" alt="" class="rounded-circle"><strong>' + ' ' + oObj?.PatientName + '</strong>';
          }
          return '';
        }
      },
      {
        "sTitle": "Appointment Time",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          if (data) {
            return '<div class="text-bold-600" style="color:#016670;">' + this.datePipe.transform(data, 'MM/dd/yyyy hh:mm a') + '</div>';
          }
          return '';
        }
      },
      {
        "sTitle": "Provider",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          if (data) {
            return '<img width="30px" height="30px" src="' + (oObj?.ProviderAvater ?? '') + '" alt="" class="rounded-circle"><strong>' + ' ' + oObj?.ProviderName + '</strong>';
          }

          return '';
        }
      },
      {
        "sTitle": "Rating",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          if (data) {
            switch (data) {
              case 1:
                return '<span class="fa fa-star" style="color: orange"></span>';
              case 2:
                return '<span class="fa fa-star" style="color: orange"></span><span class="fa fa-star" style="color: orange"></span>';
              case 3:
                return '<span class="fa fa-star" style="color: orange"></span><span class="fa fa-star" style="color: orange"></span><span class="fa fa-star" style="color: orange"></span>';
              case 4:
                return '<span class="fa fa-star" style="color: orange"></span><span class="fa fa-star" style="color: orange"></span><span class="fa fa-star" style="color: orange"></span><span class="fa fa-star" style="color: orange"></span>';
              case 5:
                return '<span class="fa fa-star" style="color: orange"></span><span class="fa fa-star" style="color: orange"></span><span class="fa fa-star" style="color: orange"></span><span class="fa fa-star" style="color: orange"></span><span class="fa fa-star" style="color: orange"></span>';
            }
          }
          return '';
        }
      },
      {
        "sTitle": "Review",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          if (data) {
            return `<span class="info">${data}</span>`;
          }
          return '';
        }
      },
    ];
  }
}
