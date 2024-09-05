import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { CompanyModel } from 'src/app/modules/common/models/company.model';
import { PatientInsuranceModel } from 'src/app/modules/common/models/patient-insurance.model';
import { PatientProfileModel } from 'src/app/modules/common/models/patient-profile.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CompanyService } from 'src/app/modules/common/services/company.service';
import { PatientInsuranceService } from 'src/app/modules/common/services/patient-insurance.service';
import { PatientProfileService } from 'src/app/modules/common/services/patient-profile.service';
import { InsuranceUpdateComponent } from 'src/app/modules/home/components/insurance-update/insurance-update.component';

@Component({
  selector: 'app-insurance-info',
  templateUrl: './insurance-info.component.html',
  styleUrls: ['./insurance-info.component.css']
})
export class InsuranceInfoComponent extends BaseComponent implements OnInit {
  patientModel: PatientProfileModel;
  companyModel: CompanyModel;
  @Output() onChange: EventEmitter<PatientInsuranceModel[]> = new EventEmitter();
  @ViewChild('insuranceUpdateModal') insuranceUpdateModal: InsuranceUpdateComponent;
  constructor(authService: AuthenticationService,
    private patientProfileService: PatientProfileService,
    public companyService: CompanyService,
    private patientInsuranceService: PatientInsuranceService) {
    super(authService);
  }

  ngOnInit(): void {
    this.getPatientProfileEntity();
    this.getCurrentCompanyInfo();
  }

  selectUseInsurance(value) {
    if (!value) {
      this.removeAllInsurance();
    }
  }

  addInsurance() {
    if (this.patientModel.PatientID) {
      var pm = new PatientInsuranceModel();
      pm.PatientID = this.patientModel.PatientID;
      this.insuranceUpdateModal.show(pm);
    }
  }

  changeInsurance(id) {
    if (id) {
      this.patientInsuranceService.Get(id).subscribe(r => {
        if (r) {
          this.insuranceUpdateModal.show(r);
        }
      });
    }
  }

  onCloseInsurance(event) {
    if (event) {
      this.patientInsuranceService.GetByPatientID(this.patientModel.PatientID).subscribe(result => {
        if (result) {
          this.patientModel.PatientInsurances = result;
          this.onChange.emit(result);
        }
      });
    }
  }

  removeAllInsurance() {
    if (this.patientModel.PatientInsurances?.length > 0) {
      this.patientInsuranceService.RemovedByPatientID(this.patientModel.PatientID).subscribe(r => {
        if (r) {
          this.patientInsuranceService.GetByPatientID(this.patientModel.PatientID).subscribe(result => {
            if (result) {
              this.patientModel.PatientInsurances = result;
              this.onChange.emit(result);
            }
          });
        }
      });
    }
  }

  removeItemInsurance(id) {
    this.patientInsuranceService.Delete(id).subscribe(r => {
      if (r) {
        this.patientInsuranceService.GetByPatientID(this.patientModel.PatientID).subscribe(result => {
          if (result) {
            this.patientModel.PatientInsurances = result;
            this.onChange.emit(result);
          }
        });
      }
    });
  }



  getPatientProfileEntity() {
    this.patientModel = new PatientProfileModel();
    this.patientProfileService.GetInsurances(this.currentUser.Id)
      .subscribe(r => {
        this.patientModel = r;
      });
  }

  getCurrentCompanyInfo() {
    this.companyModel = new CompanyModel();
    this.companyService.Get(this.currentUser.CompanyID).subscribe(r => {
      this.companyModel = r;
    });
  }
}