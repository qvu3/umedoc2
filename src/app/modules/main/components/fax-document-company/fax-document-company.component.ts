import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { AppointmentDocumentModel } from '../../../common/models/appointment-document.model';
import { ModalDirective } from 'ngx-bootstrap';
import { AppointmentDocumentService } from '../../../common/services/appointment-document.service';
import { NgForm } from '@angular/forms';
import { BaseComponent } from '../../../base.component';
import { AuthenticationService } from '../../../common/services/authentication.service';
import { FaxPDFModel } from 'src/app/modules/common/models/srfax-pdf.model';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { CompanyService } from 'src/app/modules/common/services/company.service';

@Component({
  selector: 'app-fax-document-company',
  templateUrl: './fax-document-company.component.html',
  styleUrls: ['./fax-document-company.component.css']
})
export class FaxDocumentCompanyComponent extends BaseComponent implements OnInit {
  @ViewChild('childModal') modal: ModalDirective;
  @ViewChild('f') form: NgForm;
  @Input() appointmentId: string;
  @Input() documentId: string;
  @Output() onClosed: EventEmitter<boolean> = new EventEmitter();
  documents: Array<AppointmentDocumentModel> = new Array<AppointmentDocumentModel>();
  model: FaxPDFModel = new FaxPDFModel();

  CompanyFaxNumber: string;
  CompanyName: string;
  constructor(private service: AppointmentDocumentService,
    private dialog: CommonDialogService,
    private companyService: CompanyService,
    public authService: AuthenticationService) {
    super(authService);
  }

  ngOnInit() {
    this.getCompanyInfo();
  }

  show() {
    this.getCompanyInfo();
    this.model = new FaxPDFModel();
    this.model.IsFaxToCompany = true;
    if (this.documentId) {
      this.model.AppointmentDocumentID = this.documentId;
    } else {
      this.model.AppointmentDocumentID = '';
    }

    this.getDocument();
    this.modal.show();
  }

  hide() {
    this.form.reset();
    this.modal.hide();
  }

  getDocument() {
    this.documents = [];
    if (this.appointmentId) {
      this.service.GetByAppointmentId(this.appointmentId).subscribe(r => {
        if (r) {
          this.documents = r;
        }
      })
    }
  }

  save() {
    if (this.model.IsFaxToCompany) {
      this.model.CompanyFaxNumber = this.CompanyFaxNumber;
    }

    this.service.FaxPDF(this.model).subscribe(r => {
      if (r) {
        this.onClosed.emit(true);
        this.hide();
        this.dialog.showSwalSuccesAlert('Fax PDF', "Your document is in the faxing queue!");
      }
    }, error => {
      this.onClosed.emit(true);
      this.dialog.showSwalErrorAlert('Fax PDF', "Occured error during execute your request.");
    })
  }

  getCompanyInfo() {
    if (this.currentUser.CompanyID) {
      this.companyService.GetById(this.currentUser.CompanyID).subscribe(r => {
        if (r) {
          this.CompanyName = r.CompanyName;
          this.CompanyFaxNumber = r.FaxNumber;
        }
      })
    }

  }

}
