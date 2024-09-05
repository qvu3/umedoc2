import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/modules/base.component';
import { VaccineApptModel } from 'src/app/modules/common/models/vaccin-appt.model';
import { VaccineScreeningAnswerModel } from 'src/app/modules/common/models/vaccine-screening-anwser.model';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { PatientProfileService } from 'src/app/modules/common/services/patient-profile.service';

@Component({
  selector: 'app-vaccine-schedule-step-one',
  templateUrl: './vaccine-schedule-step-one.component.html',
  styleUrls: ['./vaccine-schedule-step-one.component.css']
})
export class VaccineScheduleStepOneComponent extends BaseComponent implements OnInit {
  model:VaccineApptModel = new VaccineApptModel();
  constructor(authService: AuthenticationService,
    private appointmentService: AppointmentService,
    private patientService: PatientProfileService,
    private router: Router) {
    super(authService);
  }

  ngOnInit(): void {
    this.model = Object.assign({}, this.authenticationService.vaccineAppointment);
    this.model.PatientID = this.authenticationService.AppointmentPatientID??this.currentUser.Id;
    this.generateQuestion();
    this.checkHasCompletedAppt();
  }

  checkHasCompletedAppt() {
    this.patientService.CheckExistedApptCompleted(this.currentUser.Id).subscribe(r => {
      if (!r) {
        this.router.navigateByUrl('/');
      }
    });
  }

  goToNext(){
    this.authenticationService.vaccineAppointment = Object.assign({}, this.model);
    this.router.navigateByUrl('/vaccine-appt-schedule-2');
  }

  generateQuestion(){
    if(!this.model.VaccineScreeningAnswers || this.model.VaccineScreeningAnswers.length ==0){
      this.model.VaccineScreeningAnswers = new Array<VaccineScreeningAnswerModel>();
      this.addQuestion('1. Do you have today or have you had at any time in the last 10\
      days\
      a\
      fever, chills, cough, shortness of breath, difficulty\
      breathing, fatigue, muscle or body aches, headache, new loss of\
      taste or\
      smell, sore throat, congestion or runny nose,\
      nausea, vomiting, or diarrhea?');
      this.addQuestion('2. Have you tested positive for and/or been diagnosed with\
      COVID-19\
      infection within the last 10 days?');
      this.addQuestion('3. Have you had a severe allergic reaction (e.g. needed\
        epinephrine\
        or\
        hospital care) to a previous dose of this vaccine or to\
        any of the ingredients of this vaccine?');
      this.addQuestion('4. Have you had any other vaccinations in the last 14 days (e.g.\
        influenza vaccine, etc.)?');
      this.addQuestion('5. Have you had any COVID-19 Antibody therapy within the last 90\
      days (e.g. Regeneron, Bamlanivimab, COVID Convalescent\
      Plasma, etc.)');
      this.addQuestion('6. Do you carry an Epi-pen for emergency treatment of\
      anaphylaxis\
      and/or have allergies or reactions to any medications,\
      foods, vaccines or latex?');
      this.addQuestion('7. For women, are you pregnant or is there a chance you could\
      become\
      pregnant?');
      this.addQuestion('8. For women, are you currently breastfeeding?');
      this.addQuestion('9. Are you immunocompromised or on a medication that affects\
      your\
      immune system?');
      this.addQuestion('10. Do you have a bleeding disorder or are you on a blood\
      thinner/blood-thinning medication?');
      this.addQuestion('11.Have you received a previous dose of any COVID-19 vaccine?'); 
    }
  }

  addQuestion(question){
    var q = new VaccineScreeningAnswerModel();
    q.Question = question;
    this.model.VaccineScreeningAnswers.push(q);
  }

}
