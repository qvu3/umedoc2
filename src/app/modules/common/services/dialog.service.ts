import { Injectable } from '@angular/core';
declare var swal: any;
declare var toastr: any;
@Injectable()
export class CommonDialogService {
  title!: string;
  message!: string;
  constructor() {
  }

  showToastrSuccess(title: string, message: string) {
    toastr.success(message, title);
  }

  showToastrError(title: string, message: string) {
    toastr.error(message, title);
  }

  showToastrWarning(message: any, onClick: (() => void) | null = null) {
    toastr.options.onclick = onClick;
    toastr.warning(message);
  }

  showToastrWarningMessage(message: any, onClick: any) {
    toastr.options.onclick = onClick;
    toastr.warning(message);
  }

  showSwalSuccesAlert(title: string, message: string) {
    swal(title, message, 'success');
  }

  showSwalErrorAlert(title: string, message: string) {
    swal(title, message, 'error', { className: 'error-message' });
  }

  showSwalWarningAlert(title: string, message: string, isHtml = false) {
    var content: any;
    if (isHtml) {
      content = document.createElement('span');
      content.innerHTML = message;
      content.style = "text-align:left; font-weight:bold";
    }
    else {
      content = message;
    }
    swal({
      title: title,
      content: isHtml ? content : null,
      text: !isHtml ? content : null,
      icon: 'warning'
    });
  }

  showSwalConfirmAlert(message: string, isHtml = false) {
    var content: any;
    if (isHtml) {
      content = document.createElement('span');
      content.innerHTML = message;
      content.style = "text-align:left; font-weight:bold";
    }
    else {
      content = message;
    }
    return new Promise<boolean>((resolve, reject) => {
      swal({
        title: 'Please Confirm!',
        content: isHtml ? content : null,
        text: !isHtml ? content : null,
        icon: "warning",
        buttons: {
          cancel: {
            text: "No",
            value: null,
            visible: true,
            className: "",
            closeModal: true,
          },
          confirm: {
            text: "Yes",
            value: true,
            visible: true,
            className: "",
            closeModal: true
          }
        }
      }).then((isConfirm: boolean | PromiseLike<boolean>) => {
        resolve(isConfirm);
      });
    });
  }

  showSwalConfirmAlertNoCancel(message: any, isHtml = false, confirmButtonTitle: string) {
    var content: any;
    if (isHtml) {
      content = document.createElement('span');
      content.innerHTML = message;
      content.style = "text-align:left; font-weight:bold";
    }
    else {
      content = message;
    }
    return new Promise<boolean>((resolve, reject) => {
      swal({
        title: 'Warning!',
        content: isHtml ? content : null,
        text: !isHtml ? content : null,
        icon: "warning",
        className: "text-center",
        buttons: {
          confirm: {
            text: confirmButtonTitle ?? "Yes",
            value: true,
            visible: true,
            className: "text-center",
            closeModal: true
          }
        }
      }).then((isConfirm: boolean | PromiseLike<boolean>) => {
        resolve(isConfirm);
      });
    });
  }

  showSwalConfirmGetNameFile(name: any) {
    var nameWithoutExt = (name ?? '').split('.').slice(0, -1).join('.')
    return new Promise<string>((resolve, reject) => {
      swal({
        title: 'Rename your file',
        text: 'Enter your new name of file:',
        closeOnClickOutside: false,
        showCancelButton: true,
        cancelButtonText: "Close",
        buttons: {
          cancel: {
            text: "Cancel",
            value: false,
            visible: true,
            className: "",
            closeModal: true,
          },
          confirm: {
            text: "Ok",
            value: true,
            visible: true,
            className: "text-center",
            closeModal: true
          }
        },
        content: {
          element: 'input',
          attributes: {
            defaultValue: nameWithoutExt,
            pattern: /^\d+$/,
            required: true
          }
        }
      }).then((inputValue: string | boolean | PromiseLike<string>) => { 
        if(typeof inputValue === 'boolean' && inputValue === false){
          reject(false);
        }
        else if(typeof inputValue === 'string'){
          resolve(inputValue);
        }
        else{
          reject(false);
        }
      });
    });
  }

  showSwalConfirmChangeRestrict(message: any, isHtml = false) {
    var content: any;
    if (isHtml) {
      content = document.createElement('span');
      content.innerHTML = message;
      content.style = "text-align:left; font-weight:bold";
    }
    else {
      content = message;
    }
    return new Promise<boolean>((resolve, reject) => {
      swal({
        title: 'Please Confirm!',
        content: isHtml ? content : null,
        text: !isHtml ? content : null,
        icon: "warning",
        buttons: {
          cancel: {
            text: "Cancel",
            value: null,
            visible: true,
            className: "",
            closeModal: true,
          },
          confirm: {
            text: "Agree & Continue",
            value: true,
            visible: true,
            className: "",
            closeModal: true
          }
        }
      }).then((isConfirm: boolean | PromiseLike<boolean>) => {
        resolve(isConfirm);
      });
    });
  }
}
