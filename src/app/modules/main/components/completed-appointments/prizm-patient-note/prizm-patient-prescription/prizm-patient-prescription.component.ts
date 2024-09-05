import { PrizmSendPrescriptionModalComponent } from './../prizm-send-prescription-modal/prizm-send-prescription-modal.component';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { AppointmentCriteria } from 'src/app/modules/common/criterias/appointment.criteria';
import { BaseComponent } from 'src/app/modules/base.component';
import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-prizm-patient-prescription',
  templateUrl: './prizm-patient-prescription.component.html',
  styleUrls: ['./prizm-patient-prescription.component.css'],
  providers: [DatePipe]
})
export class PrizmPatientPrescriptionComponent extends BaseComponent implements OnInit,
  AfterViewInit {
  criteria: AppointmentCriteria = new AppointmentCriteria();
  serverLink = "/api/Appointment/SearchPrizmPatientPrescriptions";
  aoColumnDefs: any;
  aaSorting: any;
  compRef: any;
  aoColumns;
  table: any;
  @ViewChild('modal') modal: PrizmSendPrescriptionModalComponent;
  @Input() appointmentId: string;
  @Input() patientId: string;
  constructor(public authService: AuthenticationService,
    private datePipe: DatePipe,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private appointmentService: AppointmentService,
    private dialog: CommonDialogService,) {
    super(authService);
  }

  getEntity() {
    if (this.criteria.ID) {
      this.appointmentService.GetById(this.criteria.ID).subscribe(r => {
        this.criteria.PatientID = r.PatientID;
        this.RefreshTable();
      });
    }
  }



  ngOnInit() {
    this.InitTable();

  }

  ngAfterViewInit() {
    this.criteria.ID = this.appointmentId;
    this.criteria.PatientID = this.patientId;
    this.getEntity();
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
      { "mData": "ReturnMessage", "aTargets": [0] },
      { "mData": "ReturnStatus", "aTargets": [1] },
      { "mData": "Created_By", "aTargets": [2] },
      { "mData": "Created_Dt", "aTargets": [3] }]

    this.aoColumns = [
      {
        "sTitle": "Return Message",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          return data;
        }
      },
      {
        "sTitle": "Return Status",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          return data;
        }
      },
      {
        "sTitle": "Created_By",
        "sClass": "",
        "mRender": (data, type, oObj) => {
          return `${oObj?.CreatedUser?.FirstName} ${oObj?.CreatedUser?.FirstName}`;
        }
      },
      {
        "sTitle": "Created Date",
        "sClass": "text-center",
        "mRender": (data, type, oObj) => {
          if (data) {
            return this.datePipe.transform(data, 'MM/dd/yyyy hh:mm a');
          }
          return '';
        }
      }
    ];
  }

  sendNote() {
    this.modal.show(this.criteria.ID, this.criteria.PatientID);
  }
}
