import { Component, OnInit, Input, Output, EventEmitter, Provider, SimpleChanges, OnChanges } from '@angular/core';
import { ProviderProfileModel } from 'src/app/modules/common/models/provider-profile.model';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { AppointmentModel } from 'src/app/modules/common/models/appointment.model';


@Component({
  selector: '[app-select-provider]',
  templateUrl: './select-provider.component.html',
  styleUrls: ['./select-provider.component.css']
})
export class SelectProviderComponent extends BaseComponent implements OnInit , OnChanges {
  @Input() listProvider: Array<ProviderProfileModel>;
  @Input() appointment: AppointmentModel;
  @Output() onSelected: EventEmitter<string> = new EventEmitter();
  @Output() onViewProfile: EventEmitter<string> = new EventEmitter();
  selectProvider: ProviderProfileModel = new ProviderProfileModel();
  @Input() isSearching: boolean = false;
  constructor(authService: AuthenticationService) {
    super(authService);
  }

  ngOnChanges(params:SimpleChanges){
    if(params && params.listProvider && params.listProvider.currentValue && params.listProvider.currentValue != params.listProvider.previousValue){
      this.initSelectProvider();
    }
  }

  ngOnInit(): void {
    this.initSelectProvider();
  }

  initSelectProvider(){
    this.selectProvider = new ProviderProfileModel();
    if (this.appointment.ProviderID && this.listProvider && this.listProvider.length == 1) {
      this.selectProvider = this.listProvider[0];
    }
  }

  selectDoctor(provider: ProviderProfileModel) {
    provider.IsHideAppointment = false;
    this.selectProvider = provider;
    this.appointment.AppointmentTime = null;
    this.onSelected.emit(provider.ProviderID);
  }

  viewProfile(id) {
    this.onViewProfile.emit(id);
  }
}
