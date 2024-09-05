
import { DatePipe } from '@angular/common';
import Global from 'src/app/Global';
import { PartnerCompanyModel } from './../../../../common/models/partner-company.model';
import { CommonDialogService } from './../../../../common/services/dialog.service';
import { AuthenticationService } from './../../../../common/services/authentication.service';
import { UserService } from './../../../../common/services/user.service';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { BaseComponent } from './../../../../base.component';
import { MessageConstant } from './../../../../common/constant/message.const';
import UserModel from 'src/app/modules/common/models/user.model';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import * as xml2js from 'xml2js';

@Component({
  selector: 'app-add-patient-modal',
  templateUrl: './add-patient-modal.component.html',
  styleUrls: ['./add-patient-modal.component.css'],
  providers:[DatePipe]
})
export class AddPatientModalComponent extends BaseComponent implements OnInit {
  public model: UserModel = new UserModel();
  editor: any;
  @ViewChild('childModal') public modal: ModalDirective;
  @ViewChild('f') public form: NgForm;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  Submitting: boolean = false;
  partnerCompanies: PartnerCompanyModel[] = [];
  us_statelist = Global.US_StateList;
  isUploading: boolean = false;
  constructor(
    private service: UserService,
    public authService: AuthenticationService,
    private dialog: CommonDialogService,
    private datePipe:DatePipe) {
    super(authService);
    this.model = new UserModel();
  }

  ngOnInit() {
    this.getPartners();
  }

  uploaded(event) {
    if (event) {
      const parser = new xml2js.Parser({ strict: false, trim: true });
      parser.parseString(event, (err, result) => {
         if(result && result.CLINICALDOCUMENT){
           this.dialog.showToastrSuccess('Import XML' , 'Import success');
           const clinicial = result.CLINICALDOCUMENT;
           this.model.FirstName = clinicial.RECORDTARGET?.[0]?.PATIENTROLE?.[0]?.PATIENT?.[0]?.NAME?.[0].GIVEN?.[0]??'';
           this.model.LastName = clinicial.RECORDTARGET?.[0]?.PATIENTROLE?.[0]?.PATIENT?.[0]?.NAME?.[0].FAMILY?.[0]??'';
           var birthtime = clinicial.RECORDTARGET?.[0]?.PATIENTROLE?.[0]?.PATIENT?.[0]?.BIRTHTIME?.[0].$?.VALUE??'';
           if(birthtime && birthtime.length == 8){
             this.model.DOB = `${birthtime.substring(4,6)}/${birthtime.substring(6,8)}/${birthtime.substring(0,4)}`;
           }
           this.model.Gender = clinicial.RECORDTARGET?.[0]?.PATIENTROLE?.[0]?.PATIENT?.[0]?.ADMINISTRATIVEGENDERCODE?.[0]?.$?.DISPLAYNAME??'';
           this.model.Address1 = clinicial.RECORDTARGET?.[0]?.PATIENTROLE?.[0]?.ADDR?.[0]?.STREETADDRESSLINE?.[0]??'';
           this.model.Address2 = clinicial.RECORDTARGET?.[0]?.PATIENTROLE?.[0]?.ADDR?.[0]?.STREETADDRESSLINE?.[1]??'';
           this.model.City = clinicial.RECORDTARGET?.[0]?.PATIENTROLE?.[0]?.ADDR?.[0]?.CITY?.[0]??'';
           this.model.State = clinicial.RECORDTARGET?.[0]?.PATIENTROLE?.[0]?.ADDR?.[0]?.STATE?.[0]??'';
           this.model.ZipCode = clinicial.RECORDTARGET?.[0]?.PATIENTROLE?.[0]?.ADDR?.[0]?.POSTALCODE?.[0]??'';
          }
         else{
          this.dialog.showToastrError('Import XML' , 'Cannot read this file, please check.');
         }
      });
    }
  }

  uploadStatus(isCompleted) {
    this.isUploading = !isCompleted;
  }

  getPartners() {
    this.service.getPartners().subscribe(r => {
      this.partnerCompanies = r;
    })
  }

  save() {
    this.Submitting = true;
    this.service.addPatientAdmin(this.model).subscribe(result => {
      if (result) {
        this.Submitting = false;
        this.dialog.showSwalSuccesAlert('Add Patient', MessageConstant.REQUEST_SUCCESS_CONST);
        this.hide();
        this.closeModal.emit(true);
      }
      else {
        this.Submitting = false;
        this.dialog.showSwalErrorAlert('Add Patient', MessageConstant.FAILURE_REQUEST);
      }
    }, error => {
      this.Submitting = false;
      this.dialog.showSwalErrorAlert('Error', error.error);
    });
  }

  show() {
    this.model = new UserModel();
    this.modal.show();
  }

  hide() {
    this.form.resetForm();
    this.modal.hide();
  }
}

