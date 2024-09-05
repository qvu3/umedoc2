import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProviderTaskStatus } from 'src/app/Global';
import { BaseComponent } from 'src/app/modules/base.component';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { ProviderTaskCriteria } from 'src/app/modules/common/criterias/provider-task.criteria';
import ProviderTaskModel from 'src/app/modules/common/models/provider-task.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { ProviderTaskService } from 'src/app/modules/common/services/provider-task.service';
import { ProviderTaskInfoComponent } from '../../provider-task-list/provider-task-info/provider-task-info.component';

@Component({
  selector: 'app-task-list-patient',
  templateUrl: './task-list-patient.component.html',
  styleUrls: ['./task-list-patient.component.css']
})
export class TaskListPatientComponent extends BaseComponent implements OnInit, OnChanges {
  criteria: ProviderTaskCriteria = new ProviderTaskCriteria();
  criteriaCompleted: ProviderTaskCriteria = new ProviderTaskCriteria();
  dataListTodo: Array<ProviderTaskModel> = new Array<ProviderTaskModel>();
  dataListCompleted: Array<ProviderTaskModel> = new Array<ProviderTaskModel>();
  @ViewChild('taskInfoModal') taskInfoModal: ProviderTaskInfoComponent;
  @Input() patientId: string;
  constructor(public authenticateService: AuthenticationService,
    private service: ProviderTaskService,
    private dialog: CommonDialogService,
    private activeRouter: ActivatedRoute
  ) {
    super(authenticateService);
    activeRouter.params.subscribe(r => {
      if (r['patientId']) {
        this.patientId = r['patientId'];
      }
      this.loadData(this.patientId);
    })
  }

  ngOnChanges(params: SimpleChanges) {
    if (params && params.patientId && params.patientId.currentValue && params.patientId.currentValue != params.patientId.previousValue) {
      this.loadData(params.patientId.currentValue);
    }
  }

  ngOnInit(): void {

  }

  loadData(patientId) {
    if (patientId) {
      this.criteria.PatientID = patientId;
      this.criteriaCompleted.PatientID = patientId;
      this.searchTodoAsync();
      this.searchCompletedAsync();
    }
  }

  addTask() {
    this.taskInfoModal.patientId = this.patientId;
    this.taskInfoModal.show(null);
  }

  refresh() {
    this.searchTodoAsync();
    this.searchCompletedAsync();
    this.authenticateService.onReloadTaskList.emit(true);
  }

  eventSortCompleted(orderBy: string) {
    this.criteriaCompleted.SortColumn = "";
    this.criteriaCompleted.SortDirection = orderBy;

    this.searchCompletedAsync();
  }

  onChangeSearchCompleted(event) {
    this.searchCompletedAsync();
    this.searchTodoAsync();
  }

  eventSortTodo(orderBy: string) {
    this.criteria.SortColumn = "";
    this.criteria.SortDirection = orderBy;

    this.searchTodoAsync();
  }

  onChangeSearchTodo(event) {
    this.searchCompletedAsync();
    this.searchTodoAsync();
  }

  searchTodoAsync() {
    this.criteria.Status = ProviderTaskStatus.Todo;
    this.service.SearchAsync(this.criteria).subscribe(r => {
      if (r) {
        this.dataListTodo = r;
      }
      else {
        this.dataListTodo = new Array<ProviderTaskModel>();
      }
    }, error => {
      this.dialog.showToastrError('Provider Task List', error.error);
    });
  }

  searchCompletedAsync() {
    this.criteriaCompleted.Status = ProviderTaskStatus.Completed;
    this.service.SearchAsync(this.criteriaCompleted).subscribe(r => {
      if (r) {
        this.dataListCompleted = r;
      }
      else {
        this.dataListCompleted = new Array<ProviderTaskModel>();
      }
    }, error => {
      this.dialog.showToastrError('Provider Task List', error.error);
    });
  }

  editTaskList(id) {
    this.taskInfoModal.patientId = this.patientId;
    this.taskInfoModal.show(id);
  }

  deleteTaskList(id) {
    this.dialog.showSwalConfirmAlert("Are you sure you want to delete this item?").then((isConfirm => {
      if (isConfirm) {
        this.service.Delete(id).subscribe(r => {
          if (r) {
            this.dialog.showToastrSuccess('Provider Task List', MessageConstant.REQUEST_SUCCESS_CONST);
            this.searchCompletedAsync();
            this.searchTodoAsync();
            this.authenticateService.onReloadTaskList.emit(true);
          }
        }, error => {
          this.dialog.showToastrError('Provider Task List', error.error);
        });
      }
    }));
  }

  onchangeCompletedStatus(event, id) {
    if ($('#' + event.target.id).is(":checked")) {
      $('#' + event.target.id).closest('li').addClass('completed');

      // Update status from completed to To-do
      this.service.ChangeStatusProviderTask(id, ProviderTaskStatus.Completed).subscribe(r => {
        if (r) {
          this.dialog.showToastrSuccess('Provider Task List', MessageConstant.REQUEST_SUCCESS_CONST);
          this.searchTodoAsync();
          this.searchCompletedAsync();
          this.authenticateService.onReloadTaskList.emit(true);
        }
      }, error => {
        this.dialog.showToastrError('Provider Task List', error.error);
      });
    } else {
      $('#' + event.target.id).closest('li').removeClass('completed');
    }
  }

  onchangeTodoStatus(event, id) {
    if ($('#' + event.target.id).is(":checked")) {
      $('#' + event.target.id).closest('li').addClass('completed');

      // Update status from completed to To-do
      this.service.ChangeStatusProviderTask(id, ProviderTaskStatus.Todo).subscribe(r => {
        if (r) {
          this.dialog.showToastrSuccess('Provider Task List', MessageConstant.REQUEST_SUCCESS_CONST);
          this.searchTodoAsync();
          this.searchCompletedAsync();
          this.authenticateService.onReloadTaskList.emit(true);
        }
      }, error => {
        this.dialog.showToastrError('Provider Task List', error.error);
      });
    } else {
      $('#' + event.target.id).closest('li').removeClass('completed');
    }
  }
}

