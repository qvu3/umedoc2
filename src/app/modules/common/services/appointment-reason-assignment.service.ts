import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from '../../../Global';
import { AppointmentReasonAssignmentModel } from '../models/appointment-reason-assignment.model';

@Injectable()
export class AppointmentReasonAssignmentService extends BaseService<AppointmentReasonAssignmentModel>{
    constructor(public http: HttpClient) {
        super(http);
        this.resource = `${Global.apiUrl}/api/AppointmentReasonAssignment`;
    }
}
