import { DashboardCountInfoModel } from './../../../../common/models/dashboard-count-info.model';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AuditStackAppointmentModel, AuditAppointmentReasonModel, DetectAppointmentModel } from 'src/app/modules/common/models/audit-stack-appointment.model';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
import { DatePipe } from '@angular/common';

declare var Chart: any;
declare var $: any;
@Component({
  selector: 'app-appointment-audit',
  templateUrl: './appointment-audit.component.html',
  styleUrls: ['./appointment-audit.component.css'],
  providers: [DatePipe]
})
export class AppointmentAuditComponent implements AfterViewInit {
  from?: Date = new Date();
  to?: Date = new Date();
  dataSource: Array<AuditStackAppointmentModel>;
  countInfoModel  : DashboardCountInfoModel = new DashboardCountInfoModel();
  @ViewChild('columnStacked') columnStackedEl: ElementRef;
  @ViewChild('barStacked') barStackedEl: ElementRef;
  @ViewChild('pieStacked') pieStacked: ElementRef;

  chart: any;
  dataSourceReason: Array<AuditAppointmentReasonModel>;

  chartReason: any;
  chartDataReason: any;

  chartDetect: any;
  chartDataDetect: Array<DetectAppointmentModel>;

  constructor(private service: AppointmentService, private datePipe: DatePipe) {
    var toDefaultDate = new Date();
    toDefaultDate.setDate(toDefaultDate.getDate() - 14);
    this.from = toDefaultDate;
  }

  ngAfterViewInit() {
    this.register();
    this.search();

    this.registerDetect();
    this.searchDetect();

    this.registerReason();
    this.searchReason();
  }

  search() {
    var f = this.from ? this.datePipe.transform(this.from, 'MM-dd-yyyy') : null;
    var t = this.to ? this.datePipe.transform(this.to, 'MM-dd-yyyy') : null;

    this.service.AuditAppointment(f, t).subscribe(r => {
      this.dataSource = r;
      this.updateDataset();
    });

    this.service.GetDashboardCountInfo(f, t).subscribe(r=>{
      this.countInfoModel = r;
    })
  }

  searchDetect() {
    var f = this.from ? this.datePipe.transform(this.from, 'MM-dd-yyyy') : null;
    var t = this.to ? this.datePipe.transform(this.to, 'MM-dd-yyyy') : null;

    this.service.GetDetectAppointment(f, t).subscribe(r => {
      this.chartDataDetect = r;
      this.updateDatasetDetect();
    });
  }

  registerDetect() {
    var data = {
      datasets: [{
        label: 'Colors',
        data: [],
        backgroundColor: ["#FF1635","#28D094"],
        borderColor: 'transparent',
      }],
      labels: []
    };

    var options = {
      responsive: true
    }

    var config = {
      type: 'pie',
      options: options,
      data: data
    };

    // Create the chart
    this.chartDetect = new Chart($(this.pieStacked.nativeElement), config);
  }

  updateDatasetDetect() {
    if (this.chartDetect && this.chartDataDetect) {
      var labels = [];
      var dataDetect = [];
      this.chartDataDetect.forEach(c => {
        labels.push(c.Title);
        dataDetect.push(c.Total);
      });

      this.chartDetect.data.labels = labels;
      this.chartDetect.data.datasets[0].data = dataDetect;
      this.chartDetect.update();
    }
  }

  updateDataset() {
    if (this.chart && this.dataSource) {
      var labels = [];
      var completeds = [];
      var cancelleds = [];
      this.dataSource.forEach(c => {
        labels.push(this.datePipe.transform(c.AppointmentDate, 'MM/dd/yy'));
        completeds.push(c.TotalCompleted);
        cancelleds.push(c.TotalCancelled);
      });

      this.chart.data.labels = labels;
      this.chart.data.datasets[0].data = cancelleds;
      this.chart.data.datasets[1].data = completeds;

      this.chart.update();
    }
  }

  register() {

    // Chart Options
    var chartOptions = {
      title: {
        display: false,
        text: "Chart.js Column Chart - Stacked"
      },
      tooltips: {
        mode: 'index'
      },
      responsive: true,
      //maintainAspectRatio: false,
      //responsiveAnimationDuration: 500,
      scales: {
        xAxes: [{
          stacked: true,
          // display: true,
          // gridLines: {
          //   color: "#f3f3f3",
          //   drawTicks: false,
          // },
          // scaleLabel: {
          //   display: true,
          //  }
        }],
        yAxes: [{
          stacked: true,
          // display: true,
          // gridLines: {
          //   color: "#f3f3f3",
          //   drawTicks: false,
          // },
          // scaleLabel: {
          //   display: true,
          // }
        }]
      }
    };

    // Chart Data
    var chartData = {
      labels: [],
      datasets: [{
        label: "Cancelled",
        data: [],
        backgroundColor: "#FF1635",
        hoverBackgroundColor: "rgba(255,22,53,.8)",
        borderColor: "transparent"
      }, {
        label: "Completed",
        data: [],
        backgroundColor: "#28D094",
        hoverBackgroundColor: "rgba(22,211,154,.8)",
        borderColor: "transparent"
      }]
    };

    var config = {
      type: 'bar',

      // Chart Options
      options: chartOptions,

      data: chartData
    };

    // Create the chart
    this.chart = new Chart($(this.columnStackedEl.nativeElement), config);
  }

  searchReason() {
    var f = this.from ? this.datePipe.transform(this.from, 'MM-dd-yyyy') : null;
    var t = this.to ? this.datePipe.transform(this.to, 'MM-dd-yyyy') : null;

    this.service.AuditAppointmentReason(f, t).subscribe(r => {
      this.dataSourceReason = r;
      this.updateDatasetReason();
    });
  }

  updateDatasetReason() {
    if (this.chart && this.chartDataReason && this.dataSourceReason) {
      var labels = [];
      var totals = [];
      this.dataSourceReason.forEach(c => {
        labels.push(c.ReasonName);
        totals.push(c.Total);
      });
      this.chartReason.data.labels = labels;
      this.chartReason.data.datasets[0].data = totals;

      this.chartReason.update();
    }
  }

  registerReason() {
    // Chart Options
    var chartOptionsReason = {
      legend: {
        display: false
      },
      title: {
        display: false,
        text: 'Chart.js Column Chart - Stacked'
      },
      tooltips: {
        mode: 'label'
      },
      responsive: true,
      maintainAspectRatio: false,
      responsiveAnimationDuration: 500,
      scales: {
        xAxes: [
          {
            stacked: true
          }
        ],
        yAxes: [
          {
            stacked: true
          }
        ]
      }
    };

    // Chart Data
    this.chartDataReason = {
      labels: [],
      datasets: [
        {
          label: 'Appointment',
          data: [],
          backgroundColor: [
            this.getRandomColor(),
            this.getRandomColor(),
            this.getRandomColor(),
            this.getRandomColor(),
            this.getRandomColor(),
            this.getRandomColor(),
            this.getRandomColor(),
            this.getRandomColor(),
            this.getRandomColor(),
            this.getRandomColor(),
            this.getRandomColor(),
            this.getRandomColor(),
            this.getRandomColor(),
            this.getRandomColor(),
            this.getRandomColor(),
            this.getRandomColor(),
            this.getRandomColor(),
            this.getRandomColor(),
          ],
          borderColor: 'transparent'
        }
      ]
    };

    var config = {
      type: 'horizontalBar',

      // Chart Options
      options: chartOptionsReason,

      data: this.chartDataReason
    };
    this.chartReason = new Chart($(this.barStackedEl.nativeElement), config);
  }

  getRandomColor() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

}
