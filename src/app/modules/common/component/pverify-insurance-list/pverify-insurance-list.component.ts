import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../../modules/base.component';
import { MessageConstant } from '../../constant/message.const';
import { PverifyPatientInsuranceModel } from '../../models/pverify-patient-insurance.model';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonDialogService } from '../../services/dialog.service';
import { PverifyPatientInsuranceService } from '../../services/pverify-patient-insurance.service';
import { PverifyDisableReasonComponent } from '../pverify-disable-reason/pverify-disable-reason.component';
import { PverifyInsuranceModalComponent } from '../pverify-insurance-modal/pverify-insurance-modal.component';
import { PverifyInsuranceSetFinalCopayComponent } from '../pverify-insurance-set-final-copay/pverify-insurance-set-final-copay.component';
import { PverifyUploadImageComponent } from '../pverify-upload-image/pverify-upload-image.component';

@Component({
  selector: 'app-pverify-insurance-list',
  templateUrl: './pverify-insurance-list.component.html',
  styleUrls: ['./pverify-insurance-list.component.css']
})
export class PverifyInsuranceListComponent extends BaseComponent implements OnInit {
  @Input() patientId!: string;
  @Input() showHistory: boolean = true;
  insuranceType!: string;
  @Input() showButtonInsuranceType: boolean = true;

  list: Array<PverifyPatientInsuranceModel> = [];
  @ViewChild('disableModal') disableModal!: PverifyDisableReasonComponent;
  @ViewChild('modal') pverifyAddInsuranceModal!: PverifyInsuranceModalComponent;
  @ViewChild('finalCopayModal') finalCopayModal!: PverifyInsuranceSetFinalCopayComponent;
  @ViewChild('modalImage') modalImage!: PverifyUploadImageComponent;

  @Output() onChangeInsurance: EventEmitter<Array<PverifyPatientInsuranceModel>> = new EventEmitter();
  constructor(authService: AuthenticationService,
    private dialog: CommonDialogService,
    private pverifyInsuranceService: PverifyPatientInsuranceService) {
    super(authService);
  }

  override ngOnInit(): void {
    this.getList();
  }


  addPVerifyInsurance(insuranceType: any) {
    this.pverifyAddInsuranceModal.show(insuranceType, this.patientId);
  }

  showDiableReason(entity: any) {
    var p = Object.assign({}, entity);
    this.disableModal.show(p);
  }

  getList() {
    if (this.patientId) {
      this.pverifyInsuranceService.getByPatient(this.patientId).subscribe(r => {
        this.list = r;
        this.onChangeInsurance.emit(r);
      });
    }
  }

  saveDisableCallback(event: { IsChargePatient: any; }) {
    if (event) {
      this.pverifyInsuranceService.Disable(event).subscribe(r => {
        this.getList();
        if (r) {
          if (event.IsChargePatient) {
            this.dialog.showToastrSuccess('Disable Insurance', "Charged successfully.");
          } else {
            this.dialog.showToastrSuccess('Disable Insurance', MessageConstant.REQUEST_SUCCESS_CONST);
          }
        } else {
          this.dialog.showSwalErrorAlert('Disable Insurance', "Insufficient Funds. Patient's account has been locked.");
        }
      }, error => {
        this.dialog.showSwalErrorAlert('Disable Insurance', error.error ?? MessageConstant.FAILURE_REQUEST);
      });
    }
  }

  setFinalCopay(item: any) {
    var entity = Object.assign({}, item);
    this.finalCopayModal.show(entity);
  }

  saveFinalCopay(event: any) {
    if (event) {
      this.pverifyInsuranceService.SetFinalCopay(event).subscribe(r => {
        this.getList();
        this.dialog.showToastrSuccess('Set Final Copay Insurance', MessageConstant.REQUEST_SUCCESS_CONST);
      }, error => {
        this.dialog.showSwalErrorAlert('Set Final Copay Insurance', MessageConstant.FAILURE_REQUEST);
      });
    }
  }

  viewReportPdf(item: { ReportUrlViewer: string | URL | undefined; }) {
    var redirectWindow = window.open(item.ReportUrlViewer, '_blank');
    if (redirectWindow !== null) {
      redirectWindow.location;
    }
  }

  enabledInsurance(item: { PatientID: any; InsuranceType: any; ID: any; }) {
    // Check limit insurance for Patient
    this.dialog.showSwalConfirmAlert('Are you sure you want to Enable this Insurance?').then(r => {
      if (r) {
        this.pverifyInsuranceService.CheckLimitAddingInsurance(item.PatientID, item.InsuranceType).subscribe(r => {
          if (r) {
            this.dialog.showSwalErrorAlert('Enabled Insurance', "You reached out limit to add insurance. Please contact our customer support so we can assist you.");
          } else {
            this.pverifyInsuranceService.Enabled(item.ID).subscribe(k => {
              if (k) {
                this.getList();
                this.dialog.showToastrSuccess('Enabled Insurance', MessageConstant.REQUEST_SUCCESS_CONST);
              } else {
                this.dialog.showSwalErrorAlert('Enabled Insurance', MessageConstant.FAILURE_REQUEST);
              }
            }, error => {
              this.dialog.showSwalErrorAlert('Enabled Insurance', MessageConstant.FAILURE_REQUEST);
            });
          }
        }, error => {
          this.dialog.showSwalErrorAlert('Enabled Insurance', MessageConstant.FAILURE_REQUEST);
        });
      }
    });
  }

  updateImages(item: { ID: any; }) {
    this.modalImage.show(item.ID);
  }

  delete(item: { ID: string; }){
    this.dialog.showSwalConfirmAlert('Are you sure you want to delete this Insurance? This action cannot be undone.').then(r => {
      if (r) {
        this.pverifyInsuranceService.Delete(item.ID).subscribe(r => {
          if (r) {
            this.getList();
            this.dialog.showToastrSuccess('Delete Insurance', MessageConstant.REQUEST_SUCCESS_CONST);
          } else {
            this.dialog.showSwalErrorAlert('Delete Insurance', MessageConstant.FAILURE_REQUEST);
          }
        }, error => {
          this.dialog.showSwalErrorAlert('Delete Insurance', MessageConstant.FAILURE_REQUEST);
        });
      }
    });
  }
}
