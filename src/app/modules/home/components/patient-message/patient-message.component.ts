import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/modules/base.component';
import { RoomChatInfoViewModel } from 'src/app/modules/common/models/room-chat-info-view.model';
import { UserContactModel } from 'src/app/modules/common/models/user-contact-chat.model';
import { AppChatService } from 'src/app/modules/common/services/app-chat.service';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';

@Component({
  selector: 'app-patient-message',
  templateUrl: './patient-message.component.html',
  styleUrls: ['./patient-message.component.css']
})
export class PatientMessageComponent extends BaseComponent implements OnInit {
  rooms:RoomChatInfoViewModel[]=[];
  contacts: UserContactModel[] = []; 
  constructor(authService: AuthenticationService,
    private appChatService: AppChatService,
    private router:Router,
    private activeRouter:ActivatedRoute) {
    super(authService); 
  }

  ngOnInit(): void {
    this.getRooms(); 
  }

  

  getRooms(){
    this.appChatService.GetRooms().subscribe(r=>{
      this.rooms =r;
    });
  }

  createRoom(){
    this.appChatService.CreateNewRoom().subscribe(roomId=>{
      this.getRooms();
      this.router.navigate(['../patient-messages/patient-main', roomId]);
    });
  }

}
