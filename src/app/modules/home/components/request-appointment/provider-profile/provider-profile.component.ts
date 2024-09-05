import { Component, OnInit, ViewChild } from '@angular/core';
import { ProviderProfileModel } from 'src/app/modules/common/models/provider-profile.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { ProviderProfileService } from 'src/app/modules/common/services/provider-profile.service';
import { BaseComponent } from 'src/app/modules/base.component';
import { ModalDirective } from 'ngx-bootstrap';
import { ProviderBadgeService } from 'src/app/modules/common/services/provider-badge.service';

@Component({
  selector: 'app-provider-profile',
  templateUrl: './provider-profile.component.html',
  styleUrls: ['./provider-profile.component.css']
})
export class ProviderProfileComponent extends BaseComponent implements OnInit {
  model: ProviderProfileModel = new ProviderProfileModel();
  @ViewChild('childModal') public modal: ModalDirective;
  sliders: any = [];
  constructor(authService: AuthenticationService,
    private service: ProviderProfileService,
    private serviceBadge: ProviderBadgeService) {
    super(authService);
  }

  ngOnInit() {
    //this.getEntity(this.currentUser.Id);
  }

  getEntity(id) {
    this.model = new ProviderProfileModel();
    this.service.GetIncludeById(id).subscribe(r => {
      if (r)
        this.model = r;
      if (this.model && this.model.ProviderUser && !this.model.ProviderUser.ProfilePicture) {
        this.model.ProviderUser.ProfilePicture = "https://umedoc-prod.s3.amazonaws.com/RandomFiles/umedoc-defaultavatar.png";
      }
    });
  }

  show(id) {
    this.getEntity(id);
    this.getSliders(id);
    this.modal.show();
  }

  hide() {
    this.modal.hide();
  }

  getProviderBarges(id) {

  }

  getSliders(id) {
    this.sliders = [];
    this.serviceBadge.GetByProviderID(id).subscribe(r => {
      if (r) {
        var imgObjects = r.map(x => {
          return {
            image: x,
            thumbImage: x,
            title: ''
          }
        });

        this.sliders = imgObjects;
      }
    });
  }

}
