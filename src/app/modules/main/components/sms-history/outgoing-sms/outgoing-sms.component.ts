import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { SMSNotificationCriteria } from "src/app/modules/common/criterias/sms-notification.criteria";
import { ViewDeliverStatusModalComponent } from "./view-deliver-status-modal/view-deliver-status-modal.component";

@Component({
  selector: "app-outgoing-sms",
  templateUrl: "./outgoing-sms.component.html",
  styleUrls: ["./outgoing-sms.component.css"],
  providers: [DatePipe],
})
export class OutgoingSmsComponent implements OnInit {
  criteria: SMSNotificationCriteria = new SMSNotificationCriteria();
  serverLink = "/api/User/GetOutgoingSMS";
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;
  @ViewChild('deliverModal') deliverModal:ViewDeliverStatusModalComponent;

  constructor(private datePipe: DatePipe) {}

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
      aoData.forEach((element) => {
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

  viewHistory(sid) {
    this.deliverModal.show(sid);
  }

  InitTable() {
    this.compRef = this;
    this.aaSorting = [[2, "desc"]];
    this.aoColumnDefs = [
      { mData: "SendTo", aTargets: [0] },
      { mData: "Body", aTargets: [1] },
      { mData: "SentDate", aTargets: [2] },
      { mData: "LastAttemptErrorMessage", aTargets: [3] },
      { mData: "MessageSID", aTargets: [4] },
    ];

    this.aoColumns = [
      {
        sTitle: "Send To",
        sStyle: "width:30%",
        mRender: (data, type, oObj) => {
          if (data) {
            return data;
          }
          return "";
        },
      },
      {
        sTitle: "Message",
        mRender: (data, type, oObj) => {
          if (data) {
            return `<p style="display: flex;   flex-wrap: wrap;">${data}</p>`;
          }
          return "";
        },
      },
      {
        sTitle: "Sent Date",
        sClass: "text-center",
        mRender: (data, type, oObj) => {
          if (data) {
            return this.datePipe.transform(data, "MM/dd/yyyy hh:mm a");
          }
          return "";
        },
      },
      {
        sTitle: "Error",
        mRender: (data, type, oObj) => {
          if (data) {
            return `<p style="display: flex;   flex-wrap: wrap;">${data}</p>`;
          }
          return "";
        },
      },
      {
        sTitle: "",
        mRender: (data, type, oObj) => {
          var action = "";
          if (oObj.MessageSID) {
            action +=
              "<button  type='button' style='margin-bottom:1px' class='btn btn-outline-info mr-1 btn-sm' title='View Status' param='" +
              oObj.MessageSID +
              "' method-name='viewHistory'><i class='icon-eye'></i></button> ";
          }
          return action;
        },
      },
    ];
  }
}
