import { UserService } from 'src/app/modules/common/services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { ProviderProfileService } from 'src/app/modules/common/services/provider-profile.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import Global from 'src/app/Global';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
import { TileAvailableModel } from 'src/app/modules/common/models/tile-available.model';
import { PatientProfileModel } from 'src/app/modules/common/models/patient-profile.model';
import { PatientProfileService } from 'src/app/modules/common/services/patient-profile.service';
import UserModel from 'src/app/modules/common/models/user.model';
import { PatientChildModalComponent } from 'src/app/modules/common/component/patient-child-modal/patient-child-modal.component';
import { CompanyModel } from 'src/app/modules/common/models/company.model';
import { CompanyService } from 'src/app/modules/common/services/company.service';
import { GroupApptService } from 'src/app/modules/common/services/group-appt.service';
import { GroupApptPatientModel } from 'src/app/modules/common/models/group-appt-patient.model';
import { Router } from '@angular/router';
declare var google: any;

@Component({
  selector: 'app-patient-profile-new',
  templateUrl: './patient-profile-new.component.html',
  styleUrls: ['./patient-profile-new.component.css']
})
export class PatientProfileNewComponent extends BaseComponent implements OnInit {
  currentState: string = '';
  us_statelist: any;
  model: TileAvailableModel = new TileAvailableModel();
  parents: Array<UserModel> = [];
  appointmentPatientID: string;
  patient: PatientProfileModel;
  centerLatLong: any;
  patientLatLong: any;
  companyInfo: CompanyModel;
  partnerName :string;
  @ViewChild('modal') modal: PatientChildModalComponent;

  isAvailableGroupAppt: boolean = false;
  constructor(public authenticateService: AuthenticationService,
    private companyService: CompanyService,
    private providerProfileService: ProviderProfileService,
    private appointmentService: AppointmentService,
    private patientService: PatientProfileService,
    private router: Router,
    private groupApptService: GroupApptService,
    private dialog: CommonDialogService ,
    private userService:UserService) {
    super(authenticateService);
    this.us_statelist = Global.US_StateList;
    this.currentState = this.currentUser.State;
    this.checkTileAvailableModel(this.currentState);
    this.getListParent();
    this.getLocationCenter();
    this.getCurrentPatient();
    this.getCompanyInfo();
    this.appointmentPatientID = authenticateService.AppointmentPatientID = this.currentUser.Id;
    this.checkAvailableGroupAppt(this.currentState);
    this.getPartnerName();
  }

  ngOnInit(): void {
    if ($(window).width() > 960) {
      $('#overlay').addClass('overlay');
      $('#whenoverlay').addClass('whenoverlay');
    } else {
      $('#overlay').removeClass('overlay');
      $('#whenoverlay').removeClass('whenoverlay');
    }
    setTimeout(function () {
      $("body").removeClass("fixed-navbar");
    }, 500);
  }

  gotoCreditCard(){
    this.router.navigateByUrl('/patient-credit-card?show=popup');
  }

  getPartnerName(){
    this.userService.getPartnerName().subscribe(r=>{
      this.partnerName = r;
    });
  }

  interestHealth() {
    this.appointmentService.InterestHealthCoach().subscribe(r => { });
    this.dialog.showToastrSuccess("Health Coach", "Thank you! We will let you know as soon as it's available");
  }


  interestDiabetic() {
    this.appointmentService.InterestDiabetic().subscribe(r => { });
    this.dialog.showToastrSuccess("Diabetic Trainer", "Thank you! We will let you know as soon as it's available");
  }

  getCompanyInfo() {
    this.companyService.GetCurrentCompany().subscribe(r => {
      this.companyInfo = r;
    })
  }

  getCurrentPatient() {
    this.patientService.GetPatientProfileInfo(this.currentUser.Id).subscribe(r => {
      this.patient = r;
      this.getPatientLocation();
    });
  }

  getListParent() {
    this.parents = [];
    var list = [];
    list.push(Object.assign({}, this.currentUser));
    this.patientService.GetChildren(this.currentUser.Id).subscribe(r => {
      if (r && r.length > 0) {
        r.forEach(x => {
          list.push(x.PatientUser);
        })
      }
    });
    this.parents = list;
  }

  goToDemand() {
    this.providerProfileService.CountAvailable().subscribe(r => {
      if (r > 0) {
        this.router.navigate(['/request-appointment']);
      }
      else {
        this.dialog.showSwalWarningAlert("Non-Business Hours", "Please come back at our business hours: 8AM - 6PM. Or click Schedule An Appointment to book a future visit with provider");
      }
    });
  }

