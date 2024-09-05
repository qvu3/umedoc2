import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { SMSStatusHistoryModel } from 'src/app/modules/common/models/sms-status-history.model';
import { UserService } from 'src/app/modules/common/services/user.service';

@Component({
  selector: 'app-view-deliver-status-modal',
  templateUrl: './view-deliver-status-modal.component.html',
  styleUrls: ['./view-deliver-status-modal.component.css']
})
export class ViewDeliverStatusModalComponent implements OnInit {
  @ViewChild('childModal') public modal: ModalDirective;
  model:Array<SMSStatusHistoryModel> = new Array<SMSStatusHistoryModel>();
  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

  getEntity(sid){
    this.userService.getSMSStatusHistory(sid).subscribe(r=>{
      this.model = r??[];
      this.modal.show();
    })
  }

  show(sid) {
    this.model =  new Array<SMSStatusHistoryModel>();
    if (sid) {
      this.getEntity(sid);
    } 
  }


  hide() {
    this.modal.hide();
  }

}
