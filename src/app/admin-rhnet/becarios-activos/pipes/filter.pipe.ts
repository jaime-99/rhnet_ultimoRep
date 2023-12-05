import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], filtro: string): any[] {
    if (!items || !filtro) {
      return items;
    }

    return items.filter(item => item.nombre.toLowerCase().includes(filtro.toLowerCase()));
  }
}
