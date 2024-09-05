import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { WeightLossPrecheck } from './../../../../common/models/weight-loss-precheck.model';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-weight-loss-reason',
  templateUrl: './weight-loss-reason.component.html',
  styleUrls: ['./weight-loss-reason.component.css']
})
export class WeightLossReasonComponent implements OnInit {
  @Input() model: WeightLossPrecheck;
  isNotCandidate: boolean = false;
  @Output() onValidSumited: EventEmitter<any> = new EventEmitter();
  constructor(private dialog: CommonDialogService) {

  }

  ngOnInit(): void {

  }
  resetAll() {
    this.model.BMI = undefined;
    this.model.BloodPressure = undefined;
    this.model.Cancer = undefined;
    this.model.isAgreed = undefined;
    this.model.SemaglutideAllergy = undefined;
    this.model.Pregnant = undefined;
    this.model.Suicide = undefined;
    this.model.KidneyDisease = undefined;
    this.model.Pancreatitis = undefined;
    this.model.Diabetic = undefined;
    this.onValidSumited.emit(this.model);
    this.isNotCandidate = false;
  }
  changeBMI() {
    this.resetAll();
    if (this.model && this.model.Weight) {
      const feet = this.model.HeightFeet ?? 0;
      this.model.Height = feet * 12.0 + (this.model.HeightInches ?? 0) * 1.0;
      if (this.model.Weight && this.model.Weight > 0 && this.model.Height && this.model.Height > 0) {
        const bmi = this.calculateBMI(this.model.Weight, this.model.Height);
        this.model.BMI = bmi;
        if (bmi < 27) {
          this.isNotCandidate = true;
          this.onValidSumited.emit(this.model);
          return;
        }
      }
    }
  }

  checkAnwser(index: number, value: boolean) {
    if (index == 10) {
      this.model.isAgreed = value;
      this.onValidSumited.emit(this.model);
      return;
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

    return Math.round(parseFloat(f_bmi + "." + diff));
  }


}
