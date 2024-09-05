import { Component, OnInit, Input } from '@angular/core';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { AppointmentCriteria } from 'src/app/modules/common/criterias/appointment.criteria';
import { BaseComponent } from 'src/app/modules/base.component';
import { DatePipe } from '@angular/common'; 
import { ActivatedRoute } from '@angular/router';
import { AppointmentHistoryInfoModel } from 'src/app/modules/common/models/appointment-history-info.model';

@Component({
  selector: 'app-appointment-history-info',
  templateUrl: './appointment-history-info.component.html',
  styleUrls: ['./appointment-history-info.component.css'],
  providers: [DatePipe]
})
export class AppointmentHistoryInfoComponent extends BaseComponent implements OnInit {
  @Input() id: string;
  @Input() patientID: string;
  @Input() isPatientView: boolean;
  criteria: AppointmentCriteria = new AppointmentCriteria();
  list: Array<AppointmentHistoryInfoModel> = new Array<AppointmentHistoryInfoModel>();
  @Input() isShowRefresh: boolean = false;
  constructor(public authService: AuthenticationService,
    public datePipe: DatePipe,
    activateRouter: ActivatedRoute,
    private appointmentService: AppointmentService) {
    super(authService);
    activateRouter.parent.params.subscribe(r => {
      if (r && r["{id}"]) {
        this.id = r["{id}"];
      }
    });
  }

  ngOnInit() {
    if (this.id || this.patientID) {
      this.criteria.PatientID = this.patientID;
      if (!this.isPatientView) {
        this.criteria.ID = this.id;
      }
      this.criteria.ItemPerPage = 1000;
      this.getHistoryAppointment();
    }
  }

  getHistoryAppointment() {
    this.appointmentService.SearchAppointmentHistoryInfo(this.criteria)
      .subscribe(r => {
        if (r) {
          this.list = r.Data;
        }
      })
  }
}



