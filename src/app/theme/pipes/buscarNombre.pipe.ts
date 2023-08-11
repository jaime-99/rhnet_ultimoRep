import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from 'src/app/admin/users/user.model';
// import { Usuario } from 'src/app/auth/interfaces/iUsuario';

@Pipe({
  name: 'BuscarNombre'
})
export class BuscarNombre implements PipeTransform {
  transform(usuarios: Usuario[], searchText: string): Usuario[] {
    if (!usuarios || !searchText) {
      return usuarios;
    }

    searchText = searchText.toLowerCase();

    return usuarios.filter((usuario: Usuario) => {
      return (
        (usuario.name && usuario.name.toLowerCase().includes(searchText)) ||
        (usuario.number && usuario.number.includes(searchText)) ||
        (usuario.nombreUsuario && usuario.nombreUsuario.includes(searchText))

      );
    });
  }
}
