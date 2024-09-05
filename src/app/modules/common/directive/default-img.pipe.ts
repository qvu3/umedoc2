import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultImg'
})
export class DefaultImgPipe implements PipeTransform {

  transform(value:string): unknown {
    return value??'https://umedoc-prod.s3.amazonaws.com/RandomFiles/umedoc-defaultavatar.png'
  }

}
