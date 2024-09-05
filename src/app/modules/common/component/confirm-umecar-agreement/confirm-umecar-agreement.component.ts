import { CommonDialogService } from '../../services/dialog.service';
import { AuthenticationService } from '../../services/authentication.service';
import { NgForm } from '@angular/forms';
import { BaseComponent } from '../../../base.component';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-umecar-agreement',
  templateUrl: './confirm-umecar-agreement.component.html',
  styleUrls: ['./confirm-umecar-agreement.component.css']
})
export class ConfirmUmecarAgreementComponent  extends BaseComponent implements OnInit {
  public isAgreement: boolean = false;
  @ViewChild('childModal')
  public modal!: ModalDirective;
  @ViewChild('f')
  public form!: NgForm;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();

  constructor(
    public authService: AuthenticationService,
    private dialog: CommonDialogService) {
    super(authService);
  }

  override ngOnInit() {

  }

  save() {
    this.hide();
    this.closeModal.emit(true);

  }

  show() {
    this.isAgreement = false;
    this.modal.show();
  }

  hide() {
    this.form.resetForm();
    this.modal.hide();
  }
}
