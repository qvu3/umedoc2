import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { BaseComponent } from 'src/app/modules/base.component';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { ProviderGroupAssignmentModel } from 'src/app/modules/common/models/provider-group-assignment.model';
import { ProviderGroupModel } from 'src/app/modules/common/models/provider-group.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { ProviderGroupService } from 'src/app/modules/common/services/provider-group.service';

@Component({
  selector: 'app-edit-provider-group',
  templateUrl: './edit-provider-group.component.html',
  styleUrls: ['./edit-provider-group.component.css']
})
export class EditProviderGroupComponent extends BaseComponent implements OnInit {
  @ViewChild('childModal') public modal: ModalDirective;
  @ViewChild('f') public form: NgForm;
  @Output() onClosed: EventEmitter<boolean> = new EventEmitter();
  Submitting: boolean = false;
  model: ProviderGroupModel = new ProviderGroupModel();
  assignedList: ProviderGroupAssignmentModel[] = [];
  constructor(public authService: AuthenticationService,
    private service: ProviderGroupService,
    private dialog: CommonDialogService) {
    super(authService);

  }

  ngOnInit(): void {

  }

  addAssign() {
    this.assignedList = this.assignedList ?? [];
    var item = new ProviderGroupAssignmentModel();
    item.ProviderGroupID = this.model.ID;
    this.assignedList.push(item);
  }

  checkIsAdding(){
    return this.assignedList.filter(x=>!x.ID).length >0;
  }

  save() {
    if (this.model.ID) {
      this.service.Edit(this.model).subscribe(result => {
        if (result) {
          this.Submitting = false;
          this.dialog.showToastrSuccess('Provider Group', MessageConstant.REQUEST_SUCCESS_CONST);
          this.hide();
          this.onClosed.emit(true);
        }
        else {
          this.Submitting = false;
          this.dialog.showSwalErrorAlert('Provider Group', MessageConstant.FAILURE_REQUEST);
        }
      },
        error => {
          this.Submitting = false;
          this.dialog.showSwalErrorAlert('Provider Group', error.error);
        });
    } else {
      this.service.Create(this.model).subscribe(result => {
        if (result) {
          this.Submitting = false;
          this.dialog.showToastrSuccess('Provider Groupt', MessageConstant.REQUEST_SUCCESS_CONST);
          this.hide();
          this.onClosed.emit(true);
          this.authService.onReloadTaskList.emit(true);
        }
        else {
          this.Submitting = false;
          this.dialog.showSwalErrorAlert('Provider Group', MessageConstant.FAILURE_REQUEST);
        }
      },
        error => {
          this.Submitting = false;
          this.dialog.showSwalErrorAlert('Provider Group', error.error);
        });
    }
  }

  show(id) {
    this.model = new ProviderGroupModel();
    if (id) {
      this.model.ID = id;
      this.getEntity();
      this.getAssignedList();
    }

    this.modal.show();
  }

  getEntity() {
    this.service.Get(this.model.ID).subscribe(result => {
      if (result) {
        this.model = result;
      }
    });
  }

  getAssignedList() {
    this.assignedList = [];
    if (!this.model?.ID) return;
    this.service.GetAssigned(this.model.ID).subscribe(r => {
      this.assignedList = r ?? [];
    });
  }

  hide() {
    this.form.resetForm();
    this.modal.hide();
  }
}
