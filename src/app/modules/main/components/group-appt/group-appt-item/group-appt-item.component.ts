import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { BaseComponent } from 'src/app/modules/base.component';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { GroupApptCategoryModel } from 'src/app/modules/common/models/group-appt-category.model';
import { GroupApptModel } from 'src/app/modules/common/models/group-appt.model';
import UserModel from 'src/app/modules/common/models/user.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { GroupApptCategoryService } from 'src/app/modules/common/services/group-appt-category.service';
import { GroupApptService } from 'src/app/modules/common/services/group-appt.service';
import { UserService } from 'src/app/modules/common/services/user.service';

@Component({
  selector: 'app-group-appt-item',
  templateUrl: './group-appt-item.component.html',
  styleUrls: ['./group-appt-item.component.css']
})
export class GroupApptItemComponent extends BaseComponent implements OnInit {
  @ViewChild('childModal') public modal: ModalDirective;
  @ViewChild('f') public form: NgForm;
  @Output() onClosed: EventEmitter<boolean> = new EventEmitter();

  model: GroupApptModel = new GroupApptModel();
  categories: Array<GroupApptCategoryModel> = [];
  providers: Array<UserModel> = [];
  Submitting: boolean = false;
  isProviderUser:boolean = false;
  constructor(public authenticateService: AuthenticationService,
    private groupApptCategory: GroupApptCategoryService,
    private groupApptService: GroupApptService,
    private userService: UserService,
    private dialog: CommonDialogService) {
    super(authenticateService);
  }

  ngOnInit(): void {
    this.getGroupApptCategory();
  }

  getGroupApptCategory() {
    this.groupApptCategory.GetAll().subscribe(r => {
      if (r) {
        this.categories = r;
      }
    });
  }

  getProvidersForGroupAppt() {
    this.userService.GetProvidersForGroupAppt().subscribe(r => {
      if (r) {
        this.providers = r;
      }
    });
  }
  show() {
    this.isProviderUser = false;
    if(this.currentUser.Role=='Provider'){
      this.model.ProviderID = this.currentUser.Id;
      this.isProviderUser = true;
    }
    this.getGroupApptCategory();
    this.getProvidersForGroupAppt();
    this.modal.show();
  }

  hide() {
    this.model = new GroupApptModel();
    this.model.ProviderID = '';
    this.form.resetForm();
    this.modal.hide();
  }

  save() {
    this.groupApptService.Create(this.model).subscribe(result => {
      this.Submitting = false;
      this.authenticateService.onReloadGroupAppt.emit(true);
      this.dialog.showToastrSuccess('Create Group Appt', MessageConstant.REQUEST_SUCCESS_CONST);
      this.hide();
      this.onClosed.emit(true);
    },
      error => {
        this.Submitting = false;
        this.dialog.showSwalErrorAlert('Create Group Appt', error?.error ?? MessageConstant.FAILURE_REQUEST);
      });
  }
}
