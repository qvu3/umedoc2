import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Global, { RoleConstants } from 'src/app/Global';
import { BaseComponent } from 'src/app/modules/base.component';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { AppointmentImageModel } from 'src/app/modules/common/models/appointment-image.model';
import { ProviderBadgeModel } from 'src/app/modules/common/models/provider-badge.model';
import { ProviderDegreeModel } from 'src/app/modules/common/models/provider-degree.model';
import { ProviderEducationModel } from 'src/app/modules/common/models/provider-education.model';
import { ProviderLanguageModel } from 'src/app/modules/common/models/provider-language.model';
import { ProviderLicenseModel } from 'src/app/modules/common/models/provider-license.model';
import { ProviderProfileModel } from 'src/app/modules/common/models/provider-profile.model';
import { ProviderRoleModel } from 'src/app/modules/common/models/provider-role.model';
import { ProviderSpecialtyAssignmentModel } from 'src/app/modules/common/models/provider-specialty-assignment.model';
import { ProviderSpecialtyModel } from 'src/app/modules/common/models/provider-specialty.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { ProviderDegreeService } from 'src/app/modules/common/services/provider-degree.service';
import { ProviderProfileService } from 'src/app/modules/common/services/provider-profile.service';
import { ProviderRoleService } from 'src/app/modules/common/services/provider-role.service';
import { ProviderSpecialtyService } from 'src/app/modules/common/services/provider-specialty.service';

@Component({
  selector: 'app-provider-medical-profile',
  templateUrl: './provider-medical-profile.component.html',
  styleUrls: ['./provider-medical-profile.component.css']
})
export class ProviderMedicalProfileComponent extends BaseComponent implements OnInit {
  model: ProviderProfileModel = new ProviderProfileModel();
  degrees: Array<ProviderDegreeModel> = new Array<ProviderDegreeModel>();
  specialities: Array<ProviderSpecialtyModel> = new Array<ProviderSpecialtyModel>();

  roles: Array<ProviderRoleModel> = new Array<ProviderRoleModel>();
  licensedIns: any;
  Submitting: boolean = false;
  userId: string;
  isStaff: boolean = false;
  isUploading: boolean = false;
  isValidProviderLanguages: boolean = true;
  isValidDuplicateProviderLanguages: boolean = true;
  constructor(authService: AuthenticationService,
    private service: ProviderProfileService,
    private router: Router,
    private providerDegreeService: ProviderDegreeService,
    private providerRoleService: ProviderRoleService,
    private providerSpecialityService: ProviderSpecialtyService,
    private dialog: CommonDialogService,
    private cdChanged: ChangeDetectorRef,
    private activeRouter: ActivatedRoute
  ) {
    super(authService);
    this.licensedIns = Global.US_StateList;
    activeRouter.parent.params.subscribe(r => {
      if (r && r['{id}']) {
        this.isStaff = true;
        this.userId = r['{id}'];
      }
      else {
        this.userId = this.currentUser.Id;
      }
    });
  }

  ngOnInit() {
    this.getEntity(this.userId);
    if (this.currentUser.Role == RoleConstants.Provider || this.currentUser.Role == RoleConstants.CompanyAdmin || this.currentUser.Role == RoleConstants.SpecialAdmin) {
      this.getProviderDegree();
      this.getProviderRole();
      this.getSpecialities();
    }
  }

  getSpecialities() {
    this.providerSpecialityService.GetAll().subscribe(r => {
      this.specialities = r;
      if (this.model && this.model.SpecialtyAssignments && this.model.SpecialtyAssignments.length > 0) {
        this.specialities.forEach(c => {
          var index = this.model.SpecialtyAssignments.findIndex(d => d.ProviderSpecialtyID == c.ID);
          c.IsInactived = index >= 0;
        });
      }
    })
  }

  getProviderDegree() {
    this.providerDegreeService.GetAll().subscribe(r => {
      this.degrees = r;
    })
  }

  getProviderRole() {
    this.providerRoleService.GetAll().subscribe(r => {
      this.roles = r;
    })
  }

  getEntity(id) {
    this.model = new ProviderProfileModel();
    this.service.GetIncludeById(id).subscribe(r => {
      if (r)
        this.model = r;
      if (this.model && this.model.ProviderUser) {
        this.model.ProviderUser.ProfilePicture = this.model.ProviderUser.ProfilePicture ?? "https://umedoc-prod.s3.amazonaws.com/RandomFiles/umedoc-defaultavatar.png";
        this.model.ProviderUser.Prefix = this.model.ProviderUser.Prefix ?? "";
        this.model.ProviderUser.Suffix = this.model.ProviderUser.Suffix ?? "";
      }
      if (this.model && this.model.SpecialtyAssignments && this.model.SpecialtyAssignments.length > 0) {
        this.specialities.forEach(c => {
          var index = this.model.SpecialtyAssignments.findIndex(d => d.ProviderSpecialtyID == c.ID);
          c.IsInactived = index >= 0;
        });
      }
    });
  }

  addEdu() {
    this.model.Educations.push(new ProviderEducationModel());
    this.cdChanged.detectChanges();
  }


  deleteEdu(index) {
    this.model.Educations.splice(index, 1);
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
    this.isValidProviderLanguages = true;
    if (!this.model.ProviderLanguages || (this.model.ProviderLanguages && this.model.ProviderLanguages.length == 0)) {
      this.isValidProviderLanguages = false;
      return;
    }

    this.isValidDuplicateProviderLanguages = true;
    if (!this.checkValidateLanguage()) {
      this.isValidDuplicateProviderLanguages = false;
      return;
    }

    this.model.SpecialtyAssignments = [];
    this.specialities.forEach(c => {
      if (c.IsInactived) {
        var item = new ProviderSpecialtyAssignmentModel();
        item.ProviderSpecialtyID = c.ID;
        this.model.SpecialtyAssignments.push(item);
      }
    });
    this.Submitting = true;
    this.service.UpdateTransaction(this.model).subscribe(r => {
      if (r) {
        this.dialog.showToastrSuccess('Edit My Profile', MessageConstant.EDIT_SCCCESS_CONST);
      }
      else {
        this.dialog.showToastrError('Edit My Profile', MessageConstant.FAILURE_REQUEST);
      }

      this.Submitting = false;
    }, error => {
      this.dialog.showToastrError('Edit My Profile', MessageConstant.FAILURE_REQUEST);
    });
  }

  cancel() {
    if (this.isStaff) {
      this.router.navigate(['/management/manage-staffs']);
    }
    else {
      this.router.navigate(['/management/my-profile']);
    }
  }


  uploadStatus(isCompleted) {
    this.isUploading = !isCompleted;
  }

  uploaded(url_image) {
    if (url_image) {
      if (this.model.ProviderBadges == null) {
        this.model.ProviderBadges = [];
      }

      var badge = new ProviderBadgeModel();
      badge.ImageUrl = url_image;
      badge.ProviderProfileID = this.model.ID;

      this.model.ProviderBadges.push(badge);
      this.cdChanged.detectChanges();
    }
  }

  deleteBadge(index) {
    this.model.ProviderBadges.splice(index, 1);
  }


  addLanguage() {
    this.model.ProviderLanguages.push(new ProviderLanguageModel());
    if (this.model.ProviderLanguages && this.model.ProviderLanguages.length > 0) {
      this.isValidProviderLanguages = true;
    } else {
      this.isValidProviderLanguages = false;
    }
    this.cdChanged.detectChanges();
  }


  deleteLanguage(index) {
    this.model.ProviderLanguages.splice(index, 1);
    if (this.model.ProviderLanguages && this.model.ProviderLanguages.length > 0) {
      this.isValidProviderLanguages = true;
    } else {
      this.isValidProviderLanguages = false;
    }
  }

  checkValidateLanguage() {
    if (this.model.ProviderLanguages.length > 0) {
      const uniqueValues = new Set(this.model.ProviderLanguages.map(v => v.Language));
      if (uniqueValues.size < this.model.ProviderLanguages.length) {
        return false;
      }
    }

    return true;
  }
}
