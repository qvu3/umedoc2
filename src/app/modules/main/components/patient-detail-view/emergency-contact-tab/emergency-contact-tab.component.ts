import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/modules/base.component';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { PatientProfileModel } from 'src/app/modules/common/models/patient-profile.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { PatientProfileService } from 'src/app/modules/common/services/patient-profile.service';
import { UtilityService } from 'src/app/modules/common/services/utility.service';

@Component({
  selector: 'app-emergency-contact-tab',
  templateUrl: './emergency-contact-tab.component.html',
  styleUrls: ['./emergency-contact-tab.component.css']
})
export class EmergencyContactTabComponent extends BaseComponent implements OnInit {
  model: PatientProfileModel = new PatientProfileModel();
  id: string;
  companyName: string; 
  IsSubmitting: boolean = false; 
  constructor(public authService: AuthenticationService,
    private patientProfileService: PatientProfileService, 
    private dialog: CommonDialogService,
    activeRouter: ActivatedRoute,
    private utilityService: UtilityService,
    private router: Router) {
    super(authService);
    activeRouter.parent.params.subscribe(r => {
      if (r && r['{id}']) {
        this.id = r['{id}'];
        this.getEntity(this.id);
      }
    });
  }

  ngOnInit() {
    
  }

  getEntity(id) {
    this.model = new PatientProfileModel();
    this.patientProfileService.GetPatientProfileInfo(id).subscribe(r => {
      this.model = r;
    });
  }
  save() {
    this.IsSubmitting = true;
    this.patientProfileService.UpdateEmergency(this.model).subscribe(r => {
      this.IsSubmitting = false;
      if (r) {
        
        this.dialog.showToastrSuccess('Patient Info', MessageConstant.REQUEST_SUCCESS_CONST);
      }
      else {
        this.dialog.showToastrError('Patient Info', MessageConstant.FAILURE_REQUEST);
      }
    }, error => {
      this.IsSubmitting = false;
      this.dialog.showToastrError('Patient Info', MessageConstant.FAILURE_REQUEST);
    })
  }

  cancel() {
    this.router.navigate(['/management/manage-patients']);
  }

}
