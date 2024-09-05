import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanDeactivate,
} from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import UserModel from "../models/user.model";
import Global from "../../../Global";
import { CommonDialogService } from "../services/dialog.service";
import { TLSSocket } from "tls";
const jwtHelper = new JwtHelperService();

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  entry = "";

  constructor(private router: Router, private dialog: CommonDialogService) {
    this.entry = sessionStorage.getItem(Global.currentUser)!;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.entry = sessionStorage.getItem(Global.currentUser) ?? "";
    if (this.entry) {
      // logged in so return true
      // Check whether the token is expired and return
      const tk = JSON.parse(this.entry) as UserModel;
      const result = !jwtHelper.isTokenExpired(tk.access_token);

      if (!result) {
        sessionStorage.removeItem(Global.currentUser);
        this.dialog.showToastrWarning("Please Login Again!");
        this.router.navigate(["/auth/sign-in"]);
      } else {
        if (tk && !tk.IsVerified) {
          if (
            tk.Role == "Patient" &&
            state.url.indexOf("warning-verified") > 0
          ) {
            return true;
          } else if (
            tk.State &&
            tk.PhoneNumberConfirmed &&
            tk.Role == "Provider"
          ) {
            if (
              this.router.routerState.snapshot.url.indexOf(
                "/management/edit-my-profile/provider-storages"
              ) <= 0
            ) {
              this.dialog.showToastrError(
                "Warning",
                "Your account needs to be verified first."
              );
            }

            this.router.navigate([
              "/management/edit-my-profile/provider-storages",
            ]);
            return false;
          }
        }

        if (tk && !tk.PhoneNumberConfirmed && tk.Role == "Patient") {
          if (state.url.indexOf("sms-verify") < 0) {
            this.router.navigateByUrl(`/auth/sms-verify`);
            return false;
          }
        }

        if (
          tk &&
          tk.PhoneNumberConfirmed &&
          tk.Role == "Patient" &&
          !tk.State
        ) {
          if (state.url.indexOf("finished-registration") < 0) {
            this.router.navigateByUrl(`/auth/finished-registration`);
            return false;
          }
        }

        if (!route.data || (route.data && !route.data["Roles"])) {
          if (
            tk.Role == "Provider" &&
            state.url.indexOf("provider-sms-verify") < 0 &&
            state.url.indexOf("provider-finish-registration")
          ) {
            if (
              !tk.PhoneNumberConfirmed &&
              state.url.indexOf("provider-sms-verify") < 0
            ) {
              this.router.navigateByUrl(`/auth/provider-sms-verify`);
              return false;
            } else if (
              !tk.State &&
              state.url.indexOf("provider-finished-registration") < 0
            ) {
              this.router.navigateByUrl(`/auth/provider-finished-registration`);
              return false;
            }
          } else if (
            tk.Role == "Patient" &&
            state.url.indexOf("sms-verify") < 0 &&
            state.url.indexOf("finish-registration")
          ) {
            if (
              !tk.PhoneNumberConfirmed &&
              state.url.indexOf("sms-verify") < 0 &&
              !tk.State
            ) {
              this.router.navigateByUrl(`/auth/sms-verify`);
              return false;
            } else if (
              !tk.State &&
              state.url.indexOf("finished-registration") < 0
            ) {
              this.router.navigateByUrl(`/auth/finished-registration`);
              return false;
            }

            // else if ((tk.State && state.url.indexOf('sms-verify') > 0 || state.url.indexOf('finished-registration') > 0)) {
            //     return false;
            // }
          } else if (
            tk.State &&
            (state.url.indexOf("sms-verify") > 0 ||
              state.url.indexOf("finished-registration") > 0)
          ) {
            return false;
          }
          return true;
        } else {
          var roleRight = false;
          for (var i = 0; i < route.data["Roles"].length; i++) {
            if (tk.Role) {
              if (route.data["Roles"][i] === tk.Role) {
                roleRight = true;
                break;
              }
            }
          }

          if (roleRight === false) {
            this.router.navigate(["/auth/patient-sign-in"], {
              queryParams: { returnUrl: state.url },
            });
          }
        }
      }

      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(["/auth/sign-in"], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.entry = sessionStorage.getItem(Global.currentUser) ?? "";
    if (this.entry) {
      // Check whether the token is expired and return
      const tk = JSON.parse(this.entry) as UserModel;
      const result = !jwtHelper.isTokenExpired(tk.access_token);

      if (!result) {
        this.dialog.showToastrWarning("Please Login Again!");
        sessionStorage.removeItem(Global.currentUser);
        this.router.navigate(["/auth/sign-in"]);
      } else {
        return true;
      }
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(["/auth/sign-in"], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}
