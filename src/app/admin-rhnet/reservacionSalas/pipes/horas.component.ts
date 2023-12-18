// hora.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatarHora'
})
export class FormatarHoraPipe implements PipeTransform {
  transform(hora: string): string {
    if (!hora) {
      return hora;
    }

    const hora24 = hora.split(':');
    let horas = parseInt(hora24[0], 10);
    const minutos = hora24[1];

    const amPm = horas >= 12 ? 'p.m.' : 'a.m.';
    horas = horas % 12 || 12;

    return `${horas}:${minutos} ${amPm}`;
  }
}
