import { UserService } from 'src/app/modules/common/services/user.service';
import { PatientProfileService } from 'src/app/modules/common/services/patient-profile.service';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { NgForm } from '@angular/forms';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { PatientRequestService } from './../../../../common/services/patient-request.service';
import { ModalDirective } from 'ngx-bootstrap';
import { BaseComponent } from 'src/app/modules/base.component';
import { PatientRequestModel } from './../../../../common/models/patient-request.model';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Select2OptionData } from 'ng-select2';

@Component({
  selector: 'app-patient-request-modal',
  templateUrl: './patient-request-modal.component.html',
  styleUrls: ['./patient-request-modal.component.css']
})
export class PatientRequestModalComponent extends BaseComponent implements OnInit {
  public model: PatientRequestModel = new PatientRequestModel();
  public isClosed: boolean = false;
  public id: string = '';
  editor: any;
  providers: Array<Select2OptionData> = new Array<Select2OptionData>();
  patients: Array<Select2OptionData> = new Array<Select2OptionData>();
  optionsProvider = {
    multiple: false,
    allowClear: true
  };
  @ViewChild('childModal') public modal: ModalDirective;
  @ViewChild('f') public form: NgForm;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  Submitting: boolean = false;

  constructor(
    private service: PatientRequestService,
    public authService: AuthenticationService,
    private userService: UserService,
    private dialog: CommonDialogService) {
    super(authService);
    this.model = new PatientRequestModel();
  }

  ngOnInit() {
    this.getPatients();
    this.getProviders();
  }

  getProviders() {
    this.providers = [];
    this.userService.GetProviders()
      .subscribe(r => {
        if (r) {
          let providers = r.map((x) => {
            return { id: x.Id, text: `${x.FirstName} ${x.LastName}`, source: x } as Select2OptionData;
          });
          this.providers = providers;
        }
      }); 
  }

  getPatients(){
    this.patients = [];
    this.userService.GetAllUserPatientByCompanyID().subscribe(r=>{
      if (r) {
        let patients = r.map((x) => {
          return { id: x.Id, text: `${x.FirstName} ${x.LastName}`, source: x } as Select2OptionData;
        });
        this.patients = patients;
      }
    })
  }

  save() {
    this.Submitting = true;
    if (this.id) {
      this.service.Edit(this.model).subscribe(result => {
        if (result) {
          this.Submitting = false;
          this.dialog.showSwalSuccesAlert('Patient Request', MessageConstant.REQUEST_SUCCESS_CONST);
          this.hide();
          this.authService.onReloadPatientRequestTable.emit(true);
        }
        else {
          this.Submitting = false;
          this.dialog.showSwalErrorAlert('Patient Request', MessageConstant.FAILURE_REQUEST);
        }
      }, error => {
        this.Submitting = false;
        this.dialog.showSwalErrorAlert('Error', error.error);
      });
    }
    else {
      this.service.Create(this.model).subscribe(result => {
        if (result) {
          this.Submitting = false;
          this.dialog.showSwalSuccesAlert('Patient Request', MessageConstant.REQUEST_SUCCESS_CONST);
          this.hide();
          this.authService.onReloadPatientRequestTable.emit(true);
        }
        else {
          this.Submitting = false;
          this.dialog.showSwalErrorAlert('Patient Request', MessageConstant.FAILURE_REQUEST);
        }
      }, error => {
        this.Submitting = false;
        this.dialog.showSwalErrorAlert('Error', error.error);
      });
    }
  }

  getEntity(id) {
    this.service.GetById(id).subscribe(r => {
      this.model = r;
      this.modal.show();
    });
  }

  show(isClosed, id) {
    this.isClosed = isClosed;
    this.id = id;
    if (id) {
      this.getEntity(id);
    }
    else {
      this.model = new PatientRequestModel();
      this.model.Status = "To Do";
      this.modal.show();
    }
  }

  hide() {
    this.form.resetForm();
    this.modal.hide();
  }
}
