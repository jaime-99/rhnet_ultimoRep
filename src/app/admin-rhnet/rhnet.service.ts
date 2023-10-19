import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class RhnetService {

  private baseUrl: string = "https://www.dikeninternational.com/angular_service/api";


  constructor(private http:HttpClient, public snackBar: MatSnackBar) { }

// es para insertar el pase
  InsertarPase(
    p_NumeroEmpleado,p_Fecha,p_Tipo,p_Motivo,p_Autorizado,
      p_Empresa,p_NumeroEmpleadoJefe,p_Hora,p_AutorizadoSalida,p_HoraEntrada,p_HoraSalida
  )
        {
          const url=`${ this.baseUrl }/usuario/paseDigital.php`;
          const body={p_NumeroEmpleado,p_Fecha,p_Tipo,p_Motivo,p_Autorizado,
            p_Empresa,p_NumeroEmpleadoJefe,p_Hora,p_AutorizadoSalida,p_HoraEntrada,p_HoraSalida}
          return this.http.post<any>( url, body );

        }

        //obtiene los datos por el nombre de la tabla de usuarios
    getUsuariosPorId(nombreUsuario:string){
      const apiUrl = `https://www.dikeninternational.com/angular_service/api/usuario/getUsuariosId.php?nombreUsuario=${nombreUsuario}`;
      return this.http.get(apiUrl);
    }
    //obtiene los datos por el Id de la tabla de usuarios
    getUsuariosPorId1(usuarioId:string){
      const apiUrl = `https://www.dikeninternational.com/angular_service/api/usuario/getUsuariosPorId.php?usuarioId=${usuarioId}`;
      return this.http.get(apiUrl);
    }

    //es para enviar el pase al jefe
    sendToBoss(fecha,numeroEmpleado,motivo,nombre){
      const url=`${ this.baseUrl }/tools/enviarPaseJefe.php`;
      const body={fecha,numeroEmpleado,motivo,nombre}
      return this.http.post<any>( url, body );
    }
    //obtiene los datos de la tabla pases
    getPases():any{
      const apiUrl = `https://www.dikeninternational.com/angular_service/api/usuario/getPasesDigitales.php`;
      return this.http.get(apiUrl);
    }

    updatePases(p_Autorizado,p_AutorizadoSalida, p_PaseDigitalId){
      const url=`https://www.dikeninternational.com/angular_service/api/usuario/updatePases.php`;
      const body={p_Autorizado,p_AutorizadoSalida, p_PaseDigitalId}
      return this.http.put( url, body );
    }






}
