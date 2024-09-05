import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { GroupApptDocumentsCriteria } from 'src/app/modules/common/criterias/group-appt-documents.criteria';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { GroupApptDocumentsService } from 'src/app/modules/common/services/group-appt-documents.service';

@Component({
  selector: 'app-group-appt-documents',
  templateUrl: './group-appt-documents.component.html',
  styleUrls: ['./group-appt-documents.component.css']
})
export class GroupApptDocumentsComponent extends BaseComponent implements OnInit {
  @Input() groupApptID: string;
  criteria: GroupApptDocumentsCriteria = new GroupApptDocumentsCriteria();
  serverLink = "/api/GroupApptDocuments/Search";
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;
  isUploading: boolean = false;

  constructor(public authService: AuthenticationService,
    private service: GroupApptDocumentsService,
    private dialog: CommonDialogService) {
    super(authService);
  }

  ngOnInit() {
    this.criteria.GroupApptID = this.groupApptID;
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
      { "mData": "FileName", "aTargets": [0] },
      { "mData": "Id", "aTargets": [1] }]

    this.aoColumns = [
      {
        "sTitle": "File Name",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          if (data) {
            return data;
          }
          return '';
        }
      },
      {
        "sTitle": "Action",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          var action = "";
          action += "<a class='btn btn-info btn-sm btn-min-width' href='javascript:void(0);' title='View' style='margin-bottom:1px' param='" + oObj.ID + "' method-name='ViewItem'><i class='la la-desktop'></i> View File</a> ";
          action += "<a class='btn btn-green btn-sm btn-min-width' href='javascript:void(0);' title='Download' style='margin-bottom:1px' param='" + oObj.ID + "' method-name='DownloadItem'><i class='la la-download'></i> Download</a> ";
          action += "<a class='btn btn-danger btn-sm btn-min-width' href='javascript:void(0);' title='Delete' style='margin-bottom:1px' param='" + oObj.ID + "' method-name='DeleteItem'><i class='la la-remove'></i> Delete</a> "; return action;
        }
      }
    ];
  }

  ViewItem(id) {
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

  DownloadItem(id) {
    var filename = '';
    this.service.Download(id)
      .subscribe(r => {
        if (r) {
          var headers = r.headers;
          console.log(headers);
          var contentDisposition = headers.get('content-disposition');
          if (contentDisposition) {
            var filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim().replace(/"/g, '');
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

  DeleteItem(id) {
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


  uploadStatus(isCompleted) {
    this.isUploading = !isCompleted;
  }

  uploaded(event) {
    if (event != null) {
      this.RefreshTable();
    }
  }

}