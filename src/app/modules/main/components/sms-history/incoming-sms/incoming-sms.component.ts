import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BaseCriteria } from 'src/app/modules/common/criterias/base.criteria';

@Component({
  selector: 'app-incoming-sms',
  templateUrl: './incoming-sms.component.html',
  styleUrls: ['./incoming-sms.component.css'],
  providers: [DatePipe]
})
export class IncomingSmsComponent implements OnInit {
  criteria: BaseCriteria = new BaseCriteria();
  serverLink = "/api/User/GetIncomingSMS";
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;
  constructor(private datePipe: DatePipe) { }

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
    this.aaSorting = [[2, "desc"]];
    this.aoColumnDefs = [
      { "mData": "SendFrom", "aTargets": [0], },
      { "mData": "Body", "aTargets": [1] },
      { "mData": "SentDate", "aTargets": [2] }]

    this.aoColumns = [
      {
        "sTitle": "Send From", 
        "sStyle":"width:30%",
        "mRender": (data, type, oObj) => {
          if (data) {
            return data;
          }
          return '';
        }
      },
      {
        "sTitle": "Message", 
        "sClass":"col-lg-5",
        "mRender": (data, type, oObj) => {
          if (data) {
            return `<p style="display: flex;   flex-wrap: wrap;">${data}</p>`;
          }
          return "";
        }
      },
      {
        "sTitle": "Received Date",
        "sClass": "col-lg-4 text-center",
        "mRender": (data, type, oObj) => {
          if (data) {
            return this.datePipe.transform(data, 'MM/dd/yyyy hh:mm a');
          }
          return "";
        }
      }
    ];
  }
}

