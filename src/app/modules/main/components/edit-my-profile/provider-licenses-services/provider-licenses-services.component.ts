import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';

@Component({
  selector: 'app-provider-licenses-services',
  templateUrl: './provider-licenses-services.component.html',
  styleUrls: ['./provider-licenses-services.component.css']
})
export class ProviderLicensesServicesComponent extends BaseComponent implements OnInit {

  constructor(authService: AuthenticationService
  ) {
    super(authService);

  }

  ngOnInit() {

  }
}

