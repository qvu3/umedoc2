import Global from 'src/app/Global';
import { BaseCriteria } from './../../../../common/criterias/base.criteria';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { UserService } from 'src/app/modules/common/services/user.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { CombineUserAcctModel } from './../../../../common/models/combine-user-acct.model';
import { BaseComponent } from 'src/app/modules/base.component';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { TicketService } from 'src/app/modules/common/services/ticket.service';

@Component({
  selector: 'app-combine-existing-acct-modal',
  templateUrl: './combine-existing-acct-modal.component.html',
  styleUrls: ['./combine-existing-acct-modal.component.css']
})
export class CombineExistingAcctModalComponent extends BaseComponent implements OnInit {
  list: CombineUserAcctModel[] = [];
  @ViewChild('childModal') public modal: ModalDirective;
  @ViewChild('f') public form: NgForm;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  Submitting: boolean = false;
  patientId: string;
  oldUserId: string;
  userData = Array<Select2OptionData>();
  patientIds = [];
  constructor(public authenticationService: AuthenticationService,
    private dialog: CommonDialogService,
    private userService: UserService,
    private ticketservice: TicketService,) {
    super(authenticationService);
  }
  options: Options;
  ajaxOptions: any;
  ngOnInit(): void {
    this.ajaxOptions = {
      url: `${Global.apiUrl}/api/User/SearchPatientUser`,
      dataType: 'json',
      delay: 250,
      cache: true,
      method: 'POST',
      headers: {
        "Authorization": Global.getToken()
      },
      data: (params: any) => {
        let criteria = new BaseCriteria();
        criteria.SearchText = params.term;
        criteria.CurrentPage = params.page ? params.page : 0;
        return criteria;
      },
      processResults: (data: any, params: any) => {
        params.page = params.page || 1;
        const users = data.Data.filter(x=> !this.patientIds.includes(x.UserID));
        return {
          results: $.map(users, function (obj) {
            return { id: obj.UserID, text: `${obj.PatientName} - ${obj.Email}` }
          }),
          pagination: {
            more: (params.page * 20) < data.TotalRecords
          }
        };
      }
    };
    this.options = {
      width: 'auto',
      minimumInputLength: 3,
      ajax: this.ajaxOptions,
    } as Options;
  }



  show(id) {
    this.patientId = id;
    this.getList(id);
  }

  hide() {
    this.form.resetForm();
    this.modal.hide();
  }

  getList(id) {
    this.userService.getCombineUserByPatientID(id).subscribe(r => {
      if (r) {
        this.list = r;
        const  oldIds   = this.list.map(x=>x.OldUserID);
        const newIds = this.list.map(x=>x.NewUserID);
        this.patientIds = [...(oldIds??[]) , ...(newIds??[])];
        this.modal.show();
      } else {
        this.dialog.showSwalErrorAlert("Combine existing accounts", MessageConstant.FAILURE_REQUEST);
      }
    }, error => {
      let message = error?.error ?? MessageConstant.FAILURE_REQUEST;
      this.dialog.showSwalErrorAlert("Combine existing accounts", message);
    });
  }

  remove(userId) {
    this.userService.removeCombineUser(this.patientId, userId).subscribe(c => {
      if (c) {
        this.dialog.showToastrSuccess("Combine existing accounts", MessageConstant.REQUEST_SUCCESS_CONST);
        this.form.reset();
        this.getList(this.patientId);
      } else {
        this.dialog.showSwalErrorAlert("Combine existing accounts", MessageConstant.FAILURE_REQUEST);
      }
    }, error => {
      let message = error?.error ?? MessageConstant.FAILURE_REQUEST;
      this.dialog.showSwalErrorAlert("Combine existing accounts", message);
    });
  }

  save() {
    this.userService.addCombineUser(this.patientId, this.oldUserId).subscribe(c => {
      if (c) {
        this.dialog.showToastrSuccess("Combine existing accounts", MessageConstant.REQUEST_SUCCESS_CONST);
        this.form.reset();
        this.getList(this.patientId);
      } else {
        this.dialog.showSwalErrorAlert("Combine existing accounts", MessageConstant.FAILURE_REQUEST);
      }
    }, error => {
      let message = error?.error ?? MessageConstant.FAILURE_REQUEST;
      this.dialog.showSwalErrorAlert("Combine existing accounts", message);
    });
  }
}
