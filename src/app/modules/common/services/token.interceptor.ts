import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse
} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
declare var $: any;
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    @BlockUI()
    blockUI!: NgBlockUI;
    constructor(public auth: TokenService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const user = this.auth.getCurrentUser();
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (user) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${user.access_token}`,
                    'tz-client': (tz ?? '')
                }
            });
        }
        else {
            request = request.clone({
                setHeaders: {
                    'tz-client': (tz ?? '')
                }
            });
        }
        if (request.url.indexOf('/api/PatientRequest/GetTotalToDo') < 0
            && request.url.indexOf('/api/Ticket/GetTotalWaiting') < 0
            && request.url.indexOf('/api/Ticket/CreateMessage') < 0
            && request.url.indexOf('/api/Appointment/InterestHealthCoach') < 0
            && request.url.indexOf('/api/Appointment/InterestDiabetic') < 0
            && request.url.indexOf('/api/Appointment/CountWaitingAppointment') < 0
            && request.url.indexOf('/CountHeadWaitingAppointment') < 0
            && request.url.indexOf('/CountDoseNotification') < 0
            && request.url.indexOf('/api/Chat/GetLastestMessageDate') < 0
            && request.url.indexOf('/api/Chat/Send') < 0
            && request.url.indexOf('/api/Utility/GetThumbnailS3Image') < 0
            && request.url.indexOf('/api/Chat/GetRoomInfo') < 0
            && request.url.indexOf('/api/Chat/MarkedRead') < 0
            && request.url.indexOf('/api/Chat/GetRooms') < 0
            && request.url.indexOf('/api/VideoCallHistory/GetByAppointmentID') < 0
            && request.url.indexOf('/api/ProviderTask/CountTotalTaskListTodoAssigneeAsync') < 0) {
            //start block ui  
            this.blockUI.start('Processing your request...');
        }
        return next.handle(request)
            .pipe(
                tap(event => {
                    if (event instanceof HttpResponse) {
                        this.blockUI.stop();
                    }
                }, error => {
                    this.blockUI.stop();
                })
            )
    }
}
