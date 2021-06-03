import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newlines'
})
export class NewlinesPipe implements PipeTransform {

  transform(value: string | undefined, ...args: unknown[]): unknown {
    if(value == undefined) {
      return undefined;
    }
    return value.replace(/\\n/g, '<br/><br/>');
  }

}
