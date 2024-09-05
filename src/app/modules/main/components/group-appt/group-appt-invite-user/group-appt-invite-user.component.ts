import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Select2OptionData } from 'ng-select2';
import { ModalDirective } from 'ngx-bootstrap';
import Global from 'src/app/Global';
import { BaseCriteria } from 'src/app/modules/common/criterias/base.criteria';
import { AppointmentNoteModel } from 'src/app/modules/common/models/appointment-note.model';
import { Options } from 'select2';
import { GroupApptPatientModel } from 'src/app/modules/common/models/group-appt-patient.model';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { GroupApptPatientService } from 'src/app/modules/common/services/group-appt-patient.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';

@Component({
  selector: 'app-group-appt-invite-user',
  templateUrl: './group-appt-invite-user.component.html',
  styleUrls: ['./group-appt-invite-user.component.css']
})
export class GroupApptInviteUserComponent extends BaseComponent implements OnInit {
  @ViewChild('childModal') modal: ModalDirective;
  @ViewChild('f') form: NgForm;
  @Output() onSaved: EventEmitter<boolean> = new EventEmitter();

  groupApptID: string;
  model: GroupApptPatientModel = new GroupApptPatientModel();
  options: Options;
  constructor(public authenticateService: AuthenticationService,
    private groupApptPatientService: GroupApptPatientService,
    private dialog: CommonDialogService
  ) { super(authenticateService); }
  ajaxOptions: any;
  ngOnInit(): void {
    this.ajaxOptions = {
      url: `${Global.apiUrl}/api/User/SearchPatientUser`,
      dataType: 'json',
      delay: 250,
      cache: true,
      method: 'POST',
      headers: {
        "Authorization": Global.getToken()
      },
      data: (params: any) => {
        let criteria = new BaseCriteria();
        criteria.SearchText = params.term;
        criteria.CurrentPage = params.page ? params.page : 0;
        return criteria;
      },
      processResults: (data: any, params: any) => {
        params.page = params.page || 1;
        return {
          results: $.map(data.Data, function (obj) {
            return {
              id: obj.UserID, text: obj.PatientName,
              additional: obj.PatientName + ' ' + obj.DOBText + ' ' + obj.Email
            };
          }),
          pagination: {
            more: (params.page * 20) < data.TotalRecords
          }
        };
      }
    };
    this.options = {
      width: 'auto',
      minimumInputLength: 3,
      templateResult: this.templateResult,
      templateSelection: this.templateIdSelection,
      ajax: this.ajaxOptions
    } as Options;
  }

  // function for result template
  public templateResult = (state: Select2OptionData): JQuery | string => {
    if (!state.id) {
      return state.text;
    }
    let html = `<div class="row"> 
                <div class="col-md-9">${state.additional}</div>
      </div>`;

    return jQuery(html);
  }

  // function for selection template
  public templateSelection = (state: Select2OptionData): JQuery | string => {
    if (!state.id) {
      return state.text;
    }
    let html = `<div class="row"> 
      <div class="col-md-8">${state.text}</div>
  </div>`;

    return jQuery(html);
  }

  public templateIdSelection = (state: Select2OptionData): JQuery | string => {
    if (!state.id) {
      return state.text;
    }
    let html = ` 
    <span><b>${state.text}</b></span>  `;

    return jQuery(html);
  }

  save() {
    this.model.GroupApptID = this.groupApptID;
     this.groupApptPatientService.SaveInviteUser(this.model).subscribe(r => {
      if (r) {
        this.dialog.showToastrSuccess("Invite User", MessageConstant.REQUEST_SUCCESS_CONST);
        this.onSaved.emit(true);
        this.hide();
      } else {
        this.dialog.showSwalErrorAlert("Invite User", MessageConstant.FAILURE_REQUEST);
      }
    }, error => {
      let message = error?.error ?? MessageConstant.FAILURE_REQUEST;
      this.dialog.showSwalErrorAlert("Invite User", message);
    });  
  }

  hide() {
    this.form.resetForm();
    this.modal.hide();
  }

  show() {
    this.modal.show();
  }

  cancel() {
    let note = Object.assign({}, this.model);
    this.form.resetForm();
    this.modal.hide();
  }

}

