import { Component, OnInit, AfterViewInit, Input, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import  {PreCheckModel} from 'src/app/modules/common/models/pre-check.model';
import { DeviceCheckComponent } from '../device-check/device-check.component'; 
import { CompanyService } from 'src/app/modules/common/services/company.service';
import { CompanyModel } from 'src/app/modules/common/models/company.model';
import Global from 'src/app/Global';
declare var OT: any;
@Component({
  selector: 'app-pre-check',
  templateUrl: './pre-check.component.html',
  styleUrls: ['./pre-check.component.css']
})
export class PreCheckComponent extends BaseComponent implements OnInit , AfterViewInit {
  @Input() model: PreCheckModel;
  company:CompanyModel;
  states:any;
  @ViewChild('deviceCheck') deviceCheckModal:DeviceCheckComponent; 
  constructor( 
    private dialog: CommonDialogService , 
    private companyService:CompanyService,
    private authService:AuthenticationService) {
      super(authService);
  }

  getCompany(){
    this.companyService.Get(Global.CompnayID).subscribe(r=>{
      this.company = r;
    })
  } 

  ngOnInit() { 
    this.states = Global.US_StateList;
    this.getCompany(); 
  }

  ngAfterViewInit(){ 
  } 

  noCheckFlorida() {
    if (this.model.IsFlorida === false && !this.model.IsHaveSeenCompanyCare) {
      this.dialog.showSwalErrorAlert( 'Info',  'We apologize, but this service is only available for patients located in Florida, unless you registered as a patient with a provider in Florida the last 2 years. If so, please choose “Yes”.' )
    }
  }

  noCheckAge() {
    if (this.model.IsThan14Age === false) {
      this.dialog.showSwalErrorAlert(  'Info',   'We apologize, but you need to be at least 16 years or older for now. We are in the process of integrating pediatric services into Umedoc.' )
    }
  }

  noCheckDevice() {
    if (this.model.IsDeviceCheckGreen === false) {
      this.dialog.showSwalErrorAlert(  'Info',   'We apologize, but your device may not be compatible with our platform. It could be your internet bandwidth, a faulty/no microphone on your device, or a faulty/no webcam on your device. Please try another device.' )
    }
  }

  checkNoCall911() {
    if (this.model.IsCalled911 === false) {
      this.dialog.showSwalErrorAlert(  'Info',    'PLEASE CALL 911 OR GO TO THE EMERGENCY ROOM. THIS SERVICE IS NOT APPROPRIATE FOR MEDICAL EMERGENCIES.' )
    }
  }

  deviceTest() {
    this.deviceCheckModal.show();
  }

   
}
