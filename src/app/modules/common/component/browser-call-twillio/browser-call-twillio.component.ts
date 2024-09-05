import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CommonDialogService } from '../../services/dialog.service';
import { UtilityService } from '../../services/utility.service';
declare var Twilio: any;
@Component({
  selector: 'app-browser-call-twillio',
  templateUrl: './browser-call-twillio.component.html',
  styleUrls: ['./browser-call-twillio.component.css']
})
export class BrowserCallTwillioComponent implements OnInit {
  @ViewChild('childModal') public modal!: ModalDirective;
  phoneNumber: string = "";
  clientName: string = "";
  device: any;
  status: string = "";
  isReady: boolean = false;
  isConnected: boolean = false;
  isCalling: boolean = false;
  inputVolumeBarWidth: number = 0;
  inputVolumeBarBg: any;
  outputVolumeBarWidth: number = 0;
  outnputVolumeBarBg: any;
  isTempHide:boolean = false;
  constructor(private utilityService: UtilityService,
    private dialog: CommonDialogService) {

  }

  ngOnInit() {
    this.device = null;
  }

  hide() {
    this.hangup();
    this.isReady = this.isCalling = this.isConnected = false;
    this.status = "";
    this.modal.hide();
  }

  tempHide(){
    this.isTempHide = true;
    this.modal.hide();
  }

  activeShow(){
    this.isTempHide = false;
    this.modal.show();
  }

  show() {
    this.isTempHide = false;
    this.status = "";
    this.isReady = this.isCalling = this.isConnected = false;
    this.registerCall();
    this.modal.show();
  }

  registerCall() {
    if (this.phoneNumber && this.clientName) {
      this.utilityService.GenerateTwilioToken(this.clientName).subscribe((r: string | any[]) => {
        if (r && r.length > 0) {
          this.device = new Twilio.Device(r);
          this.registerEventCall();
        }
      }, (error: any) => {
        this.dialog.showSwalWarningAlert('Call Client', 'Cannot execute to make a calling for this client.' )
      });
    }
  }

  call() {
    if (this.device && this.phoneNumber) {
      // get the phone number to connect the call to
      var params = {
        To: this.phoneNumber
      };
      this.status = 'Calling to ' + params.To + '....';
      this.device.connect(params);
    }
  }

  hangup() {
    this.status = "Hanging Up...."
    if (this.device) {
      this.device.disconnectAll();
    }
    this.status = "";
  }

  registerEventCall() {
    if (this.device) {
      this.device.on('ready', (device: any) => {
        this.status = "Device is ready....";
        this.isReady = true;
      });

      this.device.on('error', (error: { message: any; }) => {
        this.status = error.message;
      });

      this.device.on('connect', (conn: any) => {
        this.status = 'Connected. Start calling...';
        this.isCalling = true;
        this.isConnected = true;
        this.bindVolumeIndicators(conn);
      });

      this.device.on('disconnect', (conn: any) => {
        this.status = "Call end....";
        this.isConnected = false;
        this.isCalling = false;
      
        this.inputVolumeBarWidth=0;
        this.outputVolumeBarWidth=0;
      });

      this.device.on('incoming', function (conn: { accept: () => void; }) {
        conn.accept();
      });
    }
  }

  bindVolumeIndicators(connection: { on: (arg0: string, arg1: (inputVolume: any, outputVolume: any) => void) => void; }) {
    connection.on('volume', (inputVolume: number, outputVolume: number) => {
      var inputColor = 'red';
      if (inputVolume < .50) {
        inputColor = 'green';
      } else if (inputVolume < .75) {
        inputColor = 'yellow';
      }
  
      this.inputVolumeBarWidth = inputVolume;
      this.inputVolumeBarBg = inputColor;
  
      var outputColor = 'red';
      if (outputVolume < .50) {
        outputColor = 'green';
      } else if (outputVolume < .75) {
        outputColor = 'yellow';
      }
  
      this.outputVolumeBarWidth = outputVolume;
      this.outnputVolumeBarBg = outputColor;
    });
  }
}
