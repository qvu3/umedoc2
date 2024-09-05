import { AppointmentDraftNoteModel } from './../../../../common/models/appointment-draft-note.model';
import { Component, OnInit, EventEmitter, ViewChild, Output, Input } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { AppointmentNoteModel } from 'src/app/modules/common/models/appointment-note.model';;
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { AppointmentNoteService } from 'src/app/modules/common/services/appointment-note.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
import { PreviewPdfComponent } from '../../note/preview-pdf/preview-pdf.component';
import { NgForm } from '@angular/forms';
import { AddIcdModalComponent } from '../add-icd-modal/add-icd-modal.component';
import { ApptNoteICDCodeAssignementModel } from 'src/app/modules/common/models/appointment-note-icd-assigment.model';
declare var $: any;
@Component({
  selector: 'app-add-note-info',
  templateUrl: './add-note-info.component.html',
  styleUrls: ['./add-note-info.component.css']
})
export class AddNoteInfoComponent extends BaseComponent implements OnInit {
  model: AppointmentNoteModel;
  @Input() appointmentID: string;
  @ViewChild('f') public form: NgForm;
  @ViewChild('pdfViewer') pdfViewer: PreviewPdfComponent;
  @ViewChild('icdModal') icdModal: AddIcdModalComponent;
  Submitting: boolean = false;
  appDoc: any;
  appNotify: any;
  totalNote: number = 0;
  icdAssinged: ApptNoteICDCodeAssignementModel;
  draftNote:AppointmentDraftNoteModel;
  constructor(
    private authService: AuthenticationService,
    private service: AppointmentNoteService,
    private dialog: CommonDialogService,
    private appointmentService: AppointmentService,
  ) {
    super(authService);
  }

  ngOnInit() {
    this.model = new AppointmentNoteModel();
    this.model.AppointmentID = this.appointmentID;
    $('[data-toggle="popover"]').popover();
    this.getNotes();
    this.loadDrafNote(this.appointmentID);
  }

  getNotes() {
    this.service.CountAppointmentNote(this.appointmentID).subscribe(r => {
      this.totalNote = r;
    })
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
        this.loadDrafNote(this.appointmentID);
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

  save() {
    this.model.IsClinicalNote = true;
    var note = Object.assign({}, this.model);
    this.addDraftNote(note);

    this.form.resetForm();
    this.icdModal.model = note;
    this.icdModal.show();
  }

  cancelICDModal(event) {
    this.model = event;
  }

  cancelGeneratePDF(event) {
    this.model = event;
  }

  savedPDF(event) {
    this.getNotes();
  }
}

