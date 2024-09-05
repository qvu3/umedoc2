import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/modules/base.component';
import { AppointmentModel } from 'src/app/modules/common/models/appointment.model';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';

@Component({
  selector: 'app-rai-credit-card-insurance-info',
  templateUrl: './rai-credit-card-insurance-info.component.html',
  styleUrls: ['./rai-credit-card-insurance-info.component.css']
})
export class RaiCreditCardInsuranceInfoComponent extends BaseComponent implements OnInit {
  id:string;
  model:AppointmentModel = new AppointmentModel();
  constructor(authService:AuthenticationService,
    private appointmentService:AppointmentService,
    private activeRouter:ActivatedRoute) { 
    super(authService);
    activeRouter.parent.params.subscribe(r => {
      this.id = r['{id}'];
      this.getEntity();
    })
  }

  ngOnInit(): void {
  }

  getEntity() {
    this.appointmentService.GetById(this.id).subscribe(r => {
      this.model = r;
    });
  }

}
