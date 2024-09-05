import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import NetworkTest, { ErrorNames, NetworkTestOptions } from 'opentok-network-test-js';
import { BaseComponent } from 'src/app/modules/base.component';
import { DeviceCheckModel } from 'src/app/modules/common/models/device-check.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';

declare var OT: any;
declare var $: any;
declare var navigator: any;
declare var Math: any;
@Component({
  selector: 'app-device-check',
  templateUrl: './device-check.component.html',
  styleUrls: ['./device-check.component.css']
})
export class DeviceCheckComponent extends BaseComponent implements OnInit, OnDestroy {
  @ViewChild('childModal') public modal: ModalDirective;
  @ViewChild('resultModal') public resultModal: ModalDirective;
  otNetworkTest: NetworkTest;
  model: DeviceCheckModel = new DeviceCheckModel();
  Math = Math;
  isTesting: boolean = false;
  constructor(public authService: AuthenticationService,
    private appointmentService: AppointmentService) {
    super(authService);

  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }

  calcPercent() {
    if (this.model.percent < 60) {
      this.model.percent += 2;
    }
    else {
      this.model.percent < 100 ?
        this.model.percent += 1 : this.model.percent;
    }
  }

  startTest(config) {
    this.isTesting = true;
    this.model = new DeviceCheckModel();
    this.model.percent = 0;
    this.otNetworkTest = new NetworkTest(OT, config);
    this.otNetworkTest.testConnectivity().then((results) => {
      this.model.isCompleted = false;
      this.model.isConnectivity = results.success;

      if (results && results.success) {
        this.calcPercent();
        //console.log('OpenTok connectivity test results', results);
        this.otNetworkTest.testQuality(function updateCallback(stats) {
          this.calcPercent();
          this.model.packetAudio = stats.audio.packetsReceived;
          this.model.packetVideo = stats.video.packetsReceived;
          this.model.packetLostAudio = stats.audio.packetsLost;
          this.model.packetLostVideo = stats.video.packetsLost;
          //console.log('intermediate testQuality stats', stats);
        }.bind(this)).then((results) => {

          this.showResult();
          this.isTesting = false;
          this.model.isCompleted = true;
          this.model.percent = 100;
          this.model.audioSupported = results.audio.supported;
          this.model.videoSupported = results.video.supported;
          this.model.statusConnect = this.rateMosScore(((results.audio.mos ? results.audio.mos : 0) + (results.video.mos ? results.video.mos : 0)) / 2);
          this.model.bitrateAudio = results.audio && results.audio.bitrate ? (results.audio.bitrate / 1000).toFixed(2) : '0.00';
          this.model.bitrateVideo = results.video && results.video.bitrate ? (results.video.bitrate / 1000).toFixed(2) : '0.00';

        })
          .catch((error) => {
            this.isTesting = false;
           // console.log('OpenTok quality test error', error);
          });
      }
      else {
        this.isTesting = false;
        this.model.isCompleted = true;
        this.model.isConnectivity = false;
        this.model.percent = 100;
        this.model.statusConnect = 'Bad';
        this.showResult();
      }
    })
      .catch(function (error) {
        this.isTesting = false;
        this.model.isCompleted = true;
        this.model.percent = 100;
        this.model.isConnectivity = false;
        this.model.statusConnect = 'Bad';
        this.showResult();
       // console.log('OpenTok connectivity test error', error);
      });
  }

  reTest() {
    this.hideResult();
    this.appointmentService.GenerateToxboxSession().subscribe(r => {
      if (r) {
        this.startTest(r);
        this.modal.show();
      }
    });
  }

  show() {
    this.hideResult();
    this.modal.show();
  }

  hide() {
    if (this.otNetworkTest) {
      this.otNetworkTest.stop();
    }

    this.modal.hide();
    this.hideResult();
  }




  showResult() {
    this.resultModal.show();
  }

  hideResult() {
    this.resultModal.hide();
  }

  rateMosScore(mos) {
    if (mos >= 3.8) {
      return 'Excellent';
    }
    if (mos >= 3.1) {
      return 'Good';
    }
    if (mos >= 2.4) {
      return 'Fair';
    }
    if (mos >= 1.7) {
      return 'Poor';
    }
    return 'Bad';
  }

}
