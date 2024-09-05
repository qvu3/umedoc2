import { Pipe, PipeTransform } from '@angular/core';
import Global from 'src/app/Global';

@Pipe({
  name: 'stateName'
})
export class StateNamePipe implements PipeTransform {

  transform(value: string): unknown {
    if(value){
      var states =  Global.US_StateList.filter(x=>x.value == value);
      if(states && states.length>0){
        return states[0].name;
      }
    }
    return '';
  }

}
