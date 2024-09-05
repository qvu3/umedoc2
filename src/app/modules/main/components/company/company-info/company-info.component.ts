import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { CompanyService } from 'src/app/modules/common/services/company.service';
import { CompanyModel } from 'src/app/modules/common/models/company.model';
import { BaseComponent } from 'src/app/modules/base.component';
import { Router } from '@angular/router';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import Global from 'src/app/Global';
import { ProviderProfileService } from 'src/app/modules/common/services/provider-profile.service';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css']
})
export class CompanyInfoComponent extends BaseComponent implements OnInit {
  @Input() model: CompanyModel;
  Submitting: boolean = false;
  us_statelist: any;
  constructor(authService: AuthenticationService,
    private providerProfileService:ProviderProfileService,
    private dialog: CommonDialogService,
    private router: Router,
    private service: CompanyService) {
    super(authService);
    this.us_statelist = Global.US_StateList;
    if (!this.model) {
      this.model = new CompanyModel();
    }
  }

  ngOnInit() {

  } 
 

  cancel() {
    this.router.navigate([`/management/home`]);
  }

  save() {
    this.Submitting = true;
    this.service.Edit(this.model).subscribe(result => {
      if (result) {
        this.Submitting = false;
        this.dialog.showToastrSuccess('Edit Company', MessageConstant.EDIT_SCCCESS_CONST);
        this.router.navigate([`/management/company-settings/${this.model.ID}?activeTab=CompanyInfo`]);
      }
    }, error => {
      this.Submitting = false;
      this.dialog.showSwalErrorAlert('Error', error.error);
    });
  }
}

