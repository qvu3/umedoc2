import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/modules/base.component';
import { VaccineApptModel } from 'src/app/modules/common/models/vaccin-appt.model';
import { VaccineScreeningAnswerModel } from 'src/app/modules/common/models/vaccine-screening-anwser.model';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';

@Component({
  selector: 'app-vaccine-appointment-detail',
  templateUrl: './vaccine-appointment-detail.component.html',
  styleUrls: ['./vaccine-appointment-detail.component.css']
})
export class VaccineAppointmentDetailComponent extends BaseComponent implements OnInit {
  model: VaccineApptModel = new VaccineApptModel();
  id: string;
  constructor(authService: AuthenticationService,
    private appointmentService: AppointmentService,
    private router: Router,
    private dialog: CommonDialogService,
    private activeRouter: ActivatedRoute) {
    super(authService);
    activeRouter.params.subscribe(r => {
      if (r && r['id']) {
        this.id = r['id'];
        this.getEntity(this.id);
      }
      else {
        this.dialog.showSwalWarningAlert('Vaccine Appt Detail', 'URL is invalid, please check and try again');
        this.router.navigate(['/management/vaccine-appts']);
      }
    });
  }

  getEntity(id) {
    this.appointmentService.GetIncludeVaccineScheduleApptById(id).subscribe(r => {
      this.model = r;
    });
  }

  ngOnInit(): void {
  }

}
