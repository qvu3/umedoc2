import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chatAvatar'
})
export class ChatAvatarPipe implements PipeTransform {

  transform(value: string, isProvider: boolean): unknown {
    if (isProvider) {
      return 'https://umedoc-prod.s3.amazonaws.com/RandomFiles/group_chat.png';
    }
    return value ?? 'https://umedoc-prod.s3.amazonaws.com/RandomFiles/umedoc-defaultavatar.png'
  }

}
