import { Component, OnInit, Input } from '@angular/core';
import { CompanyModel } from 'src/app/modules/common/models/company.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { CompanyService } from 'src/app/modules/common/services/company.service';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { BaseComponent } from 'src/app/modules/base.component';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';

@Component({
  selector: 'app-company-setting',
  templateUrl: './company-setting.component.html',
  styleUrls: ['./company-setting.component.css']
})
export class CompanySettingComponent extends BaseComponent implements OnInit {
  @Input() model: CompanyModel;
  Submitting: boolean = false;
  constructor(
    private authService: AuthenticationService,
    private service: CompanyService,
    private dialog: CommonDialogService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    super(authService);
    if (!this.model) {
      this.model = new CompanyModel();
    }
  }

  ngOnInit() {

  }

  save() {
    this.Submitting = true;
    this.service.Edit(this.model).subscribe(result => {
      if (result) {
        this.Submitting = false;
        this.dialog.showToastrSuccess('Edit Company', MessageConstant.EDIT_SCCCESS_CONST);
        this.router.navigate([`/management/company-settings?activeTab=CompanyInfo`]);
      }
    }, error => {
      this.Submitting = false;
      this.dialog.showSwalErrorAlert('Error', error.error);
    });
  }

  cancel() {
    this.router.navigate([`/management/home`]);
  }
}

