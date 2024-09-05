import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/modules/base.component';
import { MessageConstant, NameExtension } from 'src/app/modules/common/constant/message.const';
import { ProviderProfileModel } from 'src/app/modules/common/models/provider-profile.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { ProviderProfileService } from 'src/app/modules/common/services/provider-profile.service';

@Component({
  selector: 'app-provider-personal-info',
  templateUrl: './provider-personal-info.component.html',
  styleUrls: ['./provider-personal-info.component.css']
})
export class ProviderPersonalInfoComponent extends BaseComponent implements OnInit {
  model: ProviderProfileModel = new ProviderProfileModel();
  Submitting: boolean = false;
  prefixes = NameExtension.prefixes;
  suffixes = NameExtension.suffixes;
  isStaff: boolean = false;
  userId: string;
  constructor(authService: AuthenticationService,
    private service: ProviderProfileService,
    private router: Router,
    private dialog: CommonDialogService,
    private cdChanged: ChangeDetectorRef,
    private activeRouter: ActivatedRoute
  ) {
    super(authService);
    activeRouter.parent.params.subscribe(r => {
      if (r && r['{id}']) {
        this.isStaff = true;
        this.userId = r['{id}'];
      }
      else {
        this.userId = this.currentUser.Id;
      }
    });
  }

  ngOnInit() {
    this.getEntity(this.userId);
  }

  getEntity(id) {
    this.model = new ProviderProfileModel();
    this.service.GetIncludeById(id).subscribe(r => {
      if (r)
        this.model = r;
      if (this.model && this.model.ProviderUser) {
        this.model.ProviderUser.ProfilePicture = this.model.ProviderUser.ProfilePicture ?? "https://umedoc-prod.s3.amazonaws.com/RandomFiles/umedoc-defaultavatar.png";
        this.model.ProviderUser.Prefix = this.model.ProviderUser.Prefix ?? "";
        this.model.ProviderUser.Suffix = this.model.ProviderUser.Suffix ?? "";
      }
    });
  }

  scrollToErrorField(f: NgForm) {
    if (f.form && f.form && f.form.controls) {
      var errorControlKey = null;
      var keys = Object.keys(f.form.controls);
      if (keys) {
        keys.forEach(key => {
          let control = f.form.controls[key];
          if (control && control.invalid) {
            errorControlKey = key;
            return;
          }
        });
      }
      if (errorControlKey) {
        var control = document.getElementsByName(errorControlKey);
        if (control) {
          $('html, body').animate({
            scrollTop: $(control).offset().top
          }, 200);
          this.dialog.showToastrError('Error', 'Update Failed');
        }
      }
    }
    return f.submitted;
  }

  save() {
    this.Submitting = true;
    this.service.UpdatePersonalInfo(this.model).subscribe(r => {
      if (r) {
        this.authenticationService.UpdateCurrentInfo(this.model.ProviderUser);
        this.dialog.showToastrSuccess('Edit My Profile', MessageConstant.EDIT_SCCCESS_CONST);
      }
      else {
        this.dialog.showToastrError('Edit My Profile', MessageConstant.FAILURE_REQUEST);
      }

      this.Submitting = false;
    }, error => {
      var message = error?.error ?? MessageConstant.FAILURE_REQUEST;
      this.dialog.showToastrError('Edit My Profile', message);
    });
  }

  cancel() {
    if (this.isStaff) {
      this.router.navigate(['/management/manage-staffs']);
    }
    else {
      this.router.navigate(['/management/my-profile']);
    }
  }
}