import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { environment } from 'src/environments/environment';
import { AppointmentService } from '../../services/appointment.service';
import { AuthenticationService } from '../../services/authentication.service';
import { DomSanitizer } from "@angular/platform-browser";
@Component({
  selector: 'app-submission-jf-patient',
  templateUrl: './submission-jf-patient.component.html',
  styleUrls: ['./submission-jf-patient.component.css']
})
export class SubmissionJfPatientComponent extends BaseComponent implements AfterViewInit {
  @Input() submissionId: string;
  @ViewChild('submissionFrame') submissionFrame:ElementRef;
  html: any;
  constructor(authService: AuthenticationService, private appointmentService: AppointmentService,
    private sanitized: DomSanitizer) {
    super(authService);
  }

  ngAfterViewInit(): void {
    this.getViewSubmission();
  }



  getViewSubmission() {
    this.appointmentService.GetViewSubmission(this.submissionId).subscribe(r => {
      var iframe = this.submissionFrame.nativeElement;
      var iframedoc = iframe.contentDocument || iframe.contentWindow.document;
      iframedoc.body.innerHTML =  r; 
    });
  }

}
