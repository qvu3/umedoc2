import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HealthKitDataModel } from 'src/app/modules/common/models/health-kit-data.model';
import { UserService } from 'src/app/modules/common/services/user.service';

@Component({
  selector: 'app-health-data-card',
  templateUrl: './health-data-card.component.html',
  styleUrls: ['./health-data-card.component.css']
})
export class HealthDataCardComponent implements OnInit, OnChanges {
  list: Array<HealthKitDataModel> = [];
  @Input() patientId: string;
  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
  }

  ngOnChanges(params: SimpleChanges) {
    if (params && params.patientId && params.patientId.currentValue && params.patientId.currentValue != params.patientId.previousValue) {
      this.getData(params.patientId.currentValue);
    }
  }

  getData(patientId) {
    if (patientId) {
      this.userService.GetHealthLastest(patientId).subscribe(r => {
        this.list = r;
      });
    }
  }

}
