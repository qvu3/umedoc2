import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { AppointmentNoteModel } from 'src/app/modules/common/models/appointment-note.model';
import { AppointmentDocumentService } from 'src/app/modules/common/services/appointment-document.service';
import { BaseComponent } from 'src/app/modules/base.component';
import { UtilityService } from 'src/app/modules/common/services/utility.service';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
declare var $: any;
@Component({
  selector: 'app-preview-pdf',
  templateUrl: './preview-pdf.component.html',
  styleUrls: ['./preview-pdf.component.css']
})
export class PreviewPdfComponent extends BaseComponent implements OnInit {
  @ViewChild('childModal') modal: ModalDirective;
  @Output() onClosed: EventEmitter<any> = new EventEmitter();
  @Output() onSaved: EventEmitter<any> = new EventEmitter();
  content: any;
  AppointmentID: string = "";
  isView: boolean = false;
  note: AppointmentNoteModel;
  IsSubmitting: boolean = false;
  constructor(
    private utilityService: UtilityService,
    authService: AuthenticationService,
    private appointmentDocumentService: AppointmentDocumentService,
    private dialog: CommonDialogService,
    private router: Router) {
    super(authService);
  }

  ngOnInit() {
  }

  show() {
    this.modal.show();
  }

  hide() {
    this.onClosed.emit(this.note);
    this.modal.hide();
  }

  generatePDF() {
    this.IsSubmitting = true;
    if (this.note) {
      this.appointmentDocumentService.GeneratePDFClinical(this.note).subscribe(r => {
        if (r) {
          this.IsSubmitting = false;
          this.utilityService.needRefresh();
          this.dialog.showSwalSuccesAlert('Generate PDF', "Execute your request successful");
          this.onSaved.emit(true);
          this.modal.hide();
        }
      }, error => {
        this.IsSubmitting = false; 
        this.dialog.showSwalErrorAlert('Generate PDF', "Occured error during execute your request.");
      });
    }
  }
}
