import {
  Directive,
  Input,
  AfterViewInit,
  ElementRef,
  EventEmitter,
  Output,
  ChangeDetectorRef, OnChanges, SimpleChanges, ViewChild
} from '@angular/core';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import Global from '../../../Global';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MessageChatModel } from '../models/message-chat.model';

declare var $: any;
@Directive({
  selector: '[appFileUpload]',
})
export class FileUploadDirective implements AfterViewInit, OnChanges {
  @Input() link: string;
  @Input() ModelID: string;
  @Output() addedFiles: EventEmitter<any> = new EventEmitter();
  @Input() additionalData: any;
  @Output() onStart: EventEmitter<any> = new EventEmitter();
  @Output() onCallback: EventEmitter<any> = new EventEmitter();
  @Output() onErrorCallback: EventEmitter<any> = new EventEmitter();
  @Input() typeUpload: string;
  @Input() fileType: number = 0; //0: image 1 pdf
  @Input() patientID: string;
  @Input() providerID: string;
  uploading: boolean = false;
  @Input() appointmentID: string;
  @Input() userId: string;
  @Input() roomId: string;

  @Input() groupApptID: string;

  @BlockUI() blockUI: NgBlockUI;
  fileName: string;
  messageId: string;
  constructor(
    private dialog: CommonDialogService,
    private ele: ElementRef,
    public cdRef: ChangeDetectorRef
  ) { }

  ngOnChanges(params: SimpleChanges) {
    if (params && params.patientID && params.patientID.currentValue) {
      console.log(this.patientID);
    }
  }

  ngAfterViewInit() {
    this.RegisterFileUPload();
  }

  RegisterFileUPload() {
    var option = {
      url: `${Global.apiUrl}${this.link}`,
      acceptFileTypes: /(\.|\/)(gif|png|jpeg|jpg|xlxs)$/i,
      singleFileUploads: false,
      autoUpload: false,
      dropZone: $(this.ele.nativeElement),
      formData: this.additionalData ? this.additionalData : {},
      add: function (e, data){
        var uploadErrors = [];
        var acceptFileTypes;
        if (this.fileType == 0) {
          acceptFileTypes = /^image\/(gif|jpeg|jpg|png)$/i
        }
        else {
          acceptFileTypes = /(\.|\/)(pdf|doc|docx|png|gif|jpg|jpeg|xml)$/i
        }
        if (data.originalFiles) {
          data.originalFiles.forEach(element => {
            if (element['type'] && !acceptFileTypes.test(element['type']) && element['type'] != 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
              uploadErrors.push(this.fileType == 0 ? 'File types must be: PNG,GIF,JPEG,JPG'
                : 'File types must be: Pdf, Doc, Docx, Png, Gif, Jpg, Jpeg');
            }
            if (element['size'] && element['size'] > 15000000) {
              uploadErrors.push('Maximum file size is 15MB');
            }
          });

          if (uploadErrors.length > 0) {
            this.dialog.showSwalErrorAlert('Error', uploadErrors.join('\n'));
            return;
          } else {
            if (data && data.files.length > 0) {
              if (this.uploading) {
                this.dialog.showToastrError(
                  'Upload file',
                  'Uploading, Please Wait....'
                );
                return;
              }
              this.uploading = true;

              if (this.typeUpload == 'chat_file') {
                var mimeType = data.originalFiles[0].type;
                var message = new MessageChatModel();
                message.ID = this.messageId = this.uuidv4();
                message.IsFile = true;
                message.MineType = mimeType;
                this.onStart.emit(message);
              }
              else {
                this.onStart.emit('');
              }
              if (this.typeUpload == 'add_patient_import') {
                this.uploading = false;
                data.files[0].text().then(r=>{
                  this.onCallback.emit(r);
                });

                return;
              }
              if (this.typeUpload != 'patient_storage') {
                data.submit();
              }
              else {
                var name = data.files[0].name;
                this.dialog.showSwalConfirmGetNameFile(name)
                  .then(result => {
                    this.fileName = result;
                    data.submit();
                  }, error => {
                    this.uploading = false;
                  });
              }
            }
          }
        }
      }.bind(this),

      beforeSend: function (xhr) {
        if (this.typeUpload != 'chat_file') {
          this.blockUI.start('Uploading...');
        }
        if (this.typeUpload == 'chat_file') {
          xhr.setRequestHeader('MessageID', this.messageId)
          xhr.setRequestHeader('UserID', this.userId);
          xhr.setRequestHeader('RoomID', this.roomId);
          xhr.setRequestHeader('CompanyID', Global.CompnayID);
        }
        else if (this.typeUpload == 'patient_storage') {
          xhr.setRequestHeader('PatientID', this.patientID);
          xhr.setRequestHeader('CompanyID', Global.CompnayID);
          xhr.setRequestHeader('FileName', this.fileName);
        }
        else if (this.typeUpload == 'provider_storage') {
          xhr.setRequestHeader('ProviderID', this.providerID);
          xhr.setRequestHeader('CompanyID', Global.CompnayID);
        } else if (this.typeUpload == 'group_appt_storage') {
          xhr.setRequestHeader('GroupApptID', this.groupApptID);
          xhr.setRequestHeader('CompanyID', Global.CompnayID);
        }
        xhr.setRequestHeader('AppointmentID', this.appointmentID ?? '');
        xhr.setRequestHeader('IDObject', this.ModelID ? this.ModelID : '');
        xhr.setRequestHeader('UploadType', this.typeUpload);
        xhr.setRequestHeader('Upload-Type', this.typeUpload);
        xhr.setRequestHeader('Authorization', Global.getToken());
      }.bind(this),
      success: function (result, textStatus, jqXHR) {
        if (this.typeUpload != 'chat_file') {
          this.blockUI.stop();
        }
        if (result) {
          if (this.typeUpload == 'patient_storage' || this.typeUpload == 'provider_license' || this.typeUpload == 'provider_storage'
            || this.typeUpload == 'chat_file') {
            result = result;
          }
          else {
            result = this.typeUpload != "appointment_image" ? `${result}?time=${new Date().toJSON()}` : result;
          }
          this.onCallback.emit(result);
          if (this.typeUpload != 'chat_file') {
            this.dialog.showSwalSuccesAlert(
              'Upload File',
              'Your file has been Uploaded!'
            );
          }
        }
        this.uploading = false;
      }.bind(this),
      fail: function (e, data) {
        this.blockUI.stop();
        this.uploading = false;
        if (this.typeUpload == 'chat_file') {
          this.onErrorCallback.emit(this.messageId);
        }
        else {
          this.onErrorCallback.emit(false);
        }
        this.dialog.showSwalErrorAlert(
          'Error',
          'Upload Failed!'
        );
      }.bind(this)
    };
    var element = $(this.ele.nativeElement);
    element.fileupload(option);
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
