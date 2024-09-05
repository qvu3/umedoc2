import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { BaseComponent } from 'src/app/modules/base.component';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';

@Component({
  selector: 'app-completed-pay-with-crypto',
  templateUrl: './completed-pay-with-crypto.component.html',
  styleUrls: ['./completed-pay-with-crypto.component.css']
})
export class CompletedPayWithCryptoComponent extends BaseComponent implements OnInit {
  appointmentId:string;
  constructor(authService:AuthenticationService,
    private appointmentService:AppointmentService,
    activeRouter:ActivatedRoute, 
    private dialog:CommonDialogService,
    private router:Router) {
    super(authService);
    activeRouter.params.subscribe(r=>{
      if(r && r['id']){
        this.appointmentId = r['id'];
        this.checkCompletedAppointment(this.appointmentId);
      }
      else{ 
        this.router.navigateByUrl('/');
      }
    });  
  }

  ngOnInit(): void {
  }

  checkCompletedAppointment(id){
    this.appointmentService.CheckCompletedlApptPayCryto(id).subscribe(r=>{
      this.dialog.showToastrSuccess('Paymment Crypto', 'You are completed payment for this appointment.');
      this.router.navigateByUrl(`/appointment-room/${id}`);
    },error=>{ 
      this.dialog.showToastrError('Paymment Crypto', 'Your appointment is invalid, please contact administrator for supporting.');
      this.router.navigateByUrl('/');
    });
  }

}