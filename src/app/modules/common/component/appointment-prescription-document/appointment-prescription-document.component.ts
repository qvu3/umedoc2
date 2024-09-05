import { MessageConstant } from './../../constant/message.const';
import { CommonDialogService } from './../../services/dialog.service';
import { GeneratePrescriptionPdfModalComponent } from './../generate-prescription-pdf-modal/generate-prescription-pdf-modal.component';
import { DatePipe } from '@angular/common';
import { UtilityService } from './../../services/utility.service';
import { AuthenticationService } from './../../services/authentication.service';
import { AppointmentDocumentCriteria } from './../../criterias/appointment-document.criteria';
import { BaseComponent } from './../../../base.component';
import { Component, OnInit, OnChanges, Input, SimpleChanges, ViewChild } from '@angular/core';
import { AppointmentPrescriptionDocumentService } from '../../services/appointment-prescription-document.service';

@Component({
  selector: 'app-appointment-prescription-document',
  templateUrl: './appointment-prescription-document.component.html',
  styleUrls: ['./appointment-prescription-document.component.css'],
  providers:[DatePipe]
})
export class AppointmentPrescriptionDocumentComponent extends BaseComponent implements OnInit, OnChanges {
  @Input() appointmentId: string;
  @Input() patientId:string;
  criteria: AppointmentDocumentCriteria = new AppointmentDocumentCriteria();
  serverLink = "/api/ApptPrescriptionDocument/Search";
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;
  @ViewChild('gpdf') gpdfModal : GeneratePrescriptionPdfModalComponent;
  constructor(public authService: AuthenticationService,
    private utilityService: UtilityService,
    private dialog:CommonDialogService,
    private datePipe: DatePipe,
    private appointmentPrescriptionDocumentService: AppointmentPrescriptionDocumentService) {
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

  DownloadItem(id) {
    this.appointmentPrescriptionDocumentService.Get(id).subscribe(obj => {
      this.appointmentPrescriptionDocumentService.Download(id).subscribe(r => {
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
          action += "<button  type='button' style='margin-bottom:1px' class='btn btn-medical-white mr-1 btn-sm' title='Delete Document' param='" + oObj.ID + "' method-name='deleteDocument'><i class='icon-trash'></i></button> ";
          return action;
        }
      }];
  }

  generatePdf(){
    this.gpdfModal.show(this.patientId , this.appointmentId)
  }

  viewDocument(id) {
    this.appointmentPrescriptionDocumentService.Download(id).subscribe(r => {
      if (r) {
        var url = this.convertDataToURL(r);
        window.open(url, '_blank', `width=1000,height=800,left=${(window.screen.width / 2) - 500},top=${(window.screen.height / 2) - 400}`);
      }
    });
  }

  deleteDocument(id){
    if (id) {
      this.dialog.showSwalConfirmAlert('Are you sure you want to delete this document?').then(isConfirm => {
        if (isConfirm) {
          this.appointmentPrescriptionDocumentService.Delete(id).subscribe(r => {
            this.RefreshTable();
            this.dialog.showToastrSuccess('Delete Message', MessageConstant.DEL_SUCCESS_CONST);
          }, error => {
            this.dialog.showSwalErrorAlert('Delete Message', MessageConstant.FAILURE_REQUEST);
          });
        }
      })

    }
  }
}
