import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientProfileService } from 'src/app/modules/common/services/patient-profile.service';
import { PatientAllergyService } from 'src/app/modules/common/services/patient-allergy.service';
import { PatientMedicationService } from 'src/app/modules/common/services/patient-medication.service';
import { PatientMedicalConditionService } from 'src/app/modules/common/services/patient-medical-condition.service';
import { PatientProfileModel } from 'src/app/modules/common/models/patient-profile.model';
import { PerferPharmacySearchComponent } from '../../perfer-pharmacy-search/perfer-pharmacy-search.component';
import { PatientAllergyModel, PatientMedicalConditionModel, PatientMedicationModel, PatientAllergyAssigmentModel, PatientMedicationAssignmentModel, PatientMedicalConditionAssignmentModel } from 'src/app/modules/common/models/patient-allergy.model';
import Global from 'src/app/Global';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { MessageConstant, NameExtension } from 'src/app/modules/common/constant/message.const';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { UtilityService } from 'src/app/modules/common/services/utility.service';
import { ProviderProfileService } from 'src/app/modules/common/services/provider-profile.service';
import { AllergyAssignmentModel } from 'src/app/modules/common/models/allergy-info.model';
import { NgForm } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-edit-patient-profile',
  templateUrl: './edit-patient-profile.component.html',
  styleUrls: ['./edit-patient-profile.component.css']
})
@Component({
  selector: 'app-patient-profile-request-appointment',
  templateUrl: './patient-profile-request-appointment.component.html',
  styleUrls: ['./patient-profile-request-appointment.component.css']
})
export class PatientProfileRequestAppointmentComponent extends BaseComponent implements OnInit, AfterViewInit {
  model: PatientProfileModel;
  group: string;
  companyName: string;
  us_statelist: any;
  IsSubmitting: boolean = false;
  @ViewChild('modal') modal: PerferPharmacySearchComponent;
  @Input() hideUser: boolean = true;
  @Input() IsUpdateProfile: boolean = false;
  @Input() patientUserID: string;
  listAllergys: Array<PatientAllergyModel> = new Array<PatientAllergyModel>();
  listMedicalConditions: Array<PatientMedicalConditionModel> = new Array<PatientMedicalConditionModel>();
  listMedications: Array<PatientMedicationModel> = new Array<PatientMedicationModel>();
  optionsInsurance: Options;
  InsuranceData: Array<Select2OptionData>;
  prefixes = NameExtension.prefixes;
  suffixes = NameExtension.suffixes;
  constructor(public authService: AuthenticationService,
    private patientProfileService: PatientProfileService,
    private patientAllergyService: PatientAllergyService,
    private patientMedicalConditionService: PatientMedicalConditionService,
    private patientMedicationService: PatientMedicationService,
    private dialog: CommonDialogService,
    private activeRouter: ActivatedRoute,
    private utilityService: UtilityService,
    private providerProfileService: ProviderProfileService,
    private router: Router) {
    super(authService);
    activeRouter.queryParams.subscribe(r => {
      if (r.group) {
        this.group = r.group;
      }
    });
  }

  ngOnInit() {
    this.getInsuranceList();
    this.getPatientAllergy();
    this.getPatientMedicalCondition();
    this.getPatientMedication();
    this.us_statelist = Global.US_StateList;
    if (this.patientUserID) {
      this.getEntity(this.patientUserID);
    } else {
      this.getEntity(this.currentUser.Id);
    } this.optionsInsurance = {
      width: 'auto',
      minimumInputLength: 1,
    } as Options;
  }


  getInsuranceList() {
    this.InsuranceData = new Array<Select2OptionData>();
    this.utilityService.GetInsuranceList().subscribe(r => {
      if (r) {
        var list = r.map(x => {
          return { id: x.InsuranceName, text: x.InsuranceName };
        });
        if (list) {
          this.InsuranceData = list;
        }
      }
    });
  }

  ngAfterViewInit() {
    if (this.group) {
      this.scrollToTopFocus(this.group);
    }
  }

  scrollToTopFocus(id: string) {
    $('html, body').animate({
      scrollTop: $("#" + id).offset().top
    }, 2000);
  }