  checkTileAvailableModel(state) {
    this.providerProfileService.CheckTileAvailable(state).subscribe(r => {
      if (r) {
        this.model = r;
        if (this.model && !this.model.IsPediatric && !this.model.IsPrimaryCareUrgentCare && !this.model.IsPsychiatric && !this.model.IsWeightLossConsultation) {
          this.dialog.showSwalWarningAlert("Coming Soon", "Umedoc not available yet from your location. We are working hard to get more providers to cover your medical needs. Please check back later.");
        }
      }
      else {
        this.dialog.showSwalWarningAlert("Non-Business Hours", "Please come back at our business hours: 8AM - 6PM. Or click Schedule An Appointment to book a future visit with provider");
      }
    });
  }

  changeState(event) {
    this.checkTileAvailableModel(this.currentState);
  }

  changePatient(event) {
    this.providerProfileService.CheckTileAvailable(this.currentState)
      .subscribe(r => {
        if (r) {
          this.model.IsPediatric = r.IsPediatric;
          this.model.IsPrimaryCareUrgentCare = r.IsPrimaryCareUrgentCare;
          this.model.IsPsychiatric = r.IsPsychiatric;
          this.model.IsCovidScreening = r.IsCovidScreening;

          this.authenticateService.AppointmentPatientID = this.appointmentPatientID;
          let child = this.parents.find(x => x.Id == this.appointmentPatientID);
          if (child && child.ParentUserID && child.DOB) {
            var ages = this.calculateAge(new Date(child.DOB));
            if (ages < 16) {
              this.model.IsPrimaryCareUrgentCare = false;
              this.model.IsPsychiatric = false;
            }
          }
        }
      });
  }


  addChild() {
    this.modal.show(null, this.currentUser.Id);
  }

  Now(url) {
    // if(!this.companyInfo.IsExistPlan){
    //   this.dialog.showSwalWarningAlert('Subcription Plan', 'Subcription is required.  Please subcribe to our Premium  plan or Schedule a Future appointment  instead.');
    //   return;
    // }
    this.authenticateService.IsOnDemandAppointment = 'now';
    this.router.navigateByUrl(url);
  }

  Future() {
    this.authenticateService.IsOnDemandAppointment = 'future';
  }


  ScheduleVaccine() {
    this.patientService.CheckExistedApptCompleted(this.appointmentPatientID).subscribe(r => {
      if (!r) {
        this.dialog.showSwalWarningAlert('Covid Vaccine Schedule', 'Sorry, you need to book a First-Time Visit before you can schedule Covid Vaccine.')
      }
      else {
        this.router.navigate(['/vaccine-appt-schedule']);
      }
    }, error => {
      this.dialog.showSwalWarningAlert('Covid Vaccine Schedule', 'Sorry, you need to book a First-Time Visit before you can schedule Covid Vaccine.');
    });
  }

  getLocationCenter() {
    var geocoder = new google.maps.Geocoder();
    var address = `3592 Broadway, Fort Myers FL 33901`;
    geocoder.geocode({ 'address': address }, function (results, status) {
      // console.log(`result at ${index} = ${status}`);
      if (status === 'OK' && results && results[0]) {
        this.centerLatLong = results[0].geometry.location
      }
    }.bind(this));
  }

  getPatientLocation() {
    if (this.patient) {
      var geocoder = new google.maps.Geocoder();
      var address = `${this.patient.PatientUser.Address1}, ${this.patient.PatientUser.City}, ${this.patient.PatientUser.State} ${this.patient.PatientUser.ZipCode}`;
      geocoder.geocode({ 'address': address }, function (results, status) {
        if (status === 'OK' && results && results[0]) {
          this.patientLatLong = results[0].geometry.location
        }
      }.bind(this));
    }
  }

  checkAllowVaccinScheduleShow() {
    if (this.centerLatLong && this.patientLatLong) {
      const distance = google.maps.geometry.spherical.computeDistanceBetween(this.centerLatLong, this.patientLatLong);
      if (distance) {
        return (distance / 1000) <= 48.2803;
      }
    }
    return false;
  }

  ScheduleGroupAppt() {
    var groupApptPatient = new GroupApptPatientModel();
    groupApptPatient.PatientID = this.currentUser.Id;
    this.authenticationService.groupApptPatient = Object.assign({}, groupApptPatient);
  }

  checkAvailableGroupAppt(state) {
    this.groupApptService.CheckAvailableGroupApptSlots(state).subscribe(r => {
      this.isAvailableGroupAppt = r;
    });
  }
}
