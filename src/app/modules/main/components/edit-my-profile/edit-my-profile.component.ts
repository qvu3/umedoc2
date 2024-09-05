import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
@Component({
  selector: 'app-edit-my-profile',
  templateUrl: './edit-my-profile.component.html',
  styleUrls: ['./edit-my-profile.component.css']
})
export class EditMyProfileComponent extends BaseComponent implements OnInit {

  constructor(authService: AuthenticationService
  ) {
    super(authService);

  }

  ngOnInit() {

  }
}
