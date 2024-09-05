import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { MessageChatModel } from '../../common/models/message-chat.model';
import { AppChatService } from '../../common/services/app-chat.service';
import { AuthenticationService } from '../../common/services/authentication.service';
import { CommonDialogService } from '../../common/services/dialog.service';
import { UtilityService } from '../../common/services/utility.service';
@Component({
  selector: '[app-message-show-chat]',
  templateUrl: './message-show-chat.component.html',
  styleUrls: ['./message-show-chat.component.css']
})
export class MessageShowChatComponent extends BaseComponent implements OnInit , OnChanges {
  @Input() item: MessageChatModel;
  @Input() isLeft: boolean;
  @Input() path:string;
  thumbnail:string ="";
  constructor(private authService :AuthenticationService,
    private utilityService: UtilityService,
    private chatService:AppChatService,
    private dialog: CommonDialogService) {
      super(authService);
  }

  ngOnChanges(params:SimpleChanges){
    if(params && params.path && params.path.currentValue){
      this.getThumbnail();
    }
  }

  ngOnInit(): void {
    this.getThumbnail();
  }

  getMineType() {
    if (this.item.MineType.startsWith('image/')) {
      return 'la la-image la-10x cursor-pointer';
    }
    else {
      return 'la la-file la-10x cursor-pointer';
    }
  }

  getLink() {
    if (this.item.isSending) {
      this.dialog.showToastrWarning('Your file is uploading, please waiting...', null);
      return;
    }
    if (this.item.Path) {
      this.chatService.Download(this.item.Path).subscribe(r => {
        if (r) {
          var headers = r.headers;
          console.log(headers);
          var contentDisposition = headers.get('content-disposition');
          if (contentDisposition) {
            var filename = contentDisposition.split(';')[1].split('=')[1].trim().replace('"','').replace('"','');
            this.downloadBlod(r.body, filename);
          }
        }
      });
    }
  }

  getThumbnail()
  {
    if(this.item && this.item.IsFile
       && this.item.MineType.includes("image/") && 
        this.item.Path 
       && !this.thumbnail){
      this.utilityService.GetThumbnailS3Image(this.item.Path).subscribe(r => {
        if (r) {
           this.thumbnail = r;
        }
      });
    }
  }

}
