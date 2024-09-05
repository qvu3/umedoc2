import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/modules/base.component';
import { AppointmentModel } from 'src/app/modules/common/models/appointment.model';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';

@Component({
  selector: 'app-rainfo-personal-info',
  templateUrl: './rainfo-personal-info.component.html',
  styleUrls: ['./rainfo-personal-info.component.css']
})
export class RainfoPersonalInfoComponent extends BaseComponent implements OnInit {
  id:string;
  model:AppointmentModel = new AppointmentModel();
  destination:string='';
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

  convertToFeets(height?: number){
    if(height){
      const feets = Math.floor(height/12);
      const inches = height%12;

      return `${feets>0? feets.toFixed(1)+ ' feets ': ''}${inches>0? inches.toFixed(1) + ' inches':''}`;
    }
  }
}
