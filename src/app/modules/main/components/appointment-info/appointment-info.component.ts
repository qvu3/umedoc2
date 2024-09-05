import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { AppointmentModel } from 'src/app/modules/common/models/appointment.model';
import { PatientProfileModel } from 'src/app/modules/common/models/patient-profile.model';
import { AppointmentStatusModel } from 'src/app/modules/common/models/appointment-status.model';
import { AppointmentReasonModel } from 'src/app/modules/common/models/appointment-reason.model';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { AppointmentStatusService } from 'src/app/modules/common/services/appointment-status.service';
import { AppointmentReasonService } from 'src/app/modules/common/services/appointment-reason.service';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-appointment-info',
  templateUrl: './appointment-info.component.html',
  styleUrls: ['./appointment-info.component.css']
})
export class AppointmentInfoComponent extends BaseComponent implements OnInit {
  model: AppointmentModel = new AppointmentModel();
  patientUserModel: PatientProfileModel = new PatientProfileModel();
  appointmentStatusList: AppointmentStatusModel[];
  listReasons: Array<AppointmentReasonModel> = new Array<AppointmentReasonModel>();
  @Input() id: string;
  constructor(private service: AppointmentService,
    private dialog: CommonDialogService,
    private router: Router,
    activateRouter: ActivatedRoute,
    private appointmentStatusService: AppointmentStatusService,
    private appointmentReasonService: AppointmentReasonService,
    authService: AuthenticationService) {
    super(authService);
    activateRouter.parent.params.subscribe(r => {
      if (r && r["{id}"]) {
        this.id = r["{id}"];
      }
    });
  }

  ngOnInit() {
    this.getAppointmentStatusList();
    this.getEntity(this.id);
    this.getAppointmentReason();
  }

  getAppointmentStatusList() {
    this.appointmentStatusService.GetAll().subscribe(result => {
      if (result) {
        this.appointmentStatusList = result;
      }
    }, error => {
      this.dialog.showSwalErrorAlert('Error', error.error);
    });
  }


  getEntity(id) {
    this.service.GetById(id).subscribe(result => {
      if (result) {
        this.model = result;
        this.changeReason(this.listReasons, this.model.AppointmentReasonList);
      } else {
        this.router.navigateByUrl(`/auth/patient-signin`);
      }
    });
  }

  getAppointmentReason() {
    this.appointmentReasonService.GetAll().subscribe(r => {
      if (r) {
        this.listReasons = r;
        this.changeReason(this.listReasons, this.model.AppointmentReasonList);
      }
    })
  }

  changeReason(source, list) {
    if (source && list) {
      source.forEach(item => {
        item.IsChecked = false;
        list.forEach(psa => {
          if (item.ID == psa.AppointmentReasonID)
            item.IsChecked = true;
        });
      });
    }
  }

  calculateBMI(lbs, ins) {
    const h2 = ins * ins;
    let bmi = lbs / h2 * 703;
    let f_bmi = Math.floor(bmi);
    let diff = bmi - f_bmi;
    diff = diff * 10;
    diff = Math.round(diff);
    if (diff == 10) {
      f_bmi += 1;
      diff = 0;
    }

    return f_bmi + "." + diff;
  }

  convertToFeets(height?: number) {
    if (height) {
      const feets = Math.floor(height / 12);
      const inches = height % 12;

      return `${feets > 0 ? feets.toFixed(1) + ' feets ' : ''}${inches > 0 ? inches.toFixed(1) + ' inches' : ''}`;
    }
  }
}
