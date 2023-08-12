import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'localeDate'
})
export class LocaleDatePipe implements PipeTransform {
  transform(value: any): string {
    if (value === null || value === undefined || value === '') {
      return '';
    }
    let paramValue = value.toString().split('-');
    return paramValue[2] + '/' + paramValue[1] + '/' + paramValue[0];
  }
}
