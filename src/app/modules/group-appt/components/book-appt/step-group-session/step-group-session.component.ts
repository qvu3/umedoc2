import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../../../../../modules/base.component';
import { GroupApptPatientModel } from '../../../../../modules/common/models/group-appt-patient.model';
import { GroupApptModel } from '../../../../../modules/common/models/group-appt.model';
import { AuthenticationService } from '../../../../../modules/common/services/authentication.service';
import { CommonDialogService } from '../../../../../modules/common/services/dialog.service';
import { GroupApptService } from '../../../../../modules/common/services/group-appt.service';
import { ProviderProfileComponent } from '../../../../../modules/home/components/request-appointment/provider-profile/provider-profile.component';

@Component({
  selector: 'app-step-group-session',
  templateUrl: './step-group-session.component.html',
  styleUrls: ['./step-group-session.component.css']
})
export class StepGroupSessionComponent extends BaseComponent implements OnInit {
  model: GroupApptPatientModel = new GroupApptPatientModel();
  providers: Array<GroupApptModel> = new Array<GroupApptModel>();
  @ViewChild('modal')
  modal!: ProviderProfileComponent;
  constructor(public override authenticationService: AuthenticationService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private dialog: CommonDialogService,
    private groupApptService: GroupApptService) {
    super(authenticationService);
    this.model = this.authenticationService.groupApptPatient || new GroupApptPatientModel();
    this.model.PatientID = this.currentUser.Id;
  }

  override ngOnInit(): void {
    this.getAllGroupAppts();
  }

  getAllGroupAppts() {
    this.groupApptService.GetAllActiveGroupAppt().subscribe(r => {
      if (r) {
        this.providers = r;
      }
    });
  }

  selectDoctor(provider: GroupApptModel) {
    this.model.ProviderID = provider.ProviderID;
    this.model.GroupApptID = provider.ID;
    this.model.GroupAppt = provider;
    this.model.IsBooked = provider.IsBooked;
  }

  viewProfile(providerID: any) {
    this.modal.show(providerID);
  }

  save() {
    if (this.model.IsBooked) {
      this.dialog.showSwalErrorAlert("Group Session", "You alreadly booked this group session. Please choose another one.");
      return;
    }

    this.authenticationService.groupApptPatient = Object.assign({}, this.model);
    this.router.navigate(['../appt-payment'], { relativeTo: this.activeRouter });
  }

  prev(){
    this.router.navigate(['../appt-group-insurance'], { relativeTo: this.activeRouter });
  }
}
