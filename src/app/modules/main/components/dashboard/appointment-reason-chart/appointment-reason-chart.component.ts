import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AuditAppointmentReasonModel } from 'src/app/modules/common/models/audit-stack-appointment.model';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
declare var Chart: any;
declare var $: any;

@Component({
  selector: 'app-appointment-reason-chart',
  templateUrl: './appointment-reason-chart.component.html',
  styleUrls: ['./appointment-reason-chart.component.css'],
  providers: [DatePipe]
})
export class AppointmentReasonChartComponent implements AfterViewInit {
  from?: Date = new Date();
  to?: Date = new Date();
  dataSource: Array<AuditAppointmentReasonModel>;
  chart: any;
  chartData: any;
  @ViewChild('barStacked') barStackedEl: ElementRef;

  constructor(private service: AppointmentService, private datePipe: DatePipe) {
    var toDefaultDate = new Date();
    toDefaultDate.setDate(toDefaultDate.getDate() - 14);
    this.from = toDefaultDate;
  }

  ngAfterViewInit() {
    this.register();
    this.search();
  }

  search() {
    var f = this.from ? this.datePipe.transform(this.from, 'MM-dd-yyyy') : null;
    var t = this.to ? this.datePipe.transform(this.to, 'MM-dd-yyyy') : null;

    this.service.AuditAppointmentReason(f, t).subscribe(r => {
      this.dataSource = r;
      this.updateDataset();
    });
  }

  updateDataset() {
    if (this.chart && this.chartData && this.dataSource) {
      var labels = [];
      var totals = [];
      this.dataSource.forEach(c => {
        labels.push(c.ReasonName);
        totals.push(c.Total);
      });
      this.chart.data.labels = labels;
      this.chart.data.datasets[0].data = totals;

      this.chart.update();
    }
  }

  register() {
    // Chart Options
    var chartOptions = {
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
            // display: true,
            // gridLines: {
            //   color: "#f3f3f3",
            //   drawTicks: false,
            // },
            // scaleLabel: {
            //   display: true,
            // }
          }
        ],
        yAxes: [
          {
            stacked: true
            // display: true,
            // gridLines: {
            //   color: "#f3f3f3",
            //   drawTicks: false,
            // },
            // scaleLabel: {
            //   display: true,
            // }
          }
        ]
      }
    };

    // Chart Data
    this.chartData = {
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
          // hoverBackgroundColor: 'rgba(81,117,224,.8)',
          borderColor: 'transparent'
        }
      ]
    };

    var config = {
      type: 'horizontalBar',

      // Chart Options
      options: chartOptions,

      data: this.chartData
    };
    this.chart = new Chart($(this.barStackedEl.nativeElement), config);
  }

  getRandomColor() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }
}
