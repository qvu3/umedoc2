import { Component, OnInit, ViewChild } from '@angular/core';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
import { AppointmentModel } from 'src/app/modules/common/models/appointment.model';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalDirective } from 'ngx-bootstrap';
import { ToxBoxModel } from 'src/app/modules/common/models/toxbox.model';
import Global from 'src/app/Global';

@Component({
  selector: 'app-video-call-request',
  templateUrl: './video-call-request.component.html',
  styleUrls: ['./video-call-request.component.css']
})
export class VideoCallRequestComponent implements OnInit {
  urlTokbox: any;
  model:AppointmentModel;
  tokboxModel:ToxBoxModel;
  @ViewChild('childModal') modal: ModalDirective;
  id:string;
  constructor(private appointmentService: AppointmentService,
    private santizier: DomSanitizer) {

  }

  ngOnInit() {

  } 

  show(id) {
    this.id = id;
    if (this.id){
      this.urlTokbox = this.santizier.bypassSecurityTrustResourceUrl(`https://tokbox.com/embed/embed/ot-embed.js?embedId=${Global.embebedId}&room=${id}}&iframe=true`);
      setTimeout(()=>{
        this.modal.show();
      },1000) ;
    }
  }

  hide() {
    this.id=null; 
    this.urlTokbox=null;
    this.modal.hide();
  }

}
