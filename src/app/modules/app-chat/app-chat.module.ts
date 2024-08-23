import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { SharedModule } from '../common/common.module';

import { AppChatRoutingModule } from './app-chat-routing.module';
import { ChatContainerComponent } from './chat-container/chat-container.component';
import { ContactChannelComponent } from './contact-channel/contact-channel.component';
import { ContactRoomComponent } from './contact-room/contact-room.component';
import { EmptyChatComponent } from './empty-chat/empty-chat.component';
import { LayoutAppChatComponent } from './layout-app-chat/layout-app-chat.component';
import { MainChatComponent } from './main-chat/main-chat.component';
import { MessageShowChatComponent } from './message-show-chat/message-show-chat.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppChatRoutingModule,
    ChatContainerComponent,
    ContactChannelComponent,
    ContactRoomComponent,
    EmptyChatComponent,
    LayoutAppChatComponent,
    MainChatComponent,
    MessageShowChatComponent,
    FormsModule,
    // SharedModule
  ],
  exports: [
    ContactRoomComponent,
    EmptyChatComponent,
    MainChatComponent,
    ContactChannelComponent,
    MessageShowChatComponent,
  ]
})
export class AppChatModule { }
