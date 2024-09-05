import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { ProviderGroupAssignmentModel } from 'src/app/modules/common/models/provider-group-assignment.model';
import UserModel from 'src/app/modules/common/models/user.model';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { ProviderGroupService } from 'src/app/modules/common/services/provider-group.service';

@Component({
  selector: 'app-provider-group-assignment-element',
  templateUrl: './provider-group-assignment-element.component.html',
  styleUrls: ['./provider-group-assignment-element.component.css']
})
export class ProviderGroupAssignmentElementComponent implements AfterViewInit {
  @Input() isAdd: boolean;
  @Input() model: ProviderGroupAssignmentModel;
  @Output() onCancelled: EventEmitter<boolean> = new EventEmitter();
  @Output() onDeleted: EventEmitter<boolean> = new EventEmitter();
  @Output() onSaved: EventEmitter<boolean> = new EventEmitter();
  userProviderList: Array<Select2OptionData> = new Array<Select2OptionData>();
  optionsProvider: Options;
  constructor(private service: ProviderGroupService,
    private dialog: CommonDialogService) {
    this.optionsProvider = {
      multiple: false,
      allowClear: true,
      minimumInputLength: 3
    };
  }

  ngAfterViewInit(): void {
    if (this.isAdd) {
      this.getProviders();
    }
  }

  getProviders() {
    this.userProviderList = [];
    if (this.model && this.model.ProviderGroupID) {
      this.service.GetProviders(this.model.ProviderGroupID)
        .subscribe(r => {
          if (r) {
            let providers = r.map((x) => {
              return { id: x.Id, text: `${x.FirstName} ${x.LastName}` , source: x } as Select2OptionData;
            });
            this.userProviderList = providers;
          }
        });
    }
  }

  save() {
    this.service.AddAssign(this.model).subscribe(r => {
      this.dialog.showToastrSuccess('Assign Provider to Group', MessageConstant.REQUEST_SUCCESS_CONST);
      this.onSaved.emit(true);
    })
  }

  delete() {
    this.dialog.showSwalConfirmAlert("Are you sure you want to remove this user out of this group?")
      .then((isConfirm => {
        if (isConfirm) {
          this.service.DeleteAssign(this.model.ID).subscribe(r => {
            if (r) {
              this.dialog.showToastrSuccess('Assign to Provider Group', MessageConstant.REQUEST_SUCCESS_CONST);
              this.onDeleted.emit(true);
            }
          }, error => {
            this.dialog.showToastrError('Assign to Provider Group', error.error);
          });
        }
      }));
  }

  cancel() {
    this.onCancelled.emit(true);
  }

}
