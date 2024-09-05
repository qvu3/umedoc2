import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { DoseViewComponent } from './dose-view/dose-view.component';
import { SharedModule } from '../common/common.module';
import { doseRoutes } from './dose.routing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../common/services/token.interceptor';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    LayoutComponent, 
    DoseViewComponent, NotificationComponent
  ],
  imports: [
    CommonModule, 
    SharedModule,
    doseRoutes
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
})
export class DoseModule { }