  getEntity(id) {
    this.model = new PatientProfileModel();
    this.patientProfileService.GetIncludePatientUser(id).subscribe(r => {
      this.model = r;
      this.model.IsUpdateProfile = this.IsUpdateProfile;
      if (!this.model.InsuranceName) {
        this.model.InsuranceName = '';
      } 

      if (this.model.PatientUser ) {
        this.model.PatientUser.Prefix = this.model.PatientUser.Prefix??"";
        this.model.PatientUser.Suffix = this.model.PatientUser.Suffix??"";
        this.model.PatientUser.ProfilePicture =this.model.PatientUser.ProfilePicture?? "https://umedoc-prod.s3.amazonaws.com/RandomFiles/umedoc-defaultavatar.png";;
      }
      this.changeCheckAllergy(this.listAllergys, this.model.PatientAllergyAssignments);
      this.changeCheckMedicalCondition(this.listMedicalConditions, this.model.PatientMedicalConditionAssignments);
      this.changeCheckMedication(this.listMedications, this.model.PatientMedicationAssignments);
    });
  }

  checkOtherRequired(source) {
    if (source) {
      for (var i = 0; i < source.length; i++) {
        var item = source[i];
        if (item.IsChecked && item.IsOther) {
          return true;
        }
      }
    }
    return false;
  }

  changeCheckAllergy(source, list) {
    if (source && list) {
      source.forEach(item => {
        item.IsChecked = false;
        item.IsOther = item.AllergyName.trim() == 'Others';
        list.forEach(psa => {
          if (item.ID == psa.PatientAllergyID)
            item.IsChecked = true;
        });
      });
    }
  }

  changeAllergy(id) {
    var index = this.model.PatientAllergyAssignments.findIndex(c => c.PatientAllergyID == id);
    if (index >= 0) {
      this.model.PatientAllergyAssignments.splice(index, 1);
    }
    else {
      var psa = new PatientAllergyAssigmentModel();
      psa.PatientAllergyID = id;
      this.model.PatientAllergyAssignments.push(psa);
    }
    this.changeCheckAllergy(this.listAllergys, this.model.PatientAllergyAssignments);
  }

  changeCheckMedication(source, list) {
    if (source && list) {
      source.forEach(item => {
        item.IsChecked = false;
        item.IsOther = item.MedicationName.trim() == 'Others';
        list.forEach(psa => {
          if (item.ID == psa.PatientMedicationID)
            item.IsChecked = true;
        });
      });
    }
  }

  changeMedication(id) {
    var index = this.model.PatientMedicationAssignments.findIndex(c => c.PatientMedicationID == id);
    if (index >= 0) {
      this.model.PatientMedicationAssignments.splice(index, 1);
    }
    else {
      var psa = new PatientMedicationAssignmentModel();
      psa.PatientMedicationID = id;
      this.model.PatientMedicationAssignments.push(psa);
    }
    this.changeCheckMedication(this.listMedications, this.model.PatientMedicationAssignments);
  }


  changeCheckMedicalCondition(source, list) {
    if (source && list) {
      source.forEach(item => {
        item.IsChecked = false;
        item.IsOther = item.MedicalConditionName.trim() == 'Others';
        list.forEach(psa => {
          if (item.ID == psa.PatientMedicalConditionID)
            item.IsChecked = true;
        });
      });
    }
  }

  changeMedicationCondition(id) {
    var index = this.model.PatientMedicalConditionAssignments.findIndex(c => c.PatientMedicalConditionID == id);
    if (index >= 0) {
      this.model.PatientMedicalConditionAssignments.splice(index, 1);
    }
    else {
      var psa = new PatientMedicalConditionAssignmentModel();
      psa.PatientMedicalConditionID = id;
      this.model.PatientMedicalConditionAssignments.push(psa);
    }
    this.changeCheckMedicalCondition(this.listMedicalConditions, this.model.PatientMedicalConditionAssignments);
  }

  getPatientAllergy() {
    this.patientAllergyService.GetAll().subscribe(r => {
      if (r) {
        this.listAllergys = r;
        this.changeCheckAllergy(this.listAllergys, this.model.PatientAllergyAssignments);
      }
    })
  }

  getPatientMedicalCondition() {
    this.patientMedicalConditionService.GetAll().subscribe(r => {
      if (r) {
        this.listMedicalConditions = r;
        this.changeCheckMedicalCondition(this.listMedicalConditions, this.model.PatientMedicalConditionAssignments);
      }
    })
  }

  getPatientMedication() {
    this.patientMedicationService.GetAll().subscribe(r => {
      if (r) {
        this.listMedications = r;
        this.changeCheckMedication(this.listMedications, this.model.PatientMedicationAssignments);
      }
    })
  }

  getAddressMarker() {
    if (this.model && this.model.PreferredPharmacyAddress)
      return `${this.model.PreferredPharmacyAddress}, ${this.model.PreferredPharmacyCity}, ${this.model.PreferredPharmacyState} ${this.model.PreferredPharmacyZipCode}`;
    return '';
  }

