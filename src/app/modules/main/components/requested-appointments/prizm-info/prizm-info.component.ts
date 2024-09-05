import { DatePipe } from '@angular/common';
import { Prizm_IntakeModel } from './../../../../common/models/prizm-intake.model';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-prizm-info',
  templateUrl: './prizm-info.component.html',
  styleUrls: ['./prizm-info.component.css'],
  providers:[DatePipe]
})
export class PrizmInfoComponent implements OnInit, OnChanges {
  @Input() appointmentId: string;
  model: Prizm_IntakeModel = new Prizm_IntakeModel();
  constructor(private appointmentService: AppointmentService) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.appointmentId?.currentValue && changes.appointmentId.currentValue != changes.appointmentId.previousValue) {
      this.getEntity(changes.appointmentId.currentValue);
    }
  }

  ngOnInit(): void {
    this.getEntity(this.appointmentId);
  }

  getEntity(appointmentId) {
    if (appointmentId) {
      this.appointmentService.GetPrizmInfo(appointmentId).subscribe(r => {
        this.model = r;
      });
    }
  }

}
