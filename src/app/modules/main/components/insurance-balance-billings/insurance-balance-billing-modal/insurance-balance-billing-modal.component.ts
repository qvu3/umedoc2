import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { BaseComponent } from 'src/app/modules/base.component';
import { InsuranceBalanceBillingModel } from 'src/app/modules/common/models/balance-billing.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { BalanceBillingService } from 'src/app/modules/common/services/balance-billing.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';

@Component({
  selector: 'app-insurance-balance-billing-modal',
  templateUrl: './insurance-balance-billing-modal.component.html',
  styleUrls: ['./insurance-balance-billing-modal.component.css']
})
export class InsuranceBalanceBillingModalComponent extends BaseComponent implements OnInit {
  @ViewChild('childModal') modal: ModalDirective;
  @ViewChild('f') form: NgForm;
  isUploading: boolean = false;
  model: InsuranceBalanceBillingModel = new InsuranceBalanceBillingModel();
  patientName:string;
  @Output() onClosed:EventEmitter<any> = new EventEmitter();
  constructor(authService: AuthenticationService,
    private balanceBillingService: BalanceBillingService,
    private dialog: CommonDialogService) {
    super(authService);
  }

  ngOnInit(): void {

  }

  save() {
    if (!this.model.ID) {
      this.balanceBillingService.Create(this.model).subscribe(r => {
        if (r && r.ID) {
          this.dialog.showToastrSuccess("Insurance Balance Billing", "Insurance Balance Billing is created successfully");
          this.hide();
        }
        else {
          this.dialog.showSwalErrorAlert("Error", "Insurance Balance Billing cannot created")
        }
      });
    }
    else{
      this.balanceBillingService.Edit(this.model).subscribe(r => {
        if (r && r.ID) {
          this.dialog.showToastrSuccess("Insurance Balance Billingt", "Insurance Balance Billing is updated successfully");
          this.onClosed.emit(true);
          this.hide();
        }
        else {
          this.dialog.showSwalErrorAlert("Error", "Insurance Balance Billing cannot updated")
        }
      });
    }
  }

  getEntity(id) {
    this.balanceBillingService.Get(id).subscribe(r => {
      this.model = r;
    });
  }

  show(id, appointmentId) {
    this.model = new InsuranceBalanceBillingModel();
    this.model.AppointmentID = appointmentId;
    if (id) {
      this.getEntity(id);
    }
    this.modal.show();
  }

  hide() {
    this.form.resetForm();
    this.modal.hide();
  } 

  uploadStatus(isCompleted) {
    this.isUploading = !isCompleted;
  }

  uploaded(returnObject) {
    if (returnObject) { 
      this.model.DocumentUrl = returnObject.ImagePath; 
    } 
  }
  
}

