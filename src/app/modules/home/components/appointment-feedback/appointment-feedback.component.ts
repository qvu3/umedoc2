import { Component, OnInit } from '@angular/core';
import { EmailConfirmModel } from 'src/app/modules/common/models/email-confirm.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/modules/common/services/user.service';

@Component({
  selector: 'app-appointment-feedback',
  templateUrl: './appointment-feedback.component.html',
  styleUrls: ['./appointment-feedback.component.css']
})
export class AppointmentFeedbackComponent implements OnInit {
  model: EmailConfirmModel = null;
  appointmentID: string;
  constructor(private activeRoute: ActivatedRoute,
    private userService: UserService
  ) {
    activeRoute.queryParams.subscribe(r => {
      this.appointmentID = r["appointmentId"];
      if (this.appointmentID) {
        this.appointmentFeedback(this.appointmentID);
      }
    });
  }

  ngOnInit() {
  }

  appointmentFeedback(appointmentID) {
    this.userService.AppointmentFeedback(appointmentID).subscribe(r => {
      this.model = r;
    });
  }
}

