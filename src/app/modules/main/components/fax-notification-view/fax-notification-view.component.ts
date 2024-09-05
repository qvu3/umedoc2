import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { AuthenticationService } from '../../../common/services/authentication.service';
import { DatePipe } from '@angular/common'; 
import { AppointmentDocumentService } from '../../../common/services/appointment-document.service';
import { BaseComponent } from '../../../base.component';
import { SRFaxNotificationCriteria } from 'src/app/modules/common/criterias/srfax-notification.criteria';
import { UtilityService } from 'src/app/modules/common/services/utility.service';
declare var $:any;
@Component({
  selector: 'app-fax-notification-view',
  templateUrl: './fax-notification-view.component.html',
  styleUrls: ['./fax-notification-view.component.css'],
  providers: [DatePipe]
})
export class FaxNotificationViewComponent extends BaseComponent implements OnInit, OnChanges {
  @Input() appointmentId: string;
  criteria: SRFaxNotificationCriteria = new SRFaxNotificationCriteria();
  serverLink = "/api/AppointmentDocument/SearchFaxNotification";
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;
  constructor(public authService: AuthenticationService,
    private datePipe: DatePipe,
    private utilityService:UtilityService,
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
    this.utilityService.refreshDocNotifyEvent.subscribe(r=>{
      this.RefreshTable();
    });

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

  RefreshItem(id) {
    if (id) {
      this.appointmentDocumentService.RefreshFaxNotification(id).subscribe(r => {
        this.RefreshTable();
      })
    }
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
    this.aaSorting = [[3, "desc"]];
    this.aoColumnDefs = [
      { "mData": "FileName", "aTargets": [0] },
      { "mData": "SendFrom", "aTargets": [1] },
      { "mData": "SendTo", "aTargets": [2] },
      { "mData": "SentDate", "aTargets": [3] },
      { "mData": "Status", "aTargets": [4] },
      { "mData": "ID", "aTargets": [5] }];

    this.aoColumns = [
      {
        "sTitle": "Document Name",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          if (oObj && oObj.AppointmentDocument) {
            return oObj.AppointmentDocument.FileName;
          }
          return '';
        }
      },
      {
        "sTitle": "Send From",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          if (oObj) {
            return oObj.SendFrom;
          }
          return '';
        }
      },
      {
        "sTitle": "Send To",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          if (oObj) {
            return oObj.SendTo;
          }
          return '';
        }
      },
      {
        "sTitle": "Sent Date",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          if (data) {
            return this.datePipe.transform(data, 'MM/dd/yyyy HH:mm');
          }
          return "";
        }
      },
      {
        "sTitle": "Status",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          if (oObj) {
            if (!oObj.IsSent) {
              return 'Failed';
            }
            else if (oObj.IsSent && oObj.SRFaxDetail) {
              return oObj.SRFaxDetail.SentStatus;
            }
            else {
              return 'In Progress';
            }
          }
          return '';
        }
      },
      {
        "sTitle": "Action",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          var action = '';
          action += "<button  type='button' style='margin-bottom:1px' class='btn btn-outline-info mr-1 btn-sm' title='Refresh Status' param='" + oObj.ID + "' method-name='RefreshItem'><i class='icon-refresh'></i></button> ";

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


}
