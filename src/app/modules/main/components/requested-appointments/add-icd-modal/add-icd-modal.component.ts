import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ApptNoteICDCodeAssignementModel } from 'src/app/modules/common/models/appointment-note-icd-assigment.model';
import { AppointmentNoteModel } from 'src/app/modules/common/models/appointment-note.model';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { BaseCriteria } from 'src/app/modules/common/criterias/base.criteria';
import Global from 'src/app/Global'; 

@Component({
  selector: 'app-add-icd-modal',
  templateUrl: './add-icd-modal.component.html',
  styleUrls: ['./add-icd-modal.component.css']
})
export class AddIcdModalComponent implements OnInit {
  @ViewChild('childModal') modal: ModalDirective;
  @ViewChild('f') form: NgForm;
  @Output() onSaved: EventEmitter<AppointmentNoteModel> = new EventEmitter();
  @Output() onCancel: EventEmitter<AppointmentNoteModel> = new EventEmitter();
  content: any;
  AppointmentID: string = "";
  model: AppointmentNoteModel = new AppointmentNoteModel();
  note: AppointmentNoteModel;
  optionsICD: Options; 
  optionsCPT:Options;
  optionsModifier:Options;
  optionsPlace:Options;
  constructor() { }
  ajaxICDOptions: any;
  ajaxCPTOptions:any;
  ajaxModifierOptions:any;
  ajaxPlaceOptions:any;
  ngOnInit(): void {
    this.ajaxICDOptions = {
      url: `${Global.apiUrl}/api/Utility/SearchICD`,
      dataType: 'json',
      delay: 250,
      cache: true,
      method: 'POST',
      headers: {
        "Authorization": Global.getToken()
      },
      data: (params: any) => {
        let icdCriteria = new BaseCriteria();
        icdCriteria.SearchText = params.term;
        icdCriteria.CurrentPage = params.page ? params.page : 0;
        return icdCriteria;
      },
      processResults: (data: any, params: any) => {
        params.page = params.page || 1;
        return {
          results: $.map(data.Data, function (obj) {
            return { id: obj.Code, text: obj.Description };
          }),
          pagination: {
            more: (params.page * 20) < data.TotalRecords
          }
        };
      }
    };

    this.ajaxCPTOptions = {
      url: `${Global.apiUrl}/api/Utility/SearchCPT`,
      dataType: 'json',
      delay: 250,
      cache: true,
      method: 'POST',
      headers: {
        "Authorization": Global.getToken()
      },
      data: (params: any) => {
        let icdCriteria = new BaseCriteria();
        icdCriteria.SearchText = params.term;
        icdCriteria.CurrentPage = params.page ? params.page : 0;
        return icdCriteria;
      },
      processResults: (data: any, params: any) => {
        params.page = params.page || 1;
        return {
          results: $.map(data.Data, function (obj) {
            return { id: obj.Code, text: obj.Description };
          }),
          pagination: {
            more: (params.page * 20) < data.TotalRecords
          }
        };
      }
    };

    this.ajaxModifierOptions = {
      url: `${Global.apiUrl}/api/Utility/SearchModifier`,
      dataType: 'json',
      delay: 250,
      cache: true,
      method: 'POST',
      headers: {
        "Authorization": Global.getToken()
      },
      data: (params: any) => {
        let icdCriteria = new BaseCriteria();
        icdCriteria.SearchText = params.term;
        icdCriteria.CurrentPage = params.page ? params.page : 0;
        return icdCriteria;
      },
      processResults: (data: any, params: any) => {
        params.page = params.page || 1;
        return {
          results: $.map(data.Data, function (obj) {
            return { id: obj.Code, text: obj.Description };
          }),
          pagination: {
            more: (params.page * 20) < data.TotalRecords
          }
        };
      }
    };

    this.ajaxPlaceOptions = {
      url: `${Global.apiUrl}/api/Utility/SearchPlace`,
      dataType: 'json',
      delay: 250,
      cache: true,
      method: 'POST',
      headers: {
        "Authorization": Global.getToken()
      },
      data: (params: any) => {
        let icdCriteria = new BaseCriteria();
        icdCriteria.SearchText = params.term;
        icdCriteria.CurrentPage = params.page ? params.page : 0;
        return icdCriteria;
      },
      processResults: (data: any, params: any) => {
        params.page = params.page || 1;
        return {
          results: $.map(data.Data, function (obj) {
            return { id: obj.Code, text: obj.Description };
          }),
          pagination: {
            more: (params.page * 20) < data.TotalRecords
          }
        };
      }
    };


    this.optionsICD = {
      width: 'auto',
      minimumInputLength: 3,
      templateResult: this.templateResult,
      templateSelection: this.templateIdSelection,
      ajax: this.ajaxICDOptions, 
      multiple:true
    } as Options;

    this.optionsCPT = {
      width: 'auto',
      minimumInputLength: 0,
      templateResult: this.templateResult,
      templateSelection: this.templateSelection,
      ajax: this.ajaxCPTOptions,
    } as Options;

    this.optionsModifier = {
      width: 'auto',
      minimumInputLength: 0,
      templateResult: this.templateResult,
      templateSelection: this.templateSelection,
      ajax: this.ajaxModifierOptions,
    } as Options;

    this.optionsPlace = {
      width: 'auto',
      minimumInputLength: 0,
      templateResult: this.templateResult,
      templateSelection: this.templateSelection,
      ajax: this.ajaxPlaceOptions,
    } as Options;
  }

  // function for result template
  public templateResult = (state: Select2OptionData): JQuery | string => {
    if (!state.id) {
      return state.text;
    }
    let html = `<div class="row">
                  <div class="col-md-3"><b>${state.id}</b></div>
                  <div class="col-md-9">${state.text}</div>
      </div>`;

    return jQuery(html);
  }

  // function for selection template
  public templateSelection = (state: Select2OptionData): JQuery | string => {
    if (!state.id) {
      return state.text;
    }
    let html = `<div class="row">
    <div class="col-md-3"><b>${state.id}</b></div>
      <div class="col-md-8">${state.text}</div>
  </div>`;

    return jQuery(html);
  }

  public templateIdSelection = (state: Select2OptionData): JQuery | string => {
    if (!state.id) {
      return state.text;
    }
    let html = ` 
    <span><b>${state.id}</b></span>  `;

    return jQuery(html);
  }

  save() {
    let note = Object.assign({},this.model);
    this.onSaved.emit(note);
    this.hide();
  }

  hide() { 
    this.form.resetForm();
    this.modal.hide();
  }

  show() { 
    this.modal.show();
  }

  cancel(){
    let note = Object.assign({},this.model);
    this.form.resetForm();
    this.modal.hide();
    this.onCancel.emit(note);
  }

}
