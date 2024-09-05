import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleConstants } from 'src/app/Global';
import { AuthGuard } from '../common/guard/guard';
import { ChatContainerComponent } from './chat-container/chat-container.component';
import { EmptyChatComponent } from './empty-chat/empty-chat.component';
import { MainChatComponent } from './main-chat/main-chat.component';

const routes: Routes = [
  {
    path: 'messages', component: ChatContainerComponent,
    canActivate: [AuthGuard], 
    children: [
      { path: '', redirectTo: 'empty-chat', pathMatch: 'full' },
      {
        path: 'main-chat/:roomId', component: MainChatComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.Patient, RoleConstants.CompanyAdmin, RoleConstants.SpecialAdmin] }
      },
      {
        path: 'empty-chat', component: EmptyChatComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.Patient, RoleConstants.CompanyAdmin, RoleConstants.SpecialAdmin] }
      },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  },
  {
    path: '**', redirectTo: 'empty-chat', pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppChatRoutingModule { }