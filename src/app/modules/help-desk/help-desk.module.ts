import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuidLineComponent } from './guid-line/guid-line.component';
import { HelpDeskLayoutComponent } from './help-desk-layout/help-desk-layout.component';
import { helpDeskRoutes } from './help-desk.routing';
import { SharedModule } from '../common/common.module';



@NgModule({
  declarations: [GuidLineComponent, HelpDeskLayoutComponent],
  imports: [
    CommonModule,
    SharedModule,
    helpDeskRoutes
  ]
})
export class HelpDeskModule { }
