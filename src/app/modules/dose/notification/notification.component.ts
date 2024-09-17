import { Component, OnInit } from '@angular/core';
import { DoseTokenInfoModel } from '../../common/models/allergy-info.model';
import Global from '../../../Global';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { PatientProfileService } from '../../common/services/patient-profile.service'; 

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  patientid!: number;
  url: any;
  constructor(activeRouter: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private patientProfileService: PatientProfileService,
    router: Router) {
    this.getTokenInfo();
  }

  ngOnInit(): void {
  }

  getTokenInfo() {
    this.url = null;
    this.patientProfileService.GetDoseTokenInfo().subscribe((r: DoseTokenInfoModel) => {
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
        `${Global.DoseUrl}?
        &SingleSignOnClinicId=${r.ClinicId}
        &SingleSignOnUserId=${r.UserId}
        &SingleSignOnPhraseLength=32
        &SingleSignOnCode=${r.ClinicEncrypted}
        &SingleSignOnUserIdVerify=${r.UserEncrypted}
        &RefillsErrors=1`);
    });
  }

}

