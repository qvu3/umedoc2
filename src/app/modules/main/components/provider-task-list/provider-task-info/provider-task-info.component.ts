import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Select2OptionData } from 'ng-select2';
import { ModalDirective } from 'ngx-bootstrap';
import { Options } from 'select2';
import { BaseComponent } from 'src/app/modules/base.component';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import ProviderTaskModel from 'src/app/modules/common/models/provider-task.model';
import UserModel from 'src/app/modules/common/models/user.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { ProviderProfileService } from 'src/app/modules/common/services/provider-profile.service';
import { ProviderTaskService } from 'src/app/modules/common/services/provider-task.service';
import { UserService } from 'src/app/modules/common/services/user.service';

@Component({
  selector: 'app-provider-task-info',
  templateUrl: './provider-task-info.component.html',
  styleUrls: ['./provider-task-info.component.css']
})
export class ProviderTaskInfoComponent extends BaseComponent implements OnInit {
  @ViewChild('childModal') public modal: ModalDirective;
  @ViewChild('f') public form: NgForm;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  Submitting: boolean = false;
  model: ProviderTaskModel = new ProviderTaskModel();
  userPatientList: Array<UserModel> = new Array<UserModel>();
  reasons: Array<Select2OptionData> = new Array<Select2OptionData>();
  optionsPatient: Options;
  patientId: string = "";
  userProviderList: Array<Select2OptionData> = new Array<Select2OptionData>();
  optionsProvider: Options;

  constructor(public authService: AuthenticationService,
    private service: ProviderTaskService,
    private providerService: ProviderProfileService,
    private userService: UserService,
    private dialog: CommonDialogService) {
    super(authService);
    this.optionsPatient = {
      multiple: false,
      allowClear: true,
      minimumInputLength: 3
    };
  }

  ngOnInit(): void {

  }

  getPatientUsers() {
    this.reasons = new Array<Select2OptionData>();
    this.userService.GetAllUserPatientByCompanyID().subscribe(r => {
      var list = r.map(x => {
        return { id: x.Id, text: x.Text, source: x } as Select2OptionData;
      });

      if (list) {
        this.reasons = list;
      }

      this.modal.show();
    });
  }

  getProviders() {
    this.userProviderList = [];
    this.providerService.GetProvidersForTaskList()
      .subscribe(r => {
        if (r) {
          let providers = r.map((x) => {
            return { id: x.Id, text: `${x.FirstName} ${x.LastName}`, source: x } as Select2OptionData;
          });
          this.userProviderList = providers;
        }
      });
  }

  save() {
    if (this.model.ID) {
      this.service.Edit(this.model).subscribe(result => {
        if (result) {
          this.Submitting = false;
          this.dialog.showToastrSuccess('Provider Task List', MessageConstant.REQUEST_SUCCESS_CONST);
          this.hide();
          this.closeModal.emit(true);
        }
        else {
          this.Submitting = false;
          this.dialog.showSwalErrorAlert('Provider Task List', MessageConstant.FAILURE_REQUEST);
        }
      },
        error => {
          this.Submitting = false;
          this.dialog.showSwalErrorAlert('Provider Task List', error.error);
        });
    } else {
      this.service.Create(this.model).subscribe(result => {
        if (result) {
          this.Submitting = false;
          this.dialog.showToastrSuccess('Provider Task List', MessageConstant.REQUEST_SUCCESS_CONST);
          this.hide();
          this.closeModal.emit(true);
          this.authService.onReloadTaskList.emit(true);
        }
        else {
          this.Submitting = false;
          this.dialog.showSwalErrorAlert('Provider Task List', MessageConstant.FAILURE_REQUEST);
        }
      },
        error => {
          this.Submitting = false;
          this.dialog.showSwalErrorAlert('Provider Task List', error.error);
        });
    }
  }

  show(id) {
    if (!this.patientId) {
      this.getPatientUsers();
    }

    this.getProviders();

    if (id) {
      this.model.ID = id;
      this.getEntity();
    } else {
      this.model.Status = "To-do";
    }
    if (this.patientId) {
      this.model.PatientID = this.patientId;
      this.modal.show();
    }
  }

  getEntity() {
    this.service.Get(this.model.ID).subscribe(result => {
      if (result) {
        this.model = result;
        this.modal.show();
      }
    });
  }

  hide() {
    this.form.resetForm();
    this.modal.hide();
  }
}
