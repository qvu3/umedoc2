import { AfterViewInit } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { PatientProfileService } from 'src/app/modules/common/services/patient-profile.service';
import { CardInfoComponent } from '../../card-info/card-info.component';
import { PatientProfileModel } from 'src/app/modules/common/models/patient-profile.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-credit-card-new',
  templateUrl: './credit-card-new.component.html',
  styleUrls: ['./credit-card-new.component.css']
})
export class CreditCardNewComponent extends BaseComponent implements OnInit , AfterViewInit {
  @ViewChild('cardInfoModal') cardInfoModal: CardInfoComponent;
  model: PatientProfileModel = new PatientProfileModel();
  patientId:string;
  isShowPopup  = false;
  constructor(authService:AuthenticationService,
    private activeRouter:ActivatedRoute,
    private patientProfileService:PatientProfileService,
    private router: Router) {
    super(authService);

    this.patientId = this.currentUser.Id;
    activeRouter.parent.params.subscribe(r=>{
      this.patientId = r && r['{id}'] ? r['{id}']:this.currentUser.Id;
    });
    activeRouter.queryParams.subscribe(r=>{
      this.isShowPopup = r && r.show == 'popup';
    })
  }

  ngOnInit(): void {
    this.getEntity();
  }

  ngAfterViewInit(): void {
    if(this.isShowPopup){
      this.changeCreditCard();
    }
  }

  changeCreditCard() {
    if (this.patientId)
      this.cardInfoModal.show(this.patientId);
  }

  closeCardInfo(){
    this.router.navigate(['/']);
  }

  getEntity() {
    if(!this.patientId) return ;
    this.patientProfileService.GetIncludePatientUser(this.patientId).subscribe(r => {
      if (r) {
        this.model = r;
      }
    });
  }
}
