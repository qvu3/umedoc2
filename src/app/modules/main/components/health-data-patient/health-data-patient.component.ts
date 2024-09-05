import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';


import { ModalDirective } from 'ngx-bootstrap';
import { HealthDataSearchModel, HealthKitDataLine } from 'src/app/modules/common/models/health-data-search';

import { UserService } from 'src/app/modules/common/services/user.service';
declare var moment: any;
declare var Chart: any;
@Component({
  selector: 'app-health-data-patient',
  templateUrl: './health-data-patient.component.html',
  styleUrls: ['./health-data-patient.component.css'],
  providers: [DatePipe]
})
export class HealthDataPatientComponent implements AfterViewInit, OnChanges {
  @ViewChild('childModal') modal: ModalDirective;
  @Input() patientID: string;
  @ViewChild('columnStacked') columnStackedEl: ElementRef;
  criteria: HealthDataSearchModel = new HealthDataSearchModel();
  chart: any;
  dataSource: HealthKitDataLine;
  constructor(private datePipe: DatePipe,
    private userService: UserService) {
  }

  ngOnChanges(params: SimpleChanges): void {
    if (params && params.patientID && params.patientID.currentValue && params.patientID.currentValue != params.patientID.previousValue) {
      this.criteria.patientId = params.PatientID.currentValue;
    }
  }

  register() {

    // Chart Options
    var chartOptions = {
      title: {
        display: false,
      },
      tooltips: {
        mode: 'index'
      },
      responsive: true,
      scales: {
        xAxes: [{
          stacked: true,
        }],
        yAxes: [{
          stacked: true,
        }]
      },
      ticks: {
        maxRotation: 90,
        minRotation: 90,
      }
    };

    // Chart Data
    var chartData = {
      labels: [],
      datasets: []
    };

    var config = {
      type: 'line',
      options: chartOptions,
      data: chartData
    };

    // Create the chart
    this.chart = new Chart($(this.columnStackedEl.nativeElement), config);
  }

  ngAfterViewInit(): void {
    this.register();
  }

  search() {
    this.userService.SearchHealthDataLine(this.criteria).subscribe(r => {
      this.dataSource = r;
      this.updateDataset();
    });
  }

  getRandomColor() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  updateDataset() {
    if (this.chart && this.dataSource) {

      this.chart.data.labels = this.dataSource.Labels;
      this.chart.data.datasets = [];
      this.dataSource.Lines.forEach(ds => {
        var color = this.getRandomColor();
        var dataset = {
          label: ds.GroupName,
          data: ds.DataLines,
          fill: false,
          borderColor: color,
          pointBorderColor: color,
          pointBackgroundColor: "#FFF",
          pointBorderWidth: 2,
          pointHoverBorderWidth: 2,
          pointRadius: 4,
        };

        this.chart.data.datasets.push(dataset);
      });

      this.chart.update();
    }
  }


  show(patientID) {
    this.patientID = patientID;
    this.criteria = new HealthDataSearchModel();
    this.criteria.From = moment(new Date()).add(-7, 'days');
    this.criteria.To = new Date();
    this.criteria.patientId = patientID;
    this.search();
    this.modal.show();
  }

  hide() {
    this.modal.hide();
  }
}
