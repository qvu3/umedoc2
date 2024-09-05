import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import Global from '../../../../Global';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
declare var $: any;
@Component({
  selector: 'app-crop-image',
  templateUrl: './crop-image.component.html',
  styleUrls: ['./crop-image.component.css']
})
export class CropImageComponent implements OnInit {
  @Input() link: string;
  @Input() ModelID: string;
  @Input() typeUpload: string;
  @ViewChild('childModal') modal: ModalDirective;
  $image: any;
  $inputImage: any;
  Submitting: boolean = false;
  urlFinal: string = '';
  @Output() onClose: EventEmitter<string> = new EventEmitter();
  @BlockUI() blockUI: NgBlockUI;
  constructor(private dialog: CommonDialogService) { }

  ngOnInit() {
    this.register();
  }

  register() {
    var ratio = NaN;
    if (this.typeUpload != 'logo')
      ratio = this.typeUpload == 'user' ? (1 / 1) : (3 / 2);

    var options = {
      aspectRatio: ratio,
      autoCropArea: 0.7,
      viewMode: 1
    };
    this.$image = $('#image').cropper(options);
    this.registerImageBold();
  }

  registerImageBold() {
    // Import image
    this.$inputImage = $('#inputImage');
    var URL = window.URL;
    var blobURL;

    if (URL) {
      this.$inputImage.change(function (event) {
        var files = this.$inputImage[0].files;
        var file;

        if (!this.$image.data('cropper')) {
          return;
        }

        if (files && files.length) {
          file = files[0];
          if (file.size  && file.size > 5000000) {
            this.$inputImage.val('');
            this.dialog.showSwalErrorAlert('Error','Maximum file size is 5MB');
          }
          else if (/^image\/\w+$/.test(file.type)) {
            this.urlFinal = blobURL = URL.createObjectURL(file);
            this.$image.one('built.cropper', function () {
              // Revoke when load complete
              URL.revokeObjectURL(blobURL);
            }).cropper('reset').cropper('replace', blobURL);
            this.$inputImage.val('');
          } else {
            this.$inputImage.val('');
            this.dialog.showSwalErrorAlert('Error','Please choose an image file.');
          }
        }
      }.bind(this));
    } else {
      this.$inputImage.prop('disabled', true).parent().addClass('disabled');
    }
  }

  cropImage() {
    this.$image.cropper('getCroppedCanvas').toBlob((blob) => {
      if (blob) {
        var url = window.URL.createObjectURL(blob);
        this.urlFinal = url;
        this.$image.one('built.cropper', function () {
          // Revoke when load complete
          URL.revokeObjectURL(url);
        }).cropper('reset').cropper('replace', url);
        this.$inputImage.val('');

      }
    });
  }


  cropImageAndSave() {
    if (this.Submitting) return;
    this.Submitting = true;
    this.$image.cropper('getCroppedCanvas').toBlob((blob) => {
      this.blockUI.start();
      if (blob) {
        var url = window.URL.createObjectURL(blob);
        this.urlFinal = url;
        this.$image.one('built.cropper', function () {
          // Revoke when load complete
          URL.revokeObjectURL(url);
        }).cropper('reset').cropper('replace', url);
        this.$inputImage.val('');

        var myBlob = this.blobToFile(blob, 'avatar_file_.png');
        if (myBlob) {

          const formData = new FormData();
          formData.append('croppedImage', myBlob, "croppedImage.png");
          var serverUrl = `${Global.apiUrl}${this.link}`;
          $.ajax(serverUrl, {
            method: "POST",
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function (xhr) {
              xhr.setRequestHeader('IDObject', (this.ModelID ? this.ModelID : ''))
              xhr.setRequestHeader('Upload-Type', this.typeUpload);
              xhr.setRequestHeader('Authorization', Global.getToken());
            }.bind(this),
            success: function (result) {
              this.Submitting = false;
              this.blockUI.stop();
              if (result) {
                result = `${result}?time=${new Date().toJSON()}`;
                this.onClose.emit(result);
                this.hide();
                //this.dialog.showAlert({ title: 'Upload Image', message: 'Your Image uploaded successful.' })
                this.dialog.showSwalSuccesAlert(`Upload Image`, "Your Image uploaded successful.");
              }
            }.bind(this),
            error: function () {
              this.Submitting = false;
              this.blockUI.stop();
              this.hide();
              //this.dialog.showAlert({ title: 'Error', message: 'Occured error during upload your image.' });
              this.dialog.showSwalErrorAlert(`Error`, 'Occured error during upload your image.');
            }.bind(this),
          });
        }
        else {
          this.Submitting = false;
          this.blockUI.stop();
          //this.dialog.showAlert({ title: 'Error', message: 'Occured error during upload your image.' });
          this.dialog.showSwalErrorAlert(`Error`, 'Occured error during upload your image.');
        }
      }
      else {
        this.Submitting = false;
        this.blockUI.stop();
      }
    });
  }

  blobToFile = (theBlob, fileName): File => {
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.FileName = fileName;
    return <File>theBlob;
  }

  saveImage() {
    if (this.urlFinal) {

      //get blod from urlFinal
      var xhr = new XMLHttpRequest();
      xhr.open('GET', this.urlFinal, true);
      xhr.responseType = 'blob';
      xhr.onload = function (e) {
        this.blockUI.start('Processing your request...'); // Start blocking
        if (e && e.currentTarget && e.currentTarget.status == 200) {
          var dataBlod = e.currentTarget.response;
          var myBlob = this.blobToFile(dataBlod, 'avatar_file_.png');
          // myBlob is now the blob that the object URL pointed to.
          if (myBlob) {
            const formData = new FormData();
            formData.append('croppedImage', myBlob, "croppedImage.png");
            var serverUrl = `${Global.apiUrl}${this.link}`;
            $.ajax(serverUrl, {
              method: "POST",
              data: formData,
              processData: false,
              contentType: false,
              beforeSend: function (xhr) {
                xhr.setRequestHeader('IDObject', (this.ModelID ? this.ModelID : ''))
                xhr.setRequestHeader('Upload-Type', this.typeUpload);
                xhr.setRequestHeader('Authorization', Global.getToken());
              }.bind(this),
              success: function (result) {
                this.blockUI.stop();
                if (result) {
                  result = `${result}?time=${new Date().toJSON()}`;
                  this.onClose.emit(result);
                  this.hide();

                  //this.dialog.showAlert({ title: 'Upload Image', message: 'Your Image uploaded successful.' })
                  this.dialog.showSwalSuccesAlert(`Upload Image`, "Your Image uploaded successful.");
                }
              }.bind(this),
              error: function () {
                this.blockUI.stop();
                this.hide();
                //this.dialog.showAlert({ title: 'Error', message: 'Occured error during upload your image.' });
                this.dialog.showSwalErrorAlert(`Error`, 'Occured error during upload your image.');
              }.bind(this),
            });
          }
          else {
            this.blockUI.stop();
            //this.dialog.showAlert({ title: 'Error', message: 'Occured error during upload your image.' });
            this.dialog.showSwalErrorAlert(`Error`, 'Occured error during upload your image.');
          }
        }
        else {
          this.blockUI.stop();
        }
      }.bind(this);
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
