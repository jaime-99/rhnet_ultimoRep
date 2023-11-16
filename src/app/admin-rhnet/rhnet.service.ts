import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Asistencia } from './interfaces/personRHnet.component';

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



    // para insertar una solicitud en la tabla de vacaciones
    insertarSolicitud(EmpleadoId,Numero_empleado,Fecha_inicio,FechaFin,DiasSolicitados,Periodo,
      Id_Jefe,Id_autorizoRH,IdEstatusSolicitudVaciones,Observaciones,Observaciones_jefe){
      const url=`${ this.baseUrl }/Vacaciones/insertarSolicitud.php`;
      const body={EmpleadoId,Numero_empleado,Fecha_inicio,FechaFin,DiasSolicitados,Periodo,
        Id_Jefe,Id_autorizoRH,IdEstatusSolicitudVaciones,Observaciones,Observaciones_jefe}
      return this.http.post<any>( url, body );
    }


    // para obtener la tabla de incidencias_empleados
    getIncidenciasEmpleados(fechaInicio,fechaFin):any{
      const url=`https://www.dikeninternational.com/angular_service/api/usuario/getIncidenciasEmpleados.php?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;
      return this.http.get(url);
    }

    getRelojChecador(id):any{
      const url=`https://www.dikeninternational.com/angular_service/api/usuario/getRelojChecador.php?id=${id}`;
      return this.http.get(url);
    }

    //solicitudes de vacaciones para cada empelado
    getSolicitudes(Empleado_id):any{
      const url=`https://www.dikeninternational.com/angular_service/api/Vacaciones/getSolicitudesPorId.php?Numero_empleado=${Empleado_id}`;
      return this.http.get(url);
    }

    cancelarSolicitud(id){
      const url=`https://www.dikeninternational.com/angular_service/api/Vacaciones/updateEstatusSolicitud.php?id=${id}`;
      const body={id}
      return this.http.put( url, body );
    }
    //ver las solicitudes de tus empleado
    getSolicitudesColaborador(id):any{
      const url=`https://www.dikeninternational.com/angular_service/api/Vacaciones/getSolicitudesColaborador.php?id=${id}`;
      return this.http.get(url);
    }

    // es para enviar el correo al jefe de la solicitud de vacaciones
    sendVacaciones(fecha,fechaInicio,fechaFin,dias,numeroEmpelado,nombre,correo){
      const url=`https://www.dikeninternational.com/angular_service/api/tools/enviarCorreoSolicitudVacaciones.php`;
      const body={fecha,fechaInicio,fechaFin,dias,numeroEmpelado,nombre,correo}
      return this.http.post<any>( url, body );
    }

    // es para actualizat la columna estatus de la tabla solicitud de vacaciones a 2
    updateAutorizar(id){
      const url=`https://www.dikeninternational.com/angular_service/api/Vacaciones/updateAutorizado.php`;
      const body={id}
      return this.http.put<any>( url, body );
    }

    // es para obtener informacion adicional como el periodo, dias disponibles
    getInfoVacaciones(numero_empleado):any{
      const url=`https://www.dikeninternational.com/angular_service/api/Vacaciones/getInfoVacaciones.php?numero_empleado=${numero_empleado}`;
      return this.http.get(url);
    }
    // es para que rechaze la solicitud de vacaciones
    updateRechazar(id){
      const url=`https://www.dikeninternational.com/angular_service/api/Vacaciones/updateRechazado.php`;
      const body={id}
      return this.http.put<any>( url, body );
    }
    // es para mandar correo pero se usa solo una clase de php
    mensajeDinamico(destinatario,mensaje,subtitulo,titulo1){
      const url=`https://www.dikeninternational.com/angular_service/api/tools/mensajeDinamico.php`;
      const body={mensaje,destinatario,subtitulo,titulo1}
      return this.http.post<any>( url, body );
    }
    // es para ver las solicitudes que ya estan aprobadas por el jefe
    getSolicitudesRH():any{
      const url=`https://www.dikeninternational.com/angular_service/api/Vacaciones/getSolicitudesAceptadas.php`;
      return this.http.get(url);
    }

    // es para ver las asistencias del empleado con el rango de las fechas
    getAsistnciasPorFecha(id,fechaInicio,fechaFin):any{
      const url=`https://www.dikeninternational.com/angular_service/api/usuario/getChecadasFecha.php?id=${id}&fechainicio=${fechaInicio}&fechaFin=${fechaFin}`;
      return this.http.get<Asistencia>(url);
    }
    // y esto es para ver las asistencias de colaborador del empleado
    getAsistenciaColaborado(id,fechaInicio,fechaFin):any{
      const url=`https://www.dikeninternational.com/angular_service/api/usuario/getRelojChecadorColaborador.php?id=${id}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;
      return this.http.get<Asistencia>(url);
    }


    //es para actualizar la tabla en "justificado" en asistencia
    updateJustificado(id,observaciones){
      const url=`https://www.dikeninternational.com/angular_service/api/usuario/updateJustificar.php`;
      const body={id,observaciones}
      return this.http.put<any>( url, body );
    }

    updatenoJustificado(id){
      const url=`https://www.dikeninternational.com/angular_service/api/usuario/updateNoJustificar.php`;
      const body={id}
      return this.http.put<any>( url, body );
    }

    getAsistenciaPerfecta(fechaInicio,fechaFin,fechaInicio2,fechaFin2):any{
      const url=`https://www.dikeninternational.com/angular_service/api/usuario/asistenciaPerfecta.php?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&fechaInicio2=${fechaInicio2}&fechaFin2=${fechaFin2}`;
      return this.http.get<any>(url);
    }

























}
