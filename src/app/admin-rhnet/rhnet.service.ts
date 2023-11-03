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
      p_Empresa,p_NumeroEmpleadoJefe,p_Hora,p_AutorizadoSalida,p_HoraEntrada,p_HoraSalida,p_estatus
  )
        {
          const url=`${ this.baseUrl }/usuario/paseDigital.php`;
          const body={p_NumeroEmpleado,p_Fecha,p_Tipo,p_Motivo,p_Autorizado,
            p_Empresa,p_NumeroEmpleadoJefe,p_Hora,p_AutorizadoSalida,p_HoraEntrada,p_HoraSalida,p_estatus}
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
    sendToBoss(fecha,numeroEmpleado,motivo,nombre,correo,tipoDePase){
      const url=`${ this.baseUrl }/tools/enviarPaseJefe.php`;
      const body={fecha,numeroEmpleado,motivo,nombre,correo,tipoDePase}
      return this.http.post<any>( url, body );
    }
    //obtiene los datos de la tabla pases
    getPases(numUsuario):any{
      const apiUrl = `https://www.dikeninternational.com/angular_service/api/usuario/getPasesDigitales.php?numUsuario=${numUsuario}`;
      return this.http.get(apiUrl);
    }
    //actualiza la tabla
    updatePases(p_Autorizado,p_AutorizadoSalida, p_PaseDigitalId){
      const url=`https://www.dikeninternational.com/angular_service/api/usuario/updatePases.php`;
      const body={p_Autorizado,p_AutorizadoSalida, p_PaseDigitalId}
      return this.http.put( url, body );
    }
    // para ver los pases por autorizar que tiene el usuario
    getPasesJefe(idUsu):any{
      const url=`https://www.dikeninternational.com/angular_service/api/usuario/getPasesJefe.php?idUsu=${idUsu}`;
      return this.http.get(url);
    }
    // para ver la informacion de los empleados
    getAllInfoEmpleados(nameId):any{
      const url=`https://www.dikeninternational.com/angular_service/api/usuario/getAllInfoUsuario.php?nameId=${nameId}`;
      return this.http.get(url);
    }
    // para ver las notificaciones que tiene cada usuario
    getNotificaciones(id):any{
      const url=`https://www.dikeninternational.com/angular_service/api/usuario/getNotificaciones.php?id=${id}`;
      return this.http.get(url);
    }

    //insertarNotificaciones

    insertarNotificacion(p_usuario_id,p_mensaje,p_tipo){
      const url=`${ this.baseUrl }/usuario/insertarNotificacion.php`;
      const body={p_usuario_id,p_mensaje,p_tipo}
      return this.http.post<any>( url, body );
    }

    //es para marcar el mensaje como leido solamente
    marcarComoLeido(mensaje_id){
      const url=`https://www.dikeninternational.com/angular_service/api/usuario/actualizarMensajeLeido.php`;
      const body={mensaje_id}
      return this.http.put( url, body );
    }

    // es para eliminar un pase

    eliminarPaseDigital(id: number) {
      const url = `https://www.dikeninternational.com/angular_service/api/usuario/deletePaseDigital.php?id=${id}`;
      return this.http.delete(url);
    }

    eliminarMensaje(idMensaje:number){
      const url = `https://www.dikeninternational.com/angular_service/api/usuario/deleteMensaje.php?idMensaje=${idMensaje}`;
      return this.http.delete(url);
    }


    sendEmail(fecha,numeroEmpleado,motivo,nombre,correo,tipoDePase,nombreDelJefe){
      const url=`${ this.baseUrl }/tools/enviarCorreoCaseta.php`;
      const body={fecha,numeroEmpleado,motivo,nombre,correo,tipoDePase,nombreDelJefe}
      return this.http.post<any>( url, body );
    }

    //obtener todos los pases que son autorizados

    getPasesAutorizados():any{
      const url=`https://www.dikeninternational.com/angular_service/api/usuario/pasesAutorizados.php`;
      return this.http.get(url);
    }

    // VER LOS EMPLEADOS DE UN JEFE

    getEmpleadosJefe(id):any{
      const url=`https://www.dikeninternational.com/angular_service/api/usuario/verEmpleadosJefe.php?id=${id}`;
      return this.http.get(url);
    }
    // ver todos los empleados
    getTodosLosEmpleados():any{
      const url=`https://www.dikeninternational.com/angular_service/api/usuario/obtenerTodosLosPases.php`;
      return this.http.get(url);
    }

    getPerfilVigilancia():any{
      const url=`https://www.dikeninternational.com/angular_service/api/usuario/getPerfilVigilancia.php`;
      return this.http.get(url);
    }


    //enviar mensaje de no autorizado al empleado y desarrollo humano

    sendEmpleado(fecha,numeroEmpleado,motivo,nombre,correo,tipoDePase,nombreDelJefe){
      const url=`${ this.baseUrl }/tools/enviarCorreoNoAutorizado.php`;
      const body={fecha,numeroEmpleado,motivo,nombre,correo,tipoDePase,nombreDelJefe}
      return this.http.post<any>( url, body );
    }

    //! Empezamos con VACACIONES



    insertarSolicitud(EmpleadoId,Numero_empleado,Fecha_inicio,FechaFin,DiasSolicitados,Periodo,
      Id_Jefe,Id_autorizoRH,IdEstatusSolicitudVaciones,Observaciones,Observaciones_jefe){
      const url=`${ this.baseUrl }/Vacaciones/insertarSolicitud.php`;
      const body={EmpleadoId,Numero_empleado,Fecha_inicio,FechaFin,DiasSolicitados,Periodo,
        Id_Jefe,Id_autorizoRH,IdEstatusSolicitudVaciones,Observaciones,Observaciones_jefe}
      return this.http.post<any>( url, body );
    }







}
