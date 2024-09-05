import { Component, OnInit, EventEmitter, ViewChild, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { BaseComponent } from 'src/app/modules/base.component';
import { AppointmentModel } from 'src/app/modules/common/models/appointment.model';
import UserModel from 'src/app/modules/common/models/user.model';
import { AppointmentStatusModel } from 'src/app/modules/common/models/appointment-status.model';
import { AppointmentReasonModel } from 'src/app/modules/common/models/appointment-reason.model';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import TransactionPaypalModel from 'src/app/modules/common/models/transaction-paypal.model';
import Global from 'src/app/Global';
import { CompanyModel } from 'src/app/modules/common/models/company.model';

@Component({
  selector: 'app-appointment-confirmation',
  templateUrl: './appointment-confirmation.component.html',
  styleUrls: ['./appointment-confirmation.component.css']
})
export class AppointmentConfirmationComponent extends BaseComponent implements OnInit {
  model: AppointmentModel;
  id: string;
  userList: UserModel[];
  companyList: CompanyModel[];
  isValidAppointment: boolean = true;
  appointmentStatusList: AppointmentStatusModel[];
  appointmentReasonList: AppointmentReasonModel[];
  @ViewChild('childModal') public modal: ModalDirective;
  @ViewChild('f') public form: NgForm;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  Submitting: boolean = false;
  routerName: string;
  constructor(
    private service: AppointmentService,
    //private dialog: CommonDialogService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private _location: Location,
    private authenticate: AuthenticationService
  ) {
    super(authenticate);
    this.model = new AppointmentModel();
    this.model.TransactionPaypal = new TransactionPaypalModel();
    activeRoute.params.subscribe(r => {
      this.id = r["{id}"];
      if (this.id) {
        this.getEntity(this.id);
      }
    })
  }

  gotoUserPanel() {
    this.router.navigate([`/${this.routerName}/management/appointment`]);
  }

  videoCall() {
    window.open(`${Global.apiUrl}/VideoCall/Index?id=${this.id}`, '_blank');
  }

  getEntity(id) {
    this.service.AppointmentConfirmation(id).subscribe(result => {
      if (result) {
        this.model = result;
        this.model.AppointmentVideoLink = `${Global.apiUrl}/VideoCall/Index?id=${this.model.ID}`;
      } else {
        this.isValidAppointment = false;
        //this.dialog.showAlert({ title: 'Appointment Confirmation', message: MessageConstant.NOT_FOUND });
      }
    });
  }

  ngOnInit() {
    this.model = new AppointmentModel();
    this.model.TransactionPaypal = new TransactionPaypalModel();
  }

  generateReasonAssignment(listReasonAssignment) {
    if (listReasonAssignment && listReasonAssignment.length > 0) {
      let str = "";
      listReasonAssignment.forEach((ele, index) => {
        if (ele.AppointmentReason) {
          str += index > 0 ? ', ' + ele.AppointmentReason.ReasonName : ele.AppointmentReason.ReasonName;
        }
      });
      return str;
    }
  }
}