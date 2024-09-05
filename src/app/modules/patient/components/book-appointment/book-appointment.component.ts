import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppointmentModel } from 'src/app/modules/common/models/appointment.model';
import { AppointmentSlotService } from 'src/app/modules/common/services/appointment-slot.service';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit , OnDestroy {
  model: AppointmentModel;
  eventRouterSubcription:Subscription;
  constructor(private authService: AuthenticationService,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private appointmentSlotService: AppointmentSlotService) {
   
    this.eventRouterSubcription = router.events.subscribe(r => {
      if (r instanceof NavigationEnd) {
        this.model = authService.requestAppointment ?? new AppointmentModel();
        if (r && this.router.routerState.root?.firstChild?.firstChild?.params['value']?.category) {
          this.model.ApptCategoryCode = this.router.routerState.root?.firstChild?.firstChild?.params['value']?.category; 
          this.authService.requestAppointment = this.model;
          this.getCategoy(this.model.ApptCategoryCode);
        }
        else {
          router.navigate(['/']);
        }
      }
    });
  }

  ngOnInit(): void {
  }

  getCategoy(code) {
    this.appointmentSlotService.GetCategory(code).subscribe(r => {
      if (!r) {
        this.router.navigate(['/']);
      }
      else {
        this.authService.onLoadCategoryIDEvent.emit(r.ID);
      }
    });
  }

  ngOnDestroy(){
    this.eventRouterSubcription?.unsubscribe();
  }

}

