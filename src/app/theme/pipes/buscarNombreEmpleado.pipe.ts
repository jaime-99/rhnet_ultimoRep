import { Pipe, PipeTransform } from '@angular/core';
import { Empleados } from 'src/app/admin/users/user.model';
// import { empleado } from 'src/app/auth/interfaces/iempleado';

@Pipe({
  name: 'BuscarNombreEmpleado'
})
export class BuscarNombreEmpleado implements PipeTransform {
  transform(empleados: Empleados[], searchText: string): Empleados[] {
    if (!empleados || !searchText) {
      return empleados;
    }

    searchText = searchText.toLowerCase();

    return empleados.filter((empleado: Empleados) => {
      return (
        (empleado.Nombre && empleado.TextSearch.toLowerCase().includes(searchText))
        // (empleado.number && empleado.number.includes(searchText)) ||
        // (empleado.nombreempleado && empleado.nombreempleado.includes(searchText))

      );
    });
  }
}
