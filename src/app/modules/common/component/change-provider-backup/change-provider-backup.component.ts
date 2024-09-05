
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { BaseComponent } from 'src/app/modules/base.component';
import { MessageConstant } from '../../constant/message.const';
import { ProviderProfileViewModel } from '../../models/provider-profile-request.model';
import { ProviderProfileModel } from '../../models/provider-profile.model';
import { AppointmentService } from '../../services/appointment.service';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonDialogService } from '../../services/dialog.service';
import { ProviderProfileService } from '../../services/provider-profile.service';

@Component({
  selector: 'app-change-provider-backup',
  templateUrl: './change-provider-backup.component.html',
  styleUrls: ['./change-provider-backup.component.css']
})
export class ChangeProviderBackupComponent extends BaseComponent implements OnInit {
  @ViewChild('childModal') public modal: ModalDirective;
  @ViewChild('f') public form: NgForm;
  @Output() onClosed: EventEmitter<boolean> = new EventEmitter();
  @Output() onViewProfileProvider: EventEmitter<string> = new EventEmitter();
  Submitting: boolean = false;
  providers: Array<ProviderProfileViewModel> = new Array<ProviderProfileViewModel>()
  appointmentId: string = '';
  selectedProviderId: string;
  constructor(private providerProfileservice: ProviderProfileService,
    public authService: AuthenticationService,
    private dialog: CommonDialogService,
    private appointmentService: AppointmentService) {
    super(authService);
  }

  ngOnInit(): void {
  }

  showProfile(providerUserId) {
    this.onViewProfileProvider.emit(providerUserId);
  }

  getProviders(appointmentId) {
    this.providerProfileservice.GetBackupProviders(appointmentId).subscribe(r => {
      this.providers = r;
      this.modal.show();
    }, error => {
      this.dialog.showToastrError('Change Provider', MessageConstant.FAILURE_REQUEST);
    })
  }

  save() {
    this.Submitting = true;
    this.appointmentService.ChangeProvider(this.appointmentId, this.selectedProviderId).subscribe(r => {
      this.dialog.showToastrSuccess('Change Provider', MessageConstant.REQUEST_SUCCESS_CONST);
      this.onClosed.emit(true);
      this.hide();
      this.Submitting = false;
    }, error => {
      this.Submitting = false;
      this.dialog.showSwalErrorAlert('Error', MessageConstant.FAILURE_REQUEST);
    });
  }

  show(appointmentId) {
    this.appointmentId = appointmentId;
    this.getProviders(appointmentId);
  }

  hide() {
    this.form.resetForm();
    this.modal.hide();
  }

}
