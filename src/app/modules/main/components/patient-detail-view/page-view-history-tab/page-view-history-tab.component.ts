import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/modules/base.component';
import { BaseCriteria } from 'src/app/modules/common/criterias/base.criteria';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';

@Component({
  selector: 'app-page-view-history-tab',
  templateUrl: './page-view-history-tab.component.html',
  styleUrls: ['./page-view-history-tab.component.css'],
  providers:[DatePipe]
})
export class PageViewHistoryTabComponent extends BaseComponent implements OnInit {
  criteria: BaseCriteria = new BaseCriteria();
  serverLink = "/api/PageViewHistory/Search";
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any; 
  constructor(public authService: AuthenticationService,
    private datePipe: DatePipe,
    private router:Router,
    private activeRouter:ActivatedRoute) {
    super(authService);
    
    activeRouter.parent.params.subscribe(r=>{
      if (r && r['{id}']) {
        this.criteria.CurrentUserID = r['{id}'];
      }
      else{
        this.router.navigate(['/']);
      }
    });
     
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
    this.aaSorting = [[2, "desc"]];
    this.aoColumnDefs = [
      { "mData": "PageName", "aTargets": [0] },
      { "mData": "PageUrl", "aTargets": [1] },
      { "mData": "AccessDate", "aTargets": [2] }]

    this.aoColumns = [
      {
        "sTitle": "Page Name", 
        "mRender": (data, type, oObj) => {
          return data;
        }
      },
      {
        "sTitle": "Page Url", 
        "mRender": (data, type, oObj) => {
          if (data) {
            return data;
          }
          return '';
        }
      },
      
      {
        "sTitle": "Date", 
        "mRender": (data, type, oObj) => {
          if (data) {
            return `${this.datePipe.transform(data, 'MM/dd/yyyy hh:mm a')}`
          }
          return '';
        }
      }
    ];
  }
}