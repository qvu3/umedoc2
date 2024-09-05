import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { BaseComponent } from 'src/app/modules/base.component';
import { InsuranceBalanceBillingModel } from 'src/app/modules/common/models/balance-billing.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { BalanceBillingService } from 'src/app/modules/common/services/balance-billing.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';

@Component({
  selector: 'app-insurance-balance-billing-viewer',
  templateUrl: './insurance-balance-billing-viewer.component.html',
  styleUrls: ['./insurance-balance-billing-viewer.component.css']
})
export class InsuranceBalanceBillingViewerComponent extends BaseComponent implements OnInit {
  @ViewChild('childModal') modal: ModalDirective;
  @ViewChild('f') form: NgForm;
  model: InsuranceBalanceBillingModel = new InsuranceBalanceBillingModel();
  constructor(authService: AuthenticationService,
    private balanceBillingService: BalanceBillingService) {
    super(authService);
  }

  ngOnInit(): void {

  }

  getEntity(id) {
    this.balanceBillingService.Get(id).subscribe(r => {
      this.model = r;
      this.modal.show();
    });
  }

  show(id) {
    this.model = new InsuranceBalanceBillingModel();
    if (id) {
      this.getEntity(id);
    }
  }

  hide() {
    this.form.resetForm();
    this.modal.hide();
  }
}