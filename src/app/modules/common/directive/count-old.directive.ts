import { Pipe, PipeTransform } from '@angular/core';
declare var moment:any;
@Pipe({
  name: 'countOld'
})
export class CountOldPipe implements PipeTransform {

  transform(value: Date): any {
    if (value) {
      var birthday = new Date(value);
      var ageDifMs = Date.now() - birthday.getTime();
      var ageDate = new Date(ageDifMs); // miliseconds from epoch
      return `${Math.abs(ageDate.getUTCFullYear() - 1970)} year(s) old` ;
    }
    return '';
  }

}
