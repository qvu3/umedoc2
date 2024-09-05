import { CommonDialogService } from './../../services/dialog.service';
import { AuthenticationService } from './../../services/authentication.service';
import { TicketService } from './../../services/ticket.service';
import { TicketModel } from './../../models/ticket.model';
import { BaseComponent } from './../../../base.component';
import { MessageConstant } from './../../constant/message.const';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-new-ticket-modal',
  templateUrl: './new-ticket-modal.component.html',
  styleUrls: ['./new-ticket-modal.component.css']
})
export class NewTicketModalComponent extends BaseComponent implements OnInit {
  public model: TicketModel = new TicketModel();
  editor: any;
  @ViewChild('childModal') public modal!: ModalDirective;
  @ViewChild('f') public form!: NgForm;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  Submitting: boolean = false;

  // Updated for ng-select
  userData: Array<{ id: string, name: string }> = [];  // Data for ng-select

  constructor(
    private service: TicketService,
    public authService: AuthenticationService,
    private dialog: CommonDialogService) {
    super(authService);
    this.model = new TicketModel();
  }

  override ngOnInit(): void {
    // Initialization logic if needed
  }

  // Fetch patient users and map to ng-select compatible format
  getPatientUser() {
    this.service.GetPatientUsers().subscribe(r => {
      if (r) {
        this.userData = r.map(x => ({
          id: x.Id, 
          name: `${x.FirstName} ${x.LastName}`
        }));
        this.modal.show();
      }
    }, error => {
      this.dialog.showSwalErrorAlert('Error', 'Cannot load patient list, please try again.');
    });
  }

  save() {
    this.Submitting = true;
    this.service.Create(this.model).subscribe(result => {
      if (result) {
        this.Submitting = false;
        this.dialog.showSwalSuccesAlert('Ticket', MessageConstant.REQUEST_SUCCESS_CONST);
        this.hide();
        this.closeModal.emit(true);
      } else {
        this.Submitting = false;
        this.dialog.showSwalErrorAlert('Ticket', MessageConstant.FAILURE_REQUEST);
      }
    }, error => {
      this.Submitting = false;
      this.dialog.showSwalErrorAlert('Error', error.error);
    });
  }

  show() {
    this.model = new TicketModel();
    this.getPatientUser();
  }

  hide() {
    this.form.resetForm();
    this.modal.hide();
  }
}
