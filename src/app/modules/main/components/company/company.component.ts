import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { CompanyService } from 'src/app/modules/common/services/company.service';
import { BaseComponent } from 'src/app/modules/base.component';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyModel } from 'src/app/modules/common/models/company.model';
import Global from 'src/app/Global';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  providers: [DatePipe]
})
export class CompanyComponent extends BaseComponent implements OnInit {
  Submitting: boolean = false;
  activeTab: string = "CompanyInfo"
  id: string;
  model: CompanyModel = new CompanyModel();
  constructor(
    authService: AuthenticationService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private dialog: CommonDialogService,
    private service: CompanyService,
  ) {
    super(authService);
    this.id = Global.CompnayID;
    activeRoute.queryParams.subscribe(r => {
      if (r["activeTab"]) {
        this.activeTab = r["activeTab"];
        this.clickTab(this.activeTab);
      }
    })

    this.getEntity(this.id);
  }

  ngOnInit() {

  }

  getEntity(id) {
    this.service.GetById(id).subscribe(result => {
      if (result) {
        this.model = result;
      } else {
        this.router.navigateByUrl(`/`);
      }
    });
  }

  clickTab(tabName) {
    this.router.navigateByUrl(`/management/company-settings?activeTab=${tabName}`);
  }
}
