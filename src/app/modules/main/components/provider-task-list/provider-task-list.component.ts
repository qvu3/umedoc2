import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { ProviderTaskInfoComponent } from './provider-task-info/provider-task-info.component';

@Component({
  selector: 'app-provider-task-list',
  templateUrl: './provider-task-list.component.html',
  styleUrls: ['./provider-task-list.component.css']
})
export class ProviderTaskListComponent extends BaseComponent implements OnInit {
  @ViewChild('providerTaskInfoModal') providerTaskInfoModal: ProviderTaskInfoComponent;

  constructor(
    public authenticateService: AuthenticationService,
    private router: Router
  ) {
    super(authenticateService);
  }

  ngOnInit(): void {

  }

  addTask() {
    this.providerTaskInfoModal.show(null);
  }

  refreshGrid() {
    this.authenticateService.onReloadTaskList.emit(true);
  }
}
