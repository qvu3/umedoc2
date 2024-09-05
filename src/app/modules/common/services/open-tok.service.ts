import { Injectable } from '@angular/core';

import * as OT from '@opentok/client'; 
import { ToxBoxModel } from '../models/toxbox.model';

@Injectable()
export class OpentokService {

  session!: OT.Session;
  token!: string;

  constructor() { }

  getOT() {
    return OT;
  }

  initSession(config: ToxBoxModel) {
    if (config.apiKey && config.token && config.sessionId) {
      this.session = this.getOT().initSession(config.apiKey, config.sessionId);
      this.token = config.token;
      return Promise.resolve(this.session);
    } 
    return Promise.reject('Invalid configuration');
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.session.connect(this.token, (err) => {
        if (err) {
          reject(err);
        } 
        else {
          resolve(this.session);
        }
      });
    });
  }
}
