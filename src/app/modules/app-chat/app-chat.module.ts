import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutAppChatComponent } from './layout-app-chat/layout-app-chat.component';
import { MainChatComponent } from './main-chat/main-chat.component';
import { AppChatRoutingModule } from './app-chat.routing.module';
import { SharedModule } from '../common/common.module';
import { FormsModule } from '@angular/forms'; 
import { ContactRoomComponent } from './contact-room/contact-room.component';
import { EmptyChatComponent } from './empty-chat/empty-chat.component';
import { ChatContainerComponent } from './chat-container/chat-container.component';
import { ContactChannelComponent } from './contact-channel/contact-channel.component';
import { MessageShowChatComponent } from './message-show-chat/message-show-chat.component'; 

@NgModule({
  declarations: [LayoutAppChatComponent, MainChatComponent, ContactRoomComponent, EmptyChatComponent, ChatContainerComponent, ContactChannelComponent, MessageShowChatComponent],
  imports: [ 
    CommonModule, 
    SharedModule,    
    FormsModule, 
    AppChatRoutingModule,
  ],
  exports:[
    ContactRoomComponent , 
    EmptyChatComponent,
    MainChatComponent,
    ContactChannelComponent,
    MessageShowChatComponent
  ]
})
export class AppChatModule { }
