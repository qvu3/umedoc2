import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/modules/base.component';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';

@Component({
  selector: 'app-cancel-pay-with-crypto',
  templateUrl: './cancel-pay-with-crypto.component.html',
  styleUrls: ['./cancel-pay-with-crypto.component.css']
})
export class CancelPayWithCryptoComponent extends BaseComponent implements OnInit {
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
        this.checkCancelAppointment(this.appointmentId);
      }
      else{ 
        this.router.navigateByUrl('/');
      }
    })  
  }

  ngOnInit(): void {
  }

  checkCancelAppointment(id){
    this.appointmentService.CheckCancelApptPayCryto(id).subscribe(r=>{
      this.dialog.showSwalSuccesAlert('Paymment Crypto', 'Appointment has been cancelled.');
      this.router.navigateByUrl('/');
    },error=>{ 
      this.dialog.showToastrError('Paymment Crypto', 'Your appointment is invalid, please contact administrator for supporting.');
      this.router.navigateByUrl('/');
    });
  }

}
