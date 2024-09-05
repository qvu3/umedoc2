import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/modules/base.component';
import { PatientChildModalComponent } from 'src/app/modules/common/component/patient-child-modal/patient-child-modal.component';
import { PatientProfileModel } from 'src/app/modules/common/models/patient-profile.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { PatientProfileService } from 'src/app/modules/common/services/patient-profile.service';

@Component({
  selector: 'app-patient-children-view',
  templateUrl: './patient-children-view.component.html',
  styleUrls: ['./patient-children-view.component.css']
})
export class PatientChildrenViewComponent extends BaseComponent implements OnInit {
  list: PatientProfileModel[] = [];
  @ViewChild('modal') modal: PatientChildModalComponent;
  patientId: string;
  constructor(authService: AuthenticationService,
    activeRouter: ActivatedRoute,
    private patientProfileService: PatientProfileService) {
    super(authService);
    activeRouter.parent.params.subscribe(r => {
      if (r['{id}']) {
        this.patientId = r['{id}'];
      }
    });
  }

  ngOnInit(): void {
    this.getChildren();
  }

  getChildren() {
    if (!this.patientId) return;
    this.patientProfileService.GetChildren(this.patientId).subscribe(r => {
      this.list = r;
    });
  }

  addChild() {
    if(!this.patientId) return;
    this.modal.show(null, this.patientId);
  }

}