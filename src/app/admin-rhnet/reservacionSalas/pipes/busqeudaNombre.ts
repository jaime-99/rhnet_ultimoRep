import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'busqueda'
})
export class busqueda implements PipeTransform {
  transform(items: any[], filtro: string): any[] {
    if (!items || !filtro) {
      return items;
    }

    return items.filter(item => {
      const nombreCompleto = (item.NOMBRE_COMPLETO || '').toLowerCase();
      return nombreCompleto.includes(filtro.toLowerCase());
    });
  }
}
