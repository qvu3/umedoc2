import { RequestAppointmentComponent } from '../../home/components/request-appointment/request-appointment.component';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CommonDialogService } from '../services/dialog.service';
import { Location } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';
import { environment } from '../../../../environments/environment';
import { WaitingRoomComponent } from '../../home/components/waiting-room/waiting-room.component';

@Injectable({
    providedIn: 'root'
})
export class CanDeactiveRequest implements CanDeactivate<RequestAppointmentComponent>{

    constructor(private dialog: CommonDialogService,
        private readonly router: Router,
        private readonly location: Location,
        private authService: AuthenticationService) {

    }

    canDeactivate(
        component: RequestAppointmentComponent,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState: RouterStateSnapshot,
    ) { 
        if (currentState.url.indexOf('appointment-room') > 0) {
            if (nextState.url.indexOf('payment') > 0) {
                var isConfirm = this.dialog.showSwalConfirmAlert('Are you sure you want to leave this waiting room?');
                isConfirm.then(confirmed => {
                    if (confirmed) { 
                        this.router.navigateByUrl(`/patient-profile`);
                    } 
                });
                return isConfirm;  
            }

            return true;
        }

        if (currentState.url.indexOf('group-appt-waiting-room') > 0) {
            if (nextState.url.indexOf('appt-payment') > 0) {
                var isConfirm = this.dialog.showSwalConfirmAlert('Are you sure you want to leave this waiting room?');
                isConfirm.then(confirmed => {
                    if (confirmed) { 
                        this.router.navigateByUrl(`/patient-profile`);
                    } 
                });
                return isConfirm;  
            }

            return true;
        }

        var currentUser = this.authService.GetCurrentUser();
        if ((nextState.url.indexOf(environment.coinbaseUrl) < 0 && nextState.url.indexOf('appointment-room') < 0 &&
            nextState.url.indexOf('booking/request-appointment') < 0)
            && currentUser) {
            var isConfirm = this.dialog.showSwalConfirmAlert('Are you sure you want to quit this Appointment Request process?');
            isConfirm.then(confirmed => {
                if (!confirmed) {
                    const currentUrlTree = this.router.createUrlTree([], { fragment: currentRoute.fragment as string | undefined });
                    const currentUrl = currentUrlTree.toString();
                    this.location.go(currentUrl);
                }
                else {
                    sessionStorage.removeItem('request-appt');
                }
            });
            return isConfirm;
        }
        return true;
    }
}