import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'; 
import { ActivatedRoute, Router } from '@angular/router';
import Global from 'src/app/Global';
import { BaseComponent } from 'src/app/modules/base.component';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { ProviderProfileModel } from 'src/app/modules/common/models/provider-profile.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { ProviderProfileService } from 'src/app/modules/common/services/provider-profile.service';

@Component({
  selector: 'app-provider-address',
  templateUrl: './provider-address.component.html',
  styleUrls: ['./provider-address.component.css']
})
export class ProviderAddressComponent extends BaseComponent implements OnInit {
  model: ProviderProfileModel = new ProviderProfileModel();  
  Submitting: boolean = false; 
  us_statelist: any;
  userId:string="";
  isStaff:boolean=false;
  constructor(authService: AuthenticationService,
    private service: ProviderProfileService,
    private router: Router, 
    private dialog: CommonDialogService,
    private cdChanged: ChangeDetectorRef,
    private activeRouter:ActivatedRoute
  ) {
    super(authService); 
    activeRouter.parent.params.subscribe(r=>{
      if(r && r['{id}']){
        this.isStaff = true;
        this.userId = r['{id}'];
      }
      else{
        this.userId = this.currentUser.Id;
      }
    });
  }

  ngOnInit() {
    this.us_statelist = Global.US_StateList;
    this.getEntity(this.userId); 
  } 

  getEntity(id) {
    this.model = new ProviderProfileModel();
    this.service.GetIncludeById(id).subscribe(r => {
      if (r)
        this.model = r; 
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
        this.dialog.showToastrSuccess('Edit Address Info', MessageConstant.EDIT_SCCCESS_CONST);
      }
      else {
        this.dialog.showToastrError('Edit Address Info', MessageConstant.FAILURE_REQUEST);
      }

      this.Submitting = false;
    }, error => {
      this.dialog.showToastrError('Edit Address Info', MessageConstant.FAILURE_REQUEST);
    });
  }

  cancel(){
    if(this.isStaff){
      this.router.navigate([ '/management/manage-staffs']);
    }
    else{
      this.router.navigate([ '/management/my-profile']);
    }
  }
}