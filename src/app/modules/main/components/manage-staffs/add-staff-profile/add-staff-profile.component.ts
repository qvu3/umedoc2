import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { ProviderProfileModel } from 'src/app/modules/common/models/provider-profile.model';
import { ProviderProfileService } from 'src/app/modules/common/services/provider-profile.service';
import { ProviderDegreeService } from 'src/app/modules/common/services/provider-degree.service';
import { ProviderRoleService } from 'src/app/modules/common/services/provider-role.service';
import Global, { RoleConstants } from 'src/app/Global';
import { ProviderDegreeModel } from 'src/app/modules/common/models/provider-degree.model';
import { ProviderRoleModel } from 'src/app/modules/common/models/provider-role.model';
import { ProviderSpecialtyService } from 'src/app/modules/common/services/provider-specialty.service';
import { ProviderEducationService } from 'src/app/modules/common/services/provider-education.service';
import { ProviderSpecialtyModel } from 'src/app/modules/common/models/provider-specialty.model';
import { ProviderEducationModel } from 'src/app/modules/common/models/provider-education.model';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { ProviderSpecialtyAssignmentModel } from 'src/app/modules/common/models/provider-specialty-assignment.model';
import { Router, ActivatedRoute } from '@angular/router';
import UserModel from 'src/app/modules/common/models/user.model';
import { ProviderLicenseModel } from 'src/app/modules/common/models/provider-license.model';

@Component({
  selector: 'app-add-staff-profile',
  templateUrl: './add-staff-profile.component.html',
  styleUrls: ['./add-staff-profile.component.css']
})
export class AddStaffProfileComponent extends BaseComponent implements OnInit {
  model: ProviderProfileModel = new ProviderProfileModel();
  degrees: Array<ProviderDegreeModel> = new Array<ProviderDegreeModel>();
  specialities: Array<ProviderSpecialtyModel> = new Array<ProviderSpecialtyModel>();
  roles: Array<ProviderRoleModel> = new Array<ProviderRoleModel>();
  licensedIns: any;
  id: string;
  Submitting: boolean = false;
  constructor(authService: AuthenticationService,
    private service: ProviderProfileService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private providerDegreeService: ProviderDegreeService,
    private providerRoleService: ProviderRoleService,
    private providerSpecialityService: ProviderSpecialtyService,
    private providerEducationService: ProviderEducationService,
    private dialog: CommonDialogService,
    private cdChanged: ChangeDetectorRef
  ) {
    super(authService);
  }

  ngOnInit() {
    this.model = new ProviderProfileModel();
    this.model.ProviderUser = new UserModel();
    this.model.ProviderUser.State = "";
    this.licensedIns = Global.US_StateList;
    this.getProviderDegree();
    this.getProviderRole();
    this.getSpecialities();
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
  }

  addEdu() {
    this.model.Educations.push(new ProviderEducationModel());
    this.cdChanged.detectChanges();
  }

  deleteEdu(index) {
    this.model.Educations.splice(index, 1);
  }

  addLicense(){
    this.model.ProviderLicenses.push(new ProviderLicenseModel());
    this.cdChanged.detectChanges();
  }
  
  deleteLicense(index){
    this.model.ProviderLicenses.splice(index, 1);
  }

  save() {
    this.model.SpecialtyAssignments = [];
    this.specialities.forEach(c => {
      if (c.IsInactived) {
        var item = new ProviderSpecialtyAssignmentModel();
        item.ProviderSpecialtyID = c.ID;
        this.model.SpecialtyAssignments.push(item);
      }
    });

    this.Submitting = true;
    this.service.SaveStaff(this.model).subscribe(r => {
      if (r) {
        this.dialog.showToastrSuccess('Add Staff Profile', MessageConstant.ADD_SUCCESS_CONST);
        this.router.navigate(['/management/manage-staffs']);
      }
      else {
        this.dialog.showToastrError('Add Staff Profile', MessageConstant.FAILURE_REQUEST);
      }

      this.Submitting = false;
    }, error => {
      this.dialog.showToastrError('Add Staff Profile', error.error);
    });
  }
}
