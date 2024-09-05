import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { UserService } from 'src/app/modules/common/services/user.service';

import { InsuranceUpdateComponent } from '../../insurance-update/insurance-update.component';
import { PatientInsuranceService } from 'src/app/modules/common/services/patient-insurance.service';
import { PatientInsuranceModel } from 'src/app/modules/common/models/patient-insurance.model';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { ActivatedRoute } from '@angular/router';
import { DeletePatientInsuranceService } from 'src/app/modules/common/services/delete-patient-insurance.service';
import { DeletePatientInsuranceModel } from 'src/app/modules/common/models/delete-patient-insurance.model';
import { PverifyInsuranceModalComponent } from 'src/app/modules/common/component/pverify-insurance-modal/pverify-insurance-modal.component';

@Component({
  selector: 'app-patient-insurance',
  templateUrl: './patient-insurance.component.html',
  styleUrls: ['./patient-insurance.component.css']
})
export class PatientInsuranceComponent extends BaseComponent implements OnInit {
  models: Array<PatientInsuranceModel> = new Array<PatientInsuranceModel>();
  @ViewChild('insuranceUpdateModal') insuranceUpdateModal: InsuranceUpdateComponent;

  model: PatientInsuranceModel = new PatientInsuranceModel;
  patientId: string;
  isShowDeletedInsurance: boolean = false;
  deletePatientInsurances: any = new Array<DeletePatientInsuranceModel>();
  constructor(public authService: AuthenticationService,
    public userService: UserService,
    private dialog: CommonDialogService,
    private activeRouter: ActivatedRoute,
    private patientInsuranceService: PatientInsuranceService,
    private deletePatientInsuranceService: DeletePatientInsuranceService) {
    super(authService);
    this.patientId = this.currentUser.Id;
    activeRouter.parent.params.subscribe(r => {
      this.patientId = r && r['{id}'] ? r['{id}'] : this.currentUser.Id;
    });
  }

  ngOnInit() {
    this.getEntity();
    this.getDeletePatientInsurances();
  }

  changeInsurance(id) {
    if (id) {
      this.patientInsuranceService.Get(id).subscribe(r => {
        if (r) {
          this.model = r;
          this.insuranceUpdateModal.show(this.model);
        }
      });
    }
  }


  addInsurance() {
    this.model = new PatientInsuranceModel();
    this.model.PatientID = this.patientId;
    this.insuranceUpdateModal.show(this.model);
  }

  onCloseInsurance(event) {
    if (event) {
      this.getEntity();
    }
  }

  getEntity() {
    this.patientInsuranceService.GetByPatientID(this.patientId).subscribe(r => {
      if (r) {
        this.models = r;
      }
    });
  }

  removeItemInsurance(id) {
    this.dialog.showSwalConfirmAlert("Are you sure you want to delete this item?").then((isConfirm => {
      if (isConfirm) {
        this.patientInsuranceService.Delete(id).subscribe(r => {
          if (r) {
            // Get list deleted insurance
            this.getDeletePatientInsurances();

            // Get list patient insurance
            this.patientInsuranceService.GetByPatientID(this.patientId).subscribe(result => {
              if (result) {
                this.models = result;
                this.dialog.showToastrWarning('Insurance has been removed!');
              }
            });
          }
        });
      }
    }));
  }

  getDeletePatientInsurances() {
    this.deletePatientInsuranceService.GetDeletedPatientInsurancesByPatientAsync(this.patientId).subscribe(r => {
      if (r) {
        this.deletePatientInsurances = r;
      }
    });
  }

  showDeletedInsurance() {
    this.isShowDeletedInsurance = !this.isShowDeletedInsurance;
  }
}