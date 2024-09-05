import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { PatientChildModalComponent } from 'src/app/modules/common/component/patient-child-modal/patient-child-modal.component';
import { PatientProfileModel } from 'src/app/modules/common/models/patient-profile.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { PatientProfileService } from 'src/app/modules/common/services/patient-profile.service';

@Component({
  selector: 'app-patient-children',
  templateUrl: './patient-children.component.html',
  styleUrls: ['./patient-children.component.css']
})
export class PatientChildrenComponent extends BaseComponent implements OnInit {
  list: PatientProfileModel[] = [];
  @ViewChild('modal') modal:PatientChildModalComponent;
  constructor(authService: AuthenticationService,
    private patientProfileService: PatientProfileService) {
    super(authService);
  }

  ngOnInit(): void {
    this.getChildren();
  }

  getChildren() {
    this.patientProfileService.GetChildren(this.currentUser.Id).subscribe(r => {
      this.list = r;
    });
  }

  addChild(){
    this.modal.show(null, this.currentUser.Id);
  }

}
