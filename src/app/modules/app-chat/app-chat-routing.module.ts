import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutAppChatComponent } from './layout-app-chat/layout-app-chat.component';
import { MainChatComponent } from './main-chat/main-chat.component';
import { EmptyChatComponent } from './empty-chat/empty-chat.component';
import { ChatContainerComponent } from './chat-container/chat-container.component';
import { ContactChannelComponent } from './contact-channel/contact-channel.component';
import { MessageShowChatComponent } from './message-show-chat/message-show-chat.component';
import { ContactRoomComponent } from './contact-room/contact-room.component';

const routes: Routes = [
  { path: '', component: LayoutAppChatComponent },
  { path: 'main-chat', component: MainChatComponent },
  { path: 'empty-chat', component: EmptyChatComponent },
  { path: 'chat-container', component: ChatContainerComponent },
  { path: 'contact-channel', component: ContactChannelComponent },
  { path: 'message-show-chat', component: MessageShowChatComponent },
  { path: 'contact-room', component: ContactRoomComponent },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppChatRoutingModule { }
