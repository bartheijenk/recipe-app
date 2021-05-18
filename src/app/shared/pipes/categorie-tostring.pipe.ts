import { Pipe, PipeTransform } from '@angular/core';
import { Categorie } from '../models/categorie';

@Pipe({
  name: 'categorieTostring'
})
export class CategorieTostringPipe implements PipeTransform {

  transform(value: Categorie[], ...args: unknown[]): unknown {
    let output: string = "";
    if (value.length != 0) {
      value.forEach(
        c => {
          if (value.indexOf(c) != value.length - 1) {
            output += c.naam + ", ";
          } else {
            output += c.naam;
          }
        }
      );
    }
    return output;

  }

}
