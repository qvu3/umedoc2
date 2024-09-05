import UserModel from "./common/models/user.model";
import { OnInit, AfterViewInit } from "@angular/core";
import { AuthenticationService } from "./common/services/authentication.service";
import { Keepalive } from "@ng-idle/keepalive";
import { DEFAULT_INTERRUPTSOURCES, Idle } from "@ng-idle/core";
import Global from '../Global';
import { Router } from '@angular/router';
import { environment } from "src/environments/environment";

declare var b64toBlob: any;
declare var $: any;
declare var swal: any;
export class BaseComponent implements OnInit, AfterViewInit {
    idle: Idle;
    keepalive: Keepalive;
    idleState = 'Not started.';
    timedOut = false;
    FsRoomName: string = `rooms${environment.envSuffix}`;
    FsParticipantName: string = `participants${environment.envSuffix}`;
    FsMessageName: string = `messages${environment.envSuffix}`;
    FsMessageStatusName: string = `messagestatuses${environment.envSuffix}`;
    emergencyWords = ["chest pain" , "uncontrollable bleeding"];

    get TotalMessageUnRead() {
        return this.authenticationService.totalMessageUnread;
    }
    get CurrentRoomId() {
        return this.authenticationService.currentRoomId;
    }
    lastPing?: Date = null;
    _currentUser: UserModel;
    get currentUser() {
        this._currentUser = this.authenticationService.GetCurrentUser();
        return this._currentUser;
    }
    public maskCardNumber = [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];
    public maskCVV = [/\d/, /\d/, /\d/];
    public maskExp = [/\d/, /\d/];
    public maskPhone = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    public maskZipCode = [/\d/, /\d/, /\d/, /\d/, /\d/];
    public maskYearInPractice = [/\d/, /\d/];
    public maskYear = [/\d/, /\d/, /\d/, /\d/];
    public maskSSN = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];


    constructor(public authenticationService: AuthenticationService) {

    }

    ngOnInit() {

    }

    ngAfterViewInit() {

    }

    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    scrollToTop(top = 0, left = 0) {
        setTimeout(() => {
            window.scrollTo(top, left);
        }, 300);
    }

    saveAs(data, fileName) {
        var blob = b64toBlob(data, "application/pdf");
        var url = window.URL.createObjectURL(blob);

        var anchorElem = document.createElement("a");
        anchorElem.href = url;
        anchorElem.download = fileName;

        document.body.appendChild(anchorElem);
        anchorElem.click();

        document.body.removeChild(anchorElem);

        // On Edge, revokeObjectURL should be called only after
        // a.click() has completed, atleast on EdgeHTML 15.15048
        setTimeout(function () {
            window.URL.revokeObjectURL(url);
        }, 1000);
    }

    convertDataToURL(data) {
        var blob = b64toBlob(data, "application/pdf");
        return window.URL.createObjectURL(blob);
    };

    downloadBlod(data, filename) {
        const a = document.createElement('a');
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        a.download = filename.replace(/"/g, '');
        a.href = URL.createObjectURL(data);
        a.target = '_blank';
        a.click();
        document.body.removeChild(a);
    }

    calculateAge(birthday: Date) {
        var ageDiffMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDiffMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }


    registerIdle(idle, keepalive, router: Router) {
        this.idle = idle;
        this.keepalive = keepalive;

        if (this.currentUser) {
            // sets an idle timeout of 34mins 45secs , for testing purposes.
            idle.setIdle(2085); //2085
            // sets a timeout period of 15secs. after 35 minutes of inactivity, the user will be considered timed out.
            idle.setTimeout(15); //15
            // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
            idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

            var idleEndSubcrible = idle.onIdleEnd.subscribe(() => {
                this.idleState = 'No longer idle.';
                this.authenticationService.setIsIdle(false);
            });
            var timeOutSubscription = idle.onTimeout.subscribe(() => {
                this.idleState = 'Timed out!';
                this.timedOut = true;
                this.authenticationService.setIsIdle(true);
            });

            var idleStartSubscription = idle.onIdleStart.subscribe(() => {
                this.idleState = 'You\'ve gone idle!';
                //console.log('idle');
            });

            var timeoutWarning = idle.onTimeoutWarning.subscribe((countdown) => {
                this.idleState = 'You will time out in ' + countdown + ' seconds!';
                // console.log(this.idleState);
                if (countdown == 1) {
                    //go to logout ;
                    //console.log('go to logout');
                    this.authenticationService.SignOut();
                    sessionStorage.removeItem(Global.currentUser);
                    this.authenticationService.setIsIdle(false);
                    router.navigate(['/']);
                    swal('Timed Out', 'You have been logged out due to inactivity', 'warning');
                }
            });

            // sets the ping interval to 1 seconds
            keepalive.interval(1);
            var keepaliveSubcription = keepalive.onPing.subscribe(() => this.lastPing = new Date());
            this.reset();
        }
    }

    reset() {
        this.idle.watch();
        this.idleState = 'Started.';
        this.timedOut = false;
    }

    saveCriteria(key: string, criteria) {
        sessionStorage.setItem(key, JSON.stringify(criteria));
    }

    getCriteria(key: string) {
        var strCriteria = sessionStorage.getItem(key);
        if (strCriteria) {
            return JSON.parse(strCriteria);
        }
        return null;
    }

}
