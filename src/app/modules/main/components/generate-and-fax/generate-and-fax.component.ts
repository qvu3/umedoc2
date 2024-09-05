import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AppointmentService } from '../../../common/services/appointment.service';  
import { FaxDocumentCompanyComponent } from '../fax-document-company/fax-document-company.component';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { AddNoteComponent } from '../note/add-note/add-note.component';
import { AppointmentDocumentService } from 'src/app/modules/common/services/appointment-document.service';
import { UtilityService } from 'src/app/modules/common/services/utility.service';

@Component({
  selector: 'app-generate-and-fax',
  templateUrl: './generate-and-fax.component.html',
  styleUrls: ['./generate-and-fax.component.css']
})
export class GenerateAndFaxComponent implements OnInit {  
  @Input() appointmentId: string;
  @ViewChild('faxDoc') modal: FaxDocumentCompanyComponent;
  @ViewChild('addNote') addNoteModal: AddNoteComponent;
  constructor(private service: AppointmentService,
    private  appointmentDocumentService:AppointmentDocumentService,
    private dialog: CommonDialogService,
    private utilityService:UtilityService
   ) { }

  ngOnInit() {
  }

  closeFax(event) {
    this.utilityService.needRefreshDocNotify();
  }

  generatePdf() {
    this.dialog.showSwalConfirmAlert( 'Are you sure you want to generate the PDF file?'
    )
      .then((isConfirmed) => {
        if (isConfirmed) {
          this.appointmentDocumentService.GeneratePDF(this.appointmentId).subscribe(r => {
            if (r) { 
              this.utilityService.needRefresh();
              this.dialog.showSwalSuccesAlert( 'Generate PDF',   "Execute your request successful" );
            }
          }, error => {  
            this.dialog.showSwalErrorAlert('Generate PDF', "Occured error during execute your request." );
          })
        }
      });
  }

  faxDocument() {
    this.modal.show();
  }

  addClinicalNote() {  
    this.addNoteModal.show(this.appointmentId);
  }
}
