import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { AppointmentReasonService } from 'src/app/modules/common/services/appointment-reason.service';
import { AppointmentReasonModel } from 'src/app/modules/common/models/appointment-reason.model';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { AppointmentReasonInfoComponent } from './appointment-reason-info/appointment-reason-info.component';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';

@Component({
  selector: 'app-appointment-reason',
  templateUrl: './appointment-reason.component.html',
  styleUrls: ['./appointment-reason.component.css']
})
export class AppointmentReasonComponent extends BaseComponent implements OnInit {
  list: AppointmentReasonModel[] = [];
  @ViewChild('appReasonModal') modal: AppointmentReasonInfoComponent;
  listStyle= {
    width:'100%', 
    height: '100%',  
  }
  constructor(authService: AuthenticationService,
    private dialog: CommonDialogService,
    private appointmentReasonService: AppointmentReasonService) {
    super(authService);
  }

  ngOnInit() {
    this.search();
  }

  search() {
    this.appointmentReasonService.GetAll().subscribe(r => {
      this.list = r;
    });
  }


  add() {
    this.modal.show(false, null);
  }

  edit(item) {
    this.modal.show(true, item);
  }

  remove(item) {
    this.dialog.showSwalConfirmAlert('Delete this item?').then(r => {
      if (r) {
        this.appointmentReasonService.Delete(item.ID).subscribe(r => {
          this.dialog.showToastrSuccess('Delete Reason', MessageConstant.REQUEST_SUCCESS_CONST);
          this.search();
        }, error => {
          this.dialog.showSwalErrorAlert('Delete Reason', 'This reason is using by other.');
        });
      }
    })
  }

  listOrderChanged(event) {
    if(event){
      this.appointmentReasonService.UpdateSortOrder(event).subscribe(r=>{
        this.search();
      });
    }
  }
}
