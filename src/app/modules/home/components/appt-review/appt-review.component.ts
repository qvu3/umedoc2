 import { Component, OnInit, SkipSelf } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
 import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { AppointmentModel } from 'src/app/modules/common/models/appointment.model';
 import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
 import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
 import { PrmcHub } from 'src/app/modules/common/services/prmc-hub';

@Component({
  selector: 'app-appt-review',
  templateUrl: './appt-review.component.html',
  styleUrls: ['./appt-review.component.css']
})
export class ApptReviewComponent implements OnInit {
  model: AppointmentModel = new AppointmentModel();
  id: string;
  token: string;
  localStream: MediaStream;
  isFirstRating: boolean = true;
  isSubmitting: boolean = false;
  saveRating: number = 0;
  saveReview: string = '';
  constructor(
    @SkipSelf() private prmcHub: PrmcHub,
    private appointmentService: AppointmentService,
    private dialog: CommonDialogService,
    private router: Router,
    private activeRoute: ActivatedRoute) {
    activeRoute.params.subscribe(r => {
      this.id = r["{id}"];
      if (this.id) {
        this.getEntity(this.id);
      } 
    });
  }

  ngOnInit(): void {
    this.isSubmitting = false;
  }


  getEntity(id) {
    this.appointmentService.GetByIdAllowAnonymous(id).subscribe(r => {
      if (r) {
        this.model = r;
        if (this.model.Rating && this.model.Rating > 0) {
          this.isFirstRating = false;
          this.saveRating = this.model.Rating;
          this.saveReview = this.model.Review;
        }
      }
    });
  }

  save() {
    this.isSubmitting = true;
    this.appointmentService.SaveAppointmentRating(this.model).subscribe(r => {
      if (r) {

        this.getEntity(this.id);
        this.isSubmitting = false;
        this.dialog.showToastrSuccess("Rating Appointment", MessageConstant.REQUEST_SUCCESS_CONST);
      } else {
        this.dialog.showToastrError("Rating Appointment", MessageConstant.FAILURE_REQUEST);
      }
    }, error => {
      this.dialog.showToastrError("Rating Appointment", error.error);
    });
  }

  rateOnGoogle() {
    window.open("https://g.page/r/CUvrZmYkQxrAEAg/review", "_blank");
  }

  rateOnFacebook() {
    window.open("https://www.facebook.com/umedoc/reviews/", "_blank");
  } 
}

