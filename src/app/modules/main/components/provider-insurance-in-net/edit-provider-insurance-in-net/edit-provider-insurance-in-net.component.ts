import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms'; 
import { ModalDirective } from 'ngx-bootstrap';
import Global from 'src/app/Global';
import { BaseComponent } from 'src/app/modules/base.component';
import { MessageConstant } from 'src/app/modules/common/constant/message.const'; 
import { ProviderInsuranceInNetModel } from 'src/app/modules/common/models/provider-insurance-in-net.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { PayerService } from 'src/app/modules/common/services/payer.service';
import { ProviderInsuranceInNetService } from 'src/app/modules/common/services/provider-insurance-in-net.service';
import { Options } from 'ngx-bootstrap/positioning/models';
import { Select2OptionData } from 'ng-select2';

@Component({
  selector: 'app-edit-provider-insurance-in-net',
  templateUrl: './edit-provider-insurance-in-net.component.html',
  styleUrls: ['./edit-provider-insurance-in-net.component.css']
})
export class EditProviderInsuranceInNetComponent extends BaseComponent implements OnInit {
  @ViewChild('childModal') public modal: ModalDirective;
  @ViewChild('f') public form: NgForm;
  @Output() onClosed: EventEmitter<boolean> = new EventEmitter();
  Submitting: boolean = false;
  model: ProviderInsuranceInNetModel = new ProviderInsuranceInNetModel(); 
  states: any;
  optionsInsurance: Options;
  payers: Array<Select2OptionData>;
  constructor(public authService: AuthenticationService,
    private service: ProviderInsuranceInNetService, 
    private payerService:PayerService,
    private dialog: CommonDialogService) {
    super(authService);

  }

  ngOnInit(): void {
    this.states = Global.US_StateList;
  }


  save() {
    if (this.model.ID) {
      this.service.Edit(this.model).subscribe(result => {
        if (result) {
          this.Submitting = false;
          this.dialog.showToastrSuccess('Provider Insurance', MessageConstant.REQUEST_SUCCESS_CONST);
          this.hide();
          this.onClosed.emit(true);
        }
        else {
          this.Submitting = false;
          this.dialog.showSwalErrorAlert('Provider Insurance ', "Your Service Existed");
        }
      },
        error => {
          this.Submitting = false;
          this.dialog.showSwalErrorAlert('Provider Insurance', "Your Service Existed");
        });
    } else {
      this.service.Create(this.model).subscribe(result => {
        if (result) {
          this.Submitting = false;
          this.dialog.showToastrSuccess('Provider Insurance', MessageConstant.REQUEST_SUCCESS_CONST);
          this.hide();
          this.onClosed.emit(true);
        }
        else {
          this.Submitting = false;
          this.dialog.showSwalErrorAlert('Provider Service', "Your Service Existed");
        }
      },
        error => {
          this.Submitting = false;
          this.dialog.showSwalErrorAlert('Provider Service', "Your Service Existed");
        });
    }
  }

  getPayers(){
    this.payers = [];
    this.payerService.GetAll().subscribe(r=>{
      var list = r.map(x => {
        return { id: x.PayerCode, text: x.PayerName } as Select2OptionData;
      });
      if (list) {
        this.payers = list;
      }
    });
  }

  show(id, providerId) {
    this.getPayers();
    this.model = new ProviderInsuranceInNetModel(); 
    this.model.ProviderID = providerId ?? this.currentUser.Id; 
    if (id) {
      this.model.ID = id;
      this.getEntity();
    }

    this.modal.show();
  }

  getEntity() {
    this.service.Get(this.model.ID).subscribe(result => {
      if (result) {
        this.model = result;
      }
    });
  }

  

  hide() {
    this.form.resetForm();
    this.modal.hide();
  }
}

