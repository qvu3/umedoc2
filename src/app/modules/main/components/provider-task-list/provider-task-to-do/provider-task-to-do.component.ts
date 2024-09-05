import { Component, OnInit, ViewChild } from '@angular/core';
import Global, { ProviderTaskStatus } from 'src/app/Global';
import { BaseComponent } from 'src/app/modules/base.component';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { ProviderTaskCriteria } from 'src/app/modules/common/criterias/provider-task.criteria';
import ProviderTaskModel from 'src/app/modules/common/models/provider-task.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { ProviderTaskService } from 'src/app/modules/common/services/provider-task.service';
import { ProviderTaskInfoComponent } from '../provider-task-info/provider-task-info.component';
declare var $: any;

@Component({
  selector: 'app-provider-task-to-do',
  templateUrl: './provider-task-to-do.component.html',
  styleUrls: ['./provider-task-to-do.component.css']
})
export class ProviderTaskToDoComponent extends BaseComponent implements OnInit {
  criteria: ProviderTaskCriteria = new ProviderTaskCriteria();
  dataList: Array<ProviderTaskModel> = new Array<ProviderTaskModel>();
  @ViewChild('providerTaskInfoModal') providerTaskInfoModal: ProviderTaskInfoComponent;

  constructor(public authenticateService: AuthenticationService,
    private service: ProviderTaskService,
    private dialog: CommonDialogService
  ) {
    super(authenticateService);
    this.searchAsync();

    authenticateService.onReloadTaskList.subscribe(r => {
      this.searchAsync();
    });
  }

  ngOnInit(): void {

  }

  eventSort(orderBy: string) {
    this.criteria.SortColumn = "";
    this.criteria.SortDirection = orderBy;

    this.searchAsync();
  }

  onChangeSearch(event) {
    this.searchAsync();
  }

  searchAsync() {
    this.criteria.Status = ProviderTaskStatus.Todo;
    this.service.SearchAsync(this.criteria).subscribe(r => {
      if (r) {
        this.dataList = r;
      }
      else {
        this.dataList = new Array<ProviderTaskModel>();
      }
    }, error => {
      this.dialog.showToastrError('Provider Task List', error.error);
    });
  }

  editTaskList(id) {
    this.providerTaskInfoModal.show(id);
  }

  deleteTaskList(id) {
    this.dialog.showSwalConfirmAlert("Are you sure you want to delete this item?").then((isConfirm => {
      if (isConfirm) {
        this.service.Delete(id).subscribe(r => {
          if (r) {
            this.dialog.showToastrSuccess('Provider Task List', MessageConstant.REQUEST_SUCCESS_CONST);
            this.searchAsync();
          }
        }, error => {
          this.dialog.showToastrError('Provider Task List', error.error);
        });
      }
    }));
  }

  
  onchangeStatus(event, id) {
    if ($('#' + event.target.id).is(":checked")) {
      $('#' + event.target.id).closest('li').addClass('completed');

      // Update status from completed to To-do
      this.service.ChangeStatusProviderTask(id, ProviderTaskStatus.Completed).subscribe(r => {
        if (r) {
          this.dialog.showToastrSuccess('Provider Task List', MessageConstant.REQUEST_SUCCESS_CONST);
          this.searchAsync();
        }
      }, error => {
        this.dialog.showToastrError('Provider Task List', error.error);
      });
    } else {
      $('#' + event.target.id).closest('li').removeClass('completed');
    }
  }
}
