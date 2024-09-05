import { AppointmentDraftNoteModel } from './../../../../common/models/appointment-draft-note.model';
import { Component, OnInit, EventEmitter, ViewChild, Output, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { BaseComponent } from 'src/app/modules/base.component';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { AppointmentNoteModel } from 'src/app/modules/common/models/appointment-note.model';
import { PreviewPdfComponent } from '../preview-pdf/preview-pdf.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { AppointmentNoteService } from 'src/app/modules/common/services/appointment-note.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
import { AddIcdModalComponent } from '../../requested-appointments/add-icd-modal/add-icd-modal.component';
declare var $: any;
@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent extends BaseComponent implements OnInit {
  model: AppointmentNoteModel;
  @ViewChild('childModal') public modal: ModalDirective;
  @ViewChild('f') public form: NgForm;
  @ViewChild('pdfViewer') pdfViewer: PreviewPdfComponent;
  @ViewChild('icdModal') icdModal: AddIcdModalComponent;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  Submitting: boolean = false;
  appDoc: any;
  appNotify: any;
  @Input() isClinicalNoteModal: boolean;
  draftNote: AppointmentDraftNoteModel;
  constructor(
    private authService: AuthenticationService,
    private service: AppointmentNoteService,
    private dialog: CommonDialogService,
    private appointmentService: AppointmentService
  ) {
    super(authService);
    this.model = new AppointmentNoteModel();
  }



  ngOnInit() {
    this.model = new AppointmentNoteModel();
    // this.model.IsRelease = true;
    $('[data-toggle="popover"]').popover();
  }

  savedICDModal(event) {
    this.Submitting = true;
    let note = event;
    this.appointmentService.ViewCompletedNotes(note).subscribe(r => {
      if (r) {
        this.Submitting = false;
        this.pdfViewer.content = r;
        this.pdfViewer.AppointmentID = this.model.AppointmentID;
        this.pdfViewer.note = note;
        this.pdfViewer.show();
      }
    }, error => {
      this.Submitting = false;
      this.dialog.showSwalErrorAlert('Error', MessageConstant.FAILURE_REQUEST);
    });
  }

  save() {
    this.Submitting = true;
    this.addDraftNote(this.model);
    if (!this.isClinicalNoteModal) {
      this.model.IsFollowUp = false;
      this.model.IsClinicalNote = false;
      //save
      this.service.Create(this.model).subscribe(result => {
        if (result) {
          this.Submitting = false;
          this.closeModal.emit(true);
          this.hide();
        }
      }, error => {
        this.Submitting = false;
        this.dialog.showSwalErrorAlert('Error', error.error);
      });
    }
    else {
      this.Submitting = false;
      this.model.IsClinicalNote = true;
      var note = Object.assign({}, this.model);
      this.icdModal.model = note;
      this.icdModal.show();
    }
  }

  hide() {
    this.Submitting = false;
    this.form.resetForm();
    this.modal.hide();
  }

  show(referenceId) {
    this.model = new AppointmentNoteModel();
    this.model.AppointmentID = referenceId;
    this.loadDrafNote(referenceId);
    this.modal.show();
  }

  setDraftNote(){
    if(this.draftNote){
      this.model.Plan = this.draftNote.Plan;
      this.model.Subjective = this.draftNote.Subjective;
      this.model.FollowUp = this.draftNote.FollowUp;
    }
  }

  addDraftNote(note: AppointmentNoteModel){
    if(note?.FollowUp || note?.Plan || note.Subjective){
      const entity = new AppointmentDraftNoteModel();
      entity.Plan = note.Plan;
      entity.AppointmentID = note.AppointmentID;
      entity.FollowUp = note.FollowUp;
      entity.Subjective = note.Subjective;
      this.service.SaveDraftNote(entity).subscribe(r=>{
        this.loadDrafNote(this.model.AppointmentID);
      });
    }
  }

  loadDrafNote(appointmentId){
    if(appointmentId){
      this.service.LoadDraftNote(appointmentId).subscribe(r=>{
        this.draftNote = r;
      });
    }
  }

}

