import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-appointment-payment',
  templateUrl: './appointment-payment.component.html',
  styleUrls: ['./appointment-payment.component.css']
})
export class AppointmentPaymentComponent implements OnInit {
  id: string;
  constructor(activateRouter: ActivatedRoute) {
    activateRouter.parent.params.subscribe(r => {
      if (r && r["{id}"]) {
        this.id = r["{id}"];
      }
    });
  }

  ngOnInit(): void {
  }

}
