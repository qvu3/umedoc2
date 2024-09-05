import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service'; 

@Component({
  selector: 'app-edit-staff-profile',
  templateUrl: './edit-staff-profile.component.html',
  styleUrls: ['./edit-staff-profile.component.css']
})

export class EditStaffProfileComponent extends BaseComponent implements OnInit {
  
  constructor(authService: AuthenticationService 
  ) {
    super(authService);
     
  }

  ngOnInit() {

  } 
}
