import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import Global from '../../../../Global';
import { CommonDialogService } from '../../services/dialog.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
declare var $: any;

@Component({
  selector: 'app-crop-image',
  templateUrl: './crop-image.component.html',
  styleUrls: ['./crop-image.component.css']
})
export class CropImageComponent implements OnInit {
  @Input() link!: string;
  @Input() ModelID!: string;
  @Input() typeUpload!: string;
  @ViewChild('childModal') modal!: ModalDirective;
  $image: any;
  $inputImage: any;
  Submitting: boolean = false;
  urlFinal: string = '';
  @Output() onClose: EventEmitter<string> = new EventEmitter();
  @BlockUI() blockUI!: NgBlockUI;

  constructor(private dialog: CommonDialogService) { }

  ngOnInit() {
    this.register();
  }

  register() {
    let ratio = NaN;
    if (this.typeUpload != 'logo') {
      ratio = this.typeUpload == 'user' ? (1 / 1) : (3 / 2);
    }

    const options = {
      aspectRatio: ratio,
      autoCropArea: 0.7,
      viewMode: 1
    };

    this.$image = $('#image').cropper(options);
    this.registerImageBold();
  }

  registerImageBold() {
    this.$inputImage = $('#inputImage');
    const URL = window.URL;

    if (URL) {
      this.$inputImage.change((event: any) => {
        const files = this.$inputImage[0].files;
        let file;

        if (!this.$image.data('cropper')) {
          return;
        }

        if (files && files.length) {
          file = files[0];
          if (file.size && file.size > 5000000) {
            this.$inputImage.val('');
            this.dialog.showSwalErrorAlert('Error', 'Maximum file size is 5MB');
          } else if (/^image\/\w+$/.test(file.type)) {
            this.urlFinal = URL.createObjectURL(file);
            this.$image.one('built.cropper', () => {
              URL.revokeObjectURL(this.urlFinal);
            }).cropper('reset').cropper('replace', this.urlFinal);
            this.$inputImage.val('');
          } else {
            this.$inputImage.val('');
            this.dialog.showSwalErrorAlert('Error', 'Please choose an image file.');
          }
        }
      });
    } else {
      this.$inputImage.prop('disabled', true).parent().addClass('disabled');
    }
  }

  cropImage() {
    this.$image.cropper('getCroppedCanvas').toBlob((blob: Blob | MediaSource) => {
      if (blob) {
        const url = window.URL.createObjectURL(blob);
        this.urlFinal = url;
        this.$image.one('built.cropper', () => {
          URL.revokeObjectURL(url);
        }).cropper('reset').cropper('replace', url);
        this.$inputImage.val('');
      }
    });
  }

  cropImageAndSave() {
    if (this.Submitting) return;
    this.Submitting = true;
    this.$image.cropper('getCroppedCanvas').toBlob((blob: Blob | MediaSource | null) => {
      this.blockUI.start();
      if (blob && blob instanceof Blob) {  // Type guard to ensure blob is a Blob
        const url = window.URL.createObjectURL(blob);
        this.urlFinal = url;
        this.$image.one('built.cropper', () => {
          URL.revokeObjectURL(url);
        }).cropper('reset').cropper('replace', url);
        this.$inputImage.val('');
  
        const myBlob = this.blobToFile(blob, 'avatar_file_.png');
        if (myBlob) {
          const formData = new FormData();
          formData.append('croppedImage', myBlob, "croppedImage.png");
          const serverUrl = `${Global.apiUrl}${this.link}`;
  
          $.ajax(serverUrl, {
            method: "POST",
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: (xhr: { setRequestHeader: (arg0: string, arg1: string) => void; }) => {
              xhr.setRequestHeader('IDObject', (this.ModelID ? this.ModelID : ''));
              xhr.setRequestHeader('Upload-Type', this.typeUpload);
              xhr.setRequestHeader('Authorization', Global.getToken());
            },
            success: (result: string | undefined) => {
              this.Submitting = false;
              this.blockUI.stop();
              if (result) {
                result = `${result}?time=${new Date().toJSON()}`;
                this.onClose.emit(result);
                this.hide();
                this.dialog.showSwalSuccesAlert(`Upload Image`, "Your Image uploaded successfully.");
              }
            },
            error: () => {
              this.Submitting = false;
              this.blockUI.stop();
              this.hide();
              this.dialog.showSwalErrorAlert(`Error`, 'Occured error during upload your image.');
            },
          });
        } else {
          this.Submitting = false;
          this.blockUI.stop();
          this.dialog.showSwalErrorAlert(`Error`, 'Occured error during upload your image.');
        }
      } else {
        this.Submitting = false;
        this.blockUI.stop();
      }
    });
  }
  

  blobToFile = (theBlob: Blob, fileName: string): File => {
    const blobAsFile = new Blob([theBlob], { type: theBlob.type }) as any;
    blobAsFile.lastModifiedDate = new Date();
    blobAsFile.name = fileName;
    return blobAsFile as File;
  }

  saveImage() {
    if (this.urlFinal) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', this.urlFinal, true);
      xhr.responseType = 'blob';
      xhr.onload = (e: any) => {
        this.blockUI.start('Processing your request...'); // Start blocking
        if (e && e.currentTarget && e.currentTarget.status == 200) {
          const dataBlod = e.currentTarget.response;
          const myBlob = this.blobToFile(dataBlod, 'avatar_file_.png');
          if (myBlob) {
            const formData = new FormData();
            formData.append('croppedImage', myBlob, "croppedImage.png");
            const serverUrl = `${Global.apiUrl}${this.link}`;

            $.ajax(serverUrl, {
              method: "POST",
              data: formData,
              processData: false,
              contentType: false,
              beforeSend: (xhr: { setRequestHeader: (arg0: string, arg1: string) => void; }) => {
                xhr.setRequestHeader('IDObject', (this.ModelID ? this.ModelID : ''));
                xhr.setRequestHeader('Upload-Type', this.typeUpload);
                xhr.setRequestHeader('Authorization', Global.getToken());
              },
              success: (result: string | undefined) => {
                this.blockUI.stop();
                if (result) {
                  result = `${result}?time=${new Date().toJSON()}`;
                  this.onClose.emit(result);
                  this.hide();
                  this.dialog.showSwalSuccesAlert(`Upload Image`, "Your Image uploaded successfully.");
                }
              },
              error: () => {
                this.blockUI.stop();
                this.hide();
                this.dialog.showSwalErrorAlert(`Error`, 'Occured error during upload your image.');
              },
            });
          } else {
            this.blockUI.stop();
            this.dialog.showSwalErrorAlert(`Error`, 'Occured error during upload your image.');
          }
        } else {
          this.blockUI.stop();
        }
      };
      xhr.send();
    }
  }

  show() {
    this.urlFinal = '';
    this.register();
    this.modal.show();
  }

  hide() {
    this.$image.cropper('destroy');
    this.modal.hide();
  }
}
