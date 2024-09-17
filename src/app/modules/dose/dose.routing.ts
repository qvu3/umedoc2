import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../common/guard/guard';
import { RoleConstants } from '../../Global';
import { DoseViewComponent } from './dose-view/dose-view.component';
import { NotificationComponent } from './notification/notification.component';

const routing: Routes = [
    {
        path: 'e-script/:patientid', component: DoseViewComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.Provider, RoleConstants.CompanyAdmin, RoleConstants.SpecialAdmin] }
    },
    {
        path: 'notifications', component: NotificationComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.Provider, RoleConstants.CompanyAdmin, RoleConstants.SpecialAdmin] }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routing)],
    exports: [RouterModule]
})
export class doseRoutes { }