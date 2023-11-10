import { Injectable } from '@angular/core';
import { PersonRh } from './interfaces/personRHnet.component';
import { RhnetService } from './rhnet.service';
import { Empleado } from './components/interfaces/Empleados';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PersonService {
  numEmpleado: any;



  constructor( public rhService: RhnetService) {

    let usuarioAuth=JSON.parse(localStorage.getItem('datalogin')!);
    this.numEmpleado = usuarioAuth.data.Numero_Empleado;
  }

  private persona:PersonRh[] = [];


  public  infoEmpleado:Empleado

  informacion() {
    this.rhService.getAllInfoEmpleados(this.numEmpleado).subscribe((res: any) => {
      console.log("informacion del empleado", res);
      this.infoEmpleado = res;


      this.infoEmpleado = {
        nombre: res.nombre,
        numeroEmpleado: res.NUMERO_EMPLEADO,
        fechaAlta: res.FECHA_ALTA,
        id: res.id,
        correo: res.EMAIL,
        nombreJefe: res.NombreDelJefe,
        correoJefe: res.correoDelJefe,
        numeroEmpledoJefe: res.NUMERO_EMPLEADO_JEFE,
      };


    });
    return this.infoEmpleado;
  }






}
