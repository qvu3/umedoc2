import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { ProviderProfileModel } from 'src/app/modules/common/models/provider-profile.model';
import { ProviderProfileService } from 'src/app/modules/common/services/provider-profile.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
  providers:[DatePipe]
})
export class MyProfileComponent extends BaseComponent implements OnInit {
  model: ProviderProfileModel = new ProviderProfileModel();
  constructor(authService:AuthenticationService , 
    private service:ProviderProfileService,
    private datePipe: DatePipe) {
    super(authService); 
   }

  ngOnInit() { 
    this.getEntity(this.currentUser.Id);
  }

  getEntity(id) {
    this.model = new ProviderProfileModel();
    this.service.GetIncludeById(id).subscribe(r => {
      if (r)
        this.model = r;
        if(this.model && this.model.ProviderUser && !this.model.ProviderUser.ProfilePicture){
          this.model.ProviderUser.ProfilePicture = "https://umedoc-prod.s3.amazonaws.com/RandomFiles/umedoc-defaultavatar.png";
        }
    });
  }

  transformDob(data) {
    return this.datePipe.transform(data, 'MM/dd/yyyy');
  }


}