  changeValueAllergy(event) {
    if (event) {
      let item = this.model.Allergies[event.index];
      if (item) {
        item.Code = event.data.Code;
        item.Name = event.data.Name;
        item.CodeType = event.data.CodeType;
        item.Reaction = event.data.Reaction;
        item.ReactionType = event.data.ReactionType;
        item.StatusType = event.data.StatusType;
      }
    }
  }

  addAllergy() {
    if (!this.model.Allergies) {
      this.model.Allergies = new Array<AllergyAssignmentModel>();
    }
    this.model.Allergies.push(new AllergyAssignmentModel());
  }

  checkExistAllergy(name) {
    if (name && this.model && this.model.Allergies) {
      return this.model.Allergies.filter(x => x.Name === name).length > 1;
    }
    return false;
  }

  deleteAlligery(index) {
    this.model.Allergies.splice(index, 1);
  }


  validateAllergy() {
    if (this.model && this.model.Allergies) {
      var arr = [];
      this.model.Allergies.forEach(x => {
        var index = arr.findIndex(y => y.Name == x.Name);
        if (index > -1) {
          let item = arr[index];
          if (item) {
            item.count += 1;
          }
        }
        else {
          arr.push({ Name: x.Name, count: 1 });
        }
      });
      if (arr) {
        return !(arr.filter(x => x.count > 1).length > 0);
      }
    }
    return true;
  }


  scrollToErrorField(f: NgForm) {
    if (f.form && f.form && f.form.controls) {
      var errorControlKey = null;
      var keys = Object.keys(f.form.controls);
      if (keys) {
        keys.forEach(key => {
          let control = f.form.controls[key];
          if (control && control.invalid) {
            errorControlKey = key;
            return;
          }
        });
      }
      if (errorControlKey) {
        var control = document.getElementsByName(errorControlKey);
        if (control) {
          $('html, body').animate({
            scrollTop: $(control).offset().top
          }, 200);
          this.dialog.showToastrError('Error', 'Update Failed');
        }
      }
    }
    return f.submitted;
  }


  save() {
    if (!this.validateAllergy()) {
      return;
    }
    this.IsSubmitting = true;
    this.patientProfileService.Save(this.model).subscribe(r => {
      if (r) {
        this.IsSubmitting = false;
        this.authService.UpdateCurrentInfo(this.model.PatientUser);

        if (this.hideUser) {
          this.dialog.showToastrSuccess('Patient Profile', MessageConstant.REQUEST_SUCCESS_CONST);
          if (this.patientUserID) {
            this.router.navigate(['/management/manage-patients']);
          } else {
            this.router.navigate(['/patient-profile']);
          }
        } else {
          this.getEntity(this.currentUser.Id);
        }
      }
      else {
        this.dialog.showToastrError('Patient Profile', MessageConstant.FAILURE_REQUEST);
      }
    }, error => {
      this.dialog.showToastrError('Patient Profile', MessageConstant.FAILURE_REQUEST);
    })
  }

  cancel() {
    if (this.patientUserID) {
      this.router.navigate(['/management/manage-patients']);
    } else {
      this.router.navigate(['/patient-profile']);
    }
  }

  showPerferPharmacy() {
    this.modal.model = this.model;
    this.modal.show();
  }

  hidePerferPharmacy() {
    this.modal.hide();
  }

  closePerfer(event) {
    if (event) {
      this.model.PreferredPharmacy = event.PreferredPharmacy;
      this.model.PreferredPharmacyAddress = event.PreferredPharmacyAddress;
      this.model.PreferredPharmacyLat = event.PreferredPharmacyLat;
      this.model.PreferredPharmacyLng = event.PreferredPharmacyLng;
      this.model.PreferredPharmacyPhoneNumber = event.PreferredPharmacyPhoneNumber;

      this.patientProfileService.UpdatePharmacy(this.model).subscribe(r => {
        if (r) {
          this.dialog.showToastrSuccess('Pharmacy', 'Your prefer pharmacy changed successfuly');
        }
      }, error => {
        this.dialog.showToastrError('Pharmacy', 'Cannot save your prefer pharmacy, please try again');
      });
    }
  }

  changeInsurance(event) {
    if (!this.model.InsuranceName || this.model.InsuranceName == '') {
      this.model.BeneficiaryNumber = '';
    }
  }

  @ViewChild('InsuranceName') select;

  resetInsuranceInfo(event) {
    this.model.InsuranceName = undefined;
    this.model.BeneficiaryNumber = undefined;
    this.model.InsuranceAddress = undefined;
    this.model.InsuranceGroupNumber = undefined;
    this.model.InsurancePhoneNumber = undefined;

    setTimeout(()=>{
      $(this.select.valueAccessor.element).select2().val('');
      $(this.select.valueAccessor.element).select2().val('');
    },200);
     
  }
}


