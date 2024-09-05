import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultPicture'
})
export class DefaultPicturePipe implements PipeTransform {

  transform(value:string): unknown {
    return !value?'https://via.placeholder.com/150':value;
  }

}
