import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';  
import { AuthenticationService } from '../../../common/services/authentication.service';
import { BaseComponent } from '../../../base.component';
import { DatePipe } from '@angular/common';
import { AppointmentDocumentService } from '../../../common/services/appointment-document.service';
import { DocumentViewerComponent } from '../document-viewer/document-viewer.component';
import { FaxDocumentCompanyComponent } from '../fax-document-company/fax-document-company.component';
import { UtilityService } from '../../../common/services/utility.service';
import { AppointmentDocumentCriteria } from 'src/app/modules/common/criterias/appointment-document.criteria';
declare var $:any;
@Component({
  selector: 'app-appointment-document',
  templateUrl: './appointment-document.component.html',
  styleUrls: ['./appointment-document.component.css'],
  providers: [DatePipe]
})
export class AppointmentDocumentComponent extends BaseComponent implements OnInit, OnChanges {
  @Input() appointmentId: string;
  criteria: AppointmentDocumentCriteria = new AppointmentDocumentCriteria();
  serverLink = "/api/AppointmentDocument/Search";
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;
  @ViewChild('appDocView') appDocView: DocumentViewerComponent;
  @ViewChild('faxDoc') modal: FaxDocumentCompanyComponent;

  constructor(public authService: AuthenticationService,
    private utilityService: UtilityService,
    private datePipe: DatePipe,
    private appointmentDocumentService: AppointmentDocumentService) {
    super(authService);
    this.criteria.AppointmentID = this.appointmentId;

    
  }

  ngOnChanges(params: SimpleChanges) {
    if (params && params.appointmentId
      && params.appointmentId.currentValue
      && params.appointmentId.currentValue != params.appointmentId.previousValue) {
      this.criteria.AppointmentID = params.appointmentId.currentValue;
    }
  }

  ngOnInit() {
    this.utilityService.refreshEvent.subscribe(r=>{
      this.RefreshTable();
    });
    this.InitTable();
  }

  RefreshTable() {
    this.table.ajax.reload();
  }

  closeFax(event) {
    this.utilityService.needRefreshDocNotify();
  }

  DownloadItem(id) {
    this.appointmentDocumentService.Get(id).subscribe(obj => {
      this.appointmentDocumentService.Download(id).subscribe(r => {
        if (r) {
          this.saveAs(r, obj.FileName);
        }
      });
    });
  }

  onFilterColumn(event) {
    if (event) {

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

  faxDocument(id) {
    this.modal.documentId = id;
    this.modal.show();
  }

  InitTable() {
    this.compRef = this;
    this.aaSorting = [[1, "desc"]];
    this.aoColumnDefs = [
      { "mData": "FileName", "aTargets": [0] },
      { "mData": "CreatedOn", "aTargets": [1] },
      { "mData": "ID", "aTargets": [2] }];

    this.aoColumns = [
      {
        "sTitle": "Document Name",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          return data;
        }
      },
      {
        "sTitle": "Created On",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          if (data) {
            return this.datePipe.transform(data, 'MM/dd/yyyy hh:mm a');
          }
          return "";
        }
      },
      {
        "sTitle": "Actions",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          var action = '';

          action += "<button  type='button' style='margin-bottom:1px' class='btn btn-medical-white mr-1 btn-sm' title='View Document' param='" + oObj.ID + "' method-name='viewDocument'><i class='icon-eye'></i></button> ";
          action += "<button  type='button' style='margin-bottom:1px' class='btn btn-green mr-1 btn-sm' title='Download Document' param='" + oObj.ID + "' method-name='DownloadItem'><i class='icon-cloud-download'></i></button> ";
          action += "<button  type='button' style='margin-bottom:1px' class='btn btn-medical-white mr-1 btn-sm' title='Fax Document' param='" + oObj.ID + "' method-name='faxDocument'><i class='icon-printer'></i></button> ";
          return action;
        }
      }];
  }

  expandedClick() {
    if ($('#buttonCollapse').hasClass("icon-magnifier-add")) {
      $('#buttonCollapse').removeClass('icon-magnifier-add').addClass('icon-close');
    } else {
      $('#buttonCollapse').removeClass('icon-close').addClass('icon-magnifier-add');
    }
  }

  viewDocument(id) {
    this.appointmentDocumentService.Download(id).subscribe(r => {
      if (r) {
        var url = this.convertDataToURL(r); 
        window.open(url, '_blank', `width=1000,height=800,left=${(window.screen.width / 2) - 500},top=${(window.screen.height / 2) - 400}`);
      }
    });
  }
}
