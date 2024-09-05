import {Injectable} from '@angular/core';
import Global from '../../../Global';
import UserModel from '../models/user.model';

@Injectable()
export class TokenService {

  getCurrentUser(): UserModel {
    //const strValue = sessionStorage.getItem(Global.currentUser);
    const strValue = sessionStorage.getItem(Global.currentUser);
    if (strValue) {
      return JSON.parse(strValue) as UserModel;
    }
    return null;
  }

  getAccessToken(){
    //const strValue = sessionStorage.getItem(Global.currentUser);
    const strValue = sessionStorage.getItem(Global.currentUser);
    if (strValue) {
      var user =  JSON.parse(strValue) as UserModel;
      if(user){
        return user.access_token;
      }
    }
    return null;
  }
}
