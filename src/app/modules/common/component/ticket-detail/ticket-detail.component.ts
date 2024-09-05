import { TicketType } from './../../constant/message.const';
import { PrmcHub } from 'src/app/modules/common/services/prmc-hub';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { BaseComponent } from 'src/app/modules/base.component';
import { TicketMessageModel } from './../../models/ticket-message.model';
import { TicketModel } from './../../models/ticket.model';
import { DatePipe } from '@angular/common';
import { TicketService } from './../../services/ticket.service';
import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css'],
  providers: [DatePipe]
})
export class TicketDetailComponent extends BaseComponent implements OnInit, OnDestroy {
  @Input() ticketId: string;
  @Input() isAdminSite: boolean = false;
  link: string = '';
  model: TicketModel;
  message: string = '';
  isPrivate: boolean = false;
  routerName: string;
  currentUserId: string;
  @ViewChild('contentMessageContainer') contentMessageContainer: ElementRef;
  constructor(private authService: AuthenticationService,
    private dialog: CommonDialogService,
    private prmcHub: PrmcHub,
    private router: Router,
    private service: TicketService, private datePipe: DatePipe,
  ) {
    super(authService);
    this.currentUserId = authService.GetCurrentUser().Id;
  }

  ngOnInit(): void {
    this.model = new TicketModel();
    this.model.Messages = [];
    this.getEntity();
    this.registerMessageListener();
    this.link = `/api/Ticket/UploadTicketMessageFile/${this.ticketId}`;
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.contentMessageContainer) {
        this.contentMessageContainer.nativeElement.scrollTop = this.contentMessageContainer.nativeElement.scrollHeight - this.contentMessageContainer.nativeElement.clientHeight;
      }
    }, 300);
  }

  viewFile(fileUrl: string) { 
    if (fileUrl) {
      this.service.View(fileUrl).subscribe(r => {
        if (r) {
          var redirectWindow = window.open(r, '_blank');
          redirectWindow.location;
        }
      });
    }
  }

  sendTypeTicket(type: TicketType) {
    if (!this.model || !this.model.UseChatBot) return;
    this.service.UpdateCategoryTicket(this.model.ID, type).subscribe(r => {
      this.message = '';
      this.getEntity();
    }, error => {
      this.dialog.showToastrError('Ticket Support', 'Cannot send your  message in this  time');
    });
  }

  onKeyUpMessage(event) {
    if (event.which === 13) {
      if (event.shiftKey) {
        event.preventDefault();
      }
      else {
        this.send();
      }
    }
  }

  registerMessageListener() {
    this.prmcHub.onDeleteMessageTicketNotify.subscribe((ticketMessageId: string) => {
      if (ticketMessageId && this.model.Messages) {
        let indexMessage = this.model.Messages.findIndex(x => x.ID == ticketMessageId);
        if (indexMessage >= 0) {
          this.model.Messages.splice(indexMessage, 1);
          this.scrollToBottom();
        }
      }
    });

    this.prmcHub.onNewMessageTicketNotify.subscribe((msg: TicketMessageModel) => {
      if (this.model && msg.TicketID == this.ticketId) {
        if (this.currentUser.Role == 'Patient' && msg.IsPrivate) return;
        if (msg.Ticket) {
          this.model.Status = msg.Ticket.Status;
          this.model.Priority = msg.Ticket.Priority;
          this.model.Type = msg.Ticket.Type;
        }
        if (this.model.Messages.find(x => x.ID == msg.ID) == null) {
          this.model.Messages.push(msg);
          this.scrollToBottom();
        }
      }
    });
  }

  checkIsPatientRole() {
    return this.currentUser && this.currentUser.Role == 'Patient';
  }

  getEntity() {
    this.service.Get(this.ticketId).subscribe(r => {
      this.model = r;
      this.model.Messages = this.model.Messages ?? [];
      this.scrollToBottom();
    });
  }

  getTicketMessages() {
    if (this.model) {
      this.service.GetMessages(this.model.ID).subscribe(r => {
        this.model.Messages = r;
      })
    }
  }

  deleteMessage(ticketMessageId) {
    if (ticketMessageId) {
      this.dialog.showSwalConfirmAlert('Are you sure you want to delete this message?').then(isConfirm => {
        if (isConfirm) {
          this.service.DeleteMessage(ticketMessageId).subscribe(r => {
            this.dialog.showToastrSuccess('Delete Message', MessageConstant.DEL_SUCCESS_CONST);
          }, error => {
            this.dialog.showSwalErrorAlert('Delete Message', MessageConstant.FAILURE_REQUEST);
          });
        }
      })

    }
  }

  send() {

    if (this.message) {
      var msg = this.message;
      this.message = '';
      var info = new TicketMessageModel();
      info.Message = msg;
      info.TicketID = this.model.ID;
      info.IsPrivate = this.isPrivate;
      this.service.CreateMessage(info).subscribe(r => {
        this.message = '';
      });
    }
  }

  save() {
    if (!this.model) return;
    this.service.Edit(this.model).subscribe(r => {
      this.dialog.showToastrSuccess('Ticket', MessageConstant.REQUEST_SUCCESS_CONST);
    });
  }

  backToTickets() {
    this.router.navigate([`/patient-tickets`]);
  }

  ngOnDestroy() {
    // this.prmcHub.onNewMessageTicketNotify.unsubscribe();
  }

  uploadStatus(message) {

  }

  uploaded(returnObject) {

  }

  errorUploaded(messageId) {

  }

}
