import { NewTicketModalComponent } from './../../../common/component/new-ticket-modal/new-ticket-modal.component';

import { AuthenticationService } from './../../../common/services/authentication.service';
import { TicketCriteria } from './../../../common/criterias/ticket.criteria';
import { BaseComponent } from './../../../base.component';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
})
export class TicketsComponent extends BaseComponent implements OnInit,
  AfterViewInit {
  criteria: TicketCriteria = new TicketCriteria();
  refreshOpenFnc: Function;
  refreshCloseFnc: Function;
  @ViewChild('ticketModal') ticketModal: NewTicketModalComponent;
  constructor(public authService: AuthenticationService) {
    super(authService);
  }


  ngOnInit() {
  }

  ngAfterViewInit() {

  }

  addTicket() {
    this.ticketModal.show();
  }

  search() {
    if (this.authService.onReloadTicketTable) {
      this.authService.onReloadTicketTable.emit(true);
    }
  }

}
