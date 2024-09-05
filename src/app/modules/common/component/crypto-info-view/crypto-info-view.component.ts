import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { CoinBasseChargeInfo } from '../../models/coin-base-info.model';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-crypto-info-view',
  templateUrl: './crypto-info-view.component.html',
  styleUrls: ['./crypto-info-view.component.css']
})
export class CryptoInfoViewComponent implements OnInit , AfterViewInit {
  @Input() appointmentId: string;
  model: CoinBasseChargeInfo = new CoinBasseChargeInfo();
  constructor(private appointmentService: AppointmentService) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.getCoinBaseInfo();
  }

  getCoinBaseInfo() {
    if (this.appointmentId){
      this.appointmentService.GetCoinBaseInfo(this.appointmentId).subscribe(r => {
        this.model = r;
      });
    }
  }

}
