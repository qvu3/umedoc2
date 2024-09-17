import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientProfileService } from '../../common/services/patient-profile.service';
import Global from '../../../Global';
import { DoseTokenInfoModel } from '../../common/models/allergy-info.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dose-view',
  templateUrl: './dose-view.component.html',
  styleUrls: ['./dose-view.component.css']
})
export class DoseViewComponent implements OnInit {
  patientid!: number;
  url: any;
  constructor(activeRouter: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private patientProfileService: PatientProfileService,
    router: Router) {
    activeRouter.params.subscribe(r => {
      if (r && r['patientid']) {
        this.patientid = r['patientid'];
        this.getTokenInfo();
      }
      else {
        router.navigate(['/']);
      }
    });
  }

  ngOnInit(): void {
  }

  getTokenInfo() {
    this.url = null;
    this.patientProfileService.GetDoseTokenInfo().subscribe((r: DoseTokenInfoModel) => {
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(`${Global.DoseUrl}?
      &SingleSignOnClinicId=${r.ClinicId}
      &SingleSignOnUserId=${r.UserId}&PatientId=${this.patientid}&SingleSignOnPhraseLength=32
      &SingleSignOnCode=${r.ClinicEncrypted}&SingleSignOnUserIdVerify=${r.UserEncrypted}`);
    });
  }

}
