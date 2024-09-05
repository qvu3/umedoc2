import { Pipe, PipeTransform } from '@angular/core';
declare var moment:any;
@Pipe({
  name: 'orderBySentDate'
})
export class OrderBySentDatePipe implements PipeTransform {

  transform(items: any[]): any[] {
    return items.sort((a, b) => {
      let aDate: Date = a.SentDate;
      let bDate: Date = b.SentDate;
      return moment(aDate).subtract(bDate);
    });
  }

}
