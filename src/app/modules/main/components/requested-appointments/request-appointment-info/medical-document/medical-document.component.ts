import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Global from 'src/app/Global';
import { BaseComponent } from 'src/app/modules/base.component';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { PatientStorageCriteria } from 'src/app/modules/common/criterias/patient-storage.criteria';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { PatientStorageService } from 'src/app/modules/common/services/patient-storage.service';
import { ShareLinkModalComponent } from 'src/app/modules/home/components/patient-profile-new/patient-storage/share-link-modal/share-link-modal.component';
@Component({
  selector: 'app-medical-document',
  templateUrl: './medical-document.component.html',
  styleUrls: ['./medical-document.component.css'],
  providers: [DatePipe]
})
export class MedicalDocumentComponent extends BaseComponent
  implements OnInit {

  @ViewChild('shareLinkModal') shareLinkModal: ShareLinkModalComponent;

  criteria: PatientStorageCriteria = new PatientStorageCriteria();
  serverLink = "/api/PatientStorage/Search";
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;
  isUploading: boolean = false;
  @Input() patientId: string;
  constructor(
    public authService: AuthenticationService,
    private datePipe: DatePipe,
    private service: PatientStorageService,
    private router: Router,
    private dialog: CommonDialogService,
    activateRouter: ActivatedRoute
  ) {
    super(authService);
    authService.onReloadListPaymentHistory.subscribe(r => {
      this.RefreshTable();
    });
  }

  ngOnInit() {
    this.criteria.PatientID = this.patientId;
    this.criteria.CompanyID = Global.CompnayID;
    this.InitTable();
  }

  RefreshTable() {
    this.table.ajax.reload();
  }
  catchTable(event) {
    this.table = event;
  }

  uploadStatus(isCompleted) {
    this.isUploading = !isCompleted;
  }

  uploaded(event) {
    if (event != null) {
      this.RefreshTable();
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

    this.criteria.CurrentPage = Math.ceil(
      this.criteria.CurrentPage / this.criteria.ItemPerPage
    );
    return this.criteria;
  }

  shareDocumentUrl() {
    this.shareLinkModal.show(this.criteria.PatientID);
  }

  view(id) {
    this.service.View(id).subscribe(r => {
      if (r) {
        var redirectWindow = window.open(r, '_blank');
        redirectWindow.location;
      }
    },
      error => {
        this.dialog.showToastrError(
          'Error',
          MessageConstant.FAILURE_REQUEST
        );
      });
  }

  viewLink(linkUrl) {
    if (!linkUrl) return;
    var redirectWindow = window.open(linkUrl, '_blank');
    redirectWindow.location;
  }

  download(id) {
    var filename = '';
    this.service.Download(id)
      .subscribe(r => {
        if (r) {
          var headers = r.headers;
          console.log(headers);
          var contentDisposition = headers.get('content-disposition');
          if (contentDisposition) {
            var filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
            this.downloadBlod(r.body, filename);
          }
        }
      },
        error => {
          this.dialog.showToastrError(
            'Error',
            MessageConstant.FAILURE_REQUEST
          );
        })
  }

  delete(id) {
    if (!id) return;
    this.dialog.showSwalConfirmAlert("Are you sure you want to delete this item?").then((isConfirm => {
      if (isConfirm) {
        this.service.Delete(id).subscribe(
          r => {
            this.dialog.showToastrWarning('File has been deleted!');
            this.RefreshTable();
          },
          error => {
            this.dialog.showToastrError(
              'Error',
              MessageConstant.FAILURE_REQUEST
            );
          }
        );
      }
    }));
  }

  InitTable() {
    this.compRef = this;
    this.aaSorting = [[2, "desc"]];
    this.aoColumnDefs = [
      { mData: "FileName", aTargets: [0] },
      { mData: "UploadedOn", aTargets: [1] },
      { mData: "UploadedBy", aTargets: [2] },
      { mData: "ID", aTargets: [3] }
    ];

    this.aoColumns = [
      {
        sTitle: "File Name",
        sClass: "",
        mRender: (data, type, oObj) => {
          if (
            oObj &&
            oObj.FileName
          ) {
            return oObj.FileName
          }
          return "";
        }
      },
      {
        "sTitle": "Uploaded On",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          if (oObj && oObj.UploadedOn) {
            return this.datePipe.transform(data, 'MM/dd/yyyy hh:mm a');
          }
          return '';
        }
      },
      {
        sTitle: "Uploaded By",
        sClass: "",
        mRender: (data, type, oObj) => {
          if (oObj.Uploader) {
            return oObj.Uploader.FirstName + ' ' + oObj.Uploader.LastName;
          }
          return "";
        }
      },
      {
        sTitle: "Action",
        sClass: "text-center",
        mRender: (data, type, oObj) => {
          if (oObj) {
            var action = "";

            if (!oObj.IsLink) {
              action += `<a href='javascript:void(0)' param="${oObj.ID}" method-name='view' class='btn btn-green btn-sm btn-min-width mb-1'>View </a><br>`;
              action += `<a href='javascript:void(0)' param="${oObj.ID}" method-name='download' class='btn btn-medical-white btn-sm btn-min-width' style="margin:0;">Download</a><br>`;
            } else {
              action += `<a href='javascript:void(0)' param="${oObj.FireUrl}" method-name='viewLink' class='btn btn-green btn-sm btn-min-width mb-1'>View </a><br>`;
            }

            if (this.currentUser && (this.currentUser.Role != 'Patient' || this.currentUser.Id == oObj.UploadedBy)) {
              action += `<a href='javascript:void(0)' param="${oObj.ID}" method-name='delete' class='btn btn-danger btn-sm btn-min-width mt-1'>Detele</a><br>`;
            }
            return action;
          }
          return "";
        }
      },
    ];
  }
}
