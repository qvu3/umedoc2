import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { BaseComponent } from '../../../base.component';
import { AuthenticationService } from '../../../common/services/authentication.service'; 
import { UtilityService } from '../../../common/services/utility.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { AppointmentNoteModel } from 'src/app/modules/common/models/appointment-note.model';
import { AppointmentDocumentService } from 'src/app/modules/common/services/appointment-document.service';
declare var $: any;
@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.css']
})
export class DocumentViewerComponent extends BaseComponent implements OnInit {
  @ViewChild('childModal') modal: ModalDirective;
  @Output() onClosed: EventEmitter<any> = new EventEmitter();
  pdfSrc: any;
  referenceID: string = ""; 
  isView: boolean = false;
  note: AppointmentNoteModel;
  constructor(
    private utilityService:UtilityService,
    private authService: AuthenticationService,
    private appointmentDocumentService:AppointmentDocumentService,
    private dialog: CommonDialogService) {
    super(authService);
  }

  ngOnInit() {
  }

  show() {
    this.modal.show();
  }

  hide() {
    this.modal.hide();
  }

  generatePDF() {
    if (this.note) {
      this.appointmentDocumentService.GeneratePDFClinical(this.note).subscribe(r => {
        if (r) {
          this.utilityService.needRefresh(); 
          this.dialog.showSwalSuccesAlert( 'Generate PDF', "Execute your request successful" );
          this.hide(); 
        }
      }, error => { 
        this.dialog.showSwalErrorAlert( 'Generate PDF',   "Occured error during execute your request." );
      });
    }
  }
}
