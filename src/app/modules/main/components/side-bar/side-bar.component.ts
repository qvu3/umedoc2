import { PatientRequestService } from './../../../common/services/patient-request.service';
import { TicketService } from './../../../common/services/ticket.service';
import { RoleConstants } from 'src/app/Global';
import { Component, OnInit, Output, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/modules/common/services/utility.service';
import { ProviderTaskService } from 'src/app/modules/common/services/provider-task.service';
declare var $: any;

@Component({
  selector: '[app-side-bar]',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {
  totalAppt: number = 0;
  timer: any;
  totalTaskAssignee: number = 0;
  totalTicketWaiting: number = 0;
  totalPatientRequestToDo: number = 0;
  @Output() onChangePassword: EventEmitter<boolean> = new EventEmitter();
  constructor(public authService: AuthenticationService,
    private utilityService: UtilityService,
    private taskService: ProviderTaskService,
    private ticketService: TicketService,
    private patientRequestService: PatientRequestService,
    private router: Router) {
    super(authService);
  }

  ngOnInit() {
    this.getTotalAwaiting();
    this.getTotalTaskAssignee();
    this.getNumberTicketWaiting();
    this.getNumberPatientRequestTodo();
    setInterval(() => {
      this.getNumberTicketWaiting();
      this.getNumberPatientRequestTodo();
    }, 20000);
   
  }

  getNumberPatientRequestTodo() {
    if (!this.currentUser || this.currentUser.Role == RoleConstants.Patient ) {
      this.totalPatientRequestToDo = 0;
      return;
    }
    this.patientRequestService.GetTotalToDo().subscribe(r => {
      this.totalPatientRequestToDo = r ?? 0;
    })
  }


  getNumberTicketWaiting() {
    if (!this.currentUser || this.currentUser.Role == RoleConstants.Patient || this.currentUser.Role == RoleConstants.Provider) {
      this.totalTicketWaiting = 0;
      return;
    }
    this.ticketService.GetTotalWaiting().subscribe(r => {
      this.totalTicketWaiting = r ?? 0;
    })
  }

  ngAfterViewInit() {
    $('.navbar-nav a').on('click', function () {
      $('.navbar-nav').find('li.active').removeClass('active');
      $(this).parent('li').addClass('active');
    });
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  signOut() {
    this.authService.SignOut();
    this.router.navigate([`/management/auth/sign-in`]);
  }

  changepassword() {
    this.onChangePassword.emit(true);
  }

  hightMenu() {
    $('.navbar-nav').find('li.active').removeClass('active');
    $('#companySettingMenu').parent().parent().parent().addClass('active');
  }

  clickTab(tabName) {
    this.hightMenu();
    this.router.navigateByUrl(`/management/company-settings?activeTab=${tabName}`);
  }

  getTotalAwaiting() {
    this.utilityService.CountWaitingAppointment().subscribe(r => {
      this.totalAppt = r;
    });

    this.timer = setInterval(() => {
      this.utilityService.CountWaitingAppointment().subscribe(r => {
        this.totalAppt = r;
      });
    }, 20000);
  }

  getTotalTaskAssignee() {
    this.taskService.CountTotalTaskListTodoAssigneeAsync(this.currentUser.Id).subscribe(r => {
      this.totalTaskAssignee = r;
    });

    this.timer = setInterval(() => {
      this.taskService.CountTotalTaskListTodoAssigneeAsync(this.currentUser.Id).subscribe(r => {
        this.totalTaskAssignee = r;
      });
    }, 20000);
  }
}
