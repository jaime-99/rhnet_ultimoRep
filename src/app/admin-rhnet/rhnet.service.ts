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

    // es para ver la asistencia de los empleados
    getAsistenciaPerfecta(fechaInicio,fechaFin,fechaInicio2,fechaFin2):any{
      const url=`https://www.dikeninternational.com/angular_service/api/usuario/asistenciaPerfecta.php?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&fechaInicio2=${fechaInicio2}&fechaFin2=${fechaFin2}`;
      return this.http.get<any>(url);
    }




    //todo empieza servicios de becarios
    //ver las areas de becarios
    getArea():any{
      const url = 'https://www.dikeninternational.com/angular_service/api/Becario/getAreas.php'
      return this.http.get<any>(url);
    }

    getAprobadores():any{
      const url = 'https://www.dikeninternational.com/angular_service/api/Becario/getAprobadores.php'
      return this.http.get<any>(url);
    }

    // es para insertar una solicitud para Becario
    insertBecario(usuario,Area,Actividades,Metas,Procesos,Aprobador,profesion,Fecha){
      const url=`https://www.dikeninternational.com/angular_service/api/Becario/addBecario.php`;
      const body={usuario,Area,Actividades,Metas,Procesos,Aprobador,profesion,Fecha}
      return this.http.post<any>( url, body );
    }

    // Es para ver mis solicitudes de becarios

    getMisSolicitudesBecarios(num):any{
      const url =  `https://www.dikeninternational.com/angular_service/api/Becario/getMiBecariosSolicitud.php?num=${num}`
      return this.http.get<any>(url)
    }

    // es para poder ver aprobar las solicitudes de mis empleados
    getSolicitudesAprobar(id):any{
      const url =  `https://www.dikeninternational.com/angular_service/api/Becario/porAprobarJefe.php?id=${id}`
      return this.http.get<any>(url)
    }

    //son los detalles de la tabla de solbecarios
    getDetalleID(id):any{
      const url =  `https://www.dikeninternational.com/angular_service/api/Becario/getDetalles.php?id=${id}`
      return this.http.get<any>(url)
    }

    // es para colocar el comentario de parte del jefe y se cambia el estatus a 2
    addComentarioJefe(come,ide){
      const url=`https://www.dikeninternational.com/angular_service/api/Becario/addComentario.php`;
      const body={come,ide}
      return this.http.put<any>( url, body );
    }
      // se cambia el estatus a dos
    updateEstatus(est,ide){
      const url=`https://www.dikeninternational.com/angular_service/api/Becario/updateEstatus.php`;
      const body={est,ide}
      return this.http.put<any>( url, body );
    }

    // los que estan en estatus dos por aceptar de RH
    getPorAceptar():any{
      const url =  `https://www.dikeninternational.com/angular_service/api/Becario/getPorAceptarRH.php`;
      return this.http.get<any>(url)
    }
    //agregar comentario por parte de RH
    addComentarioRH(come,ide){
      const url=`https://www.dikeninternational.com/angular_service/api/Becario/addComentarioRH.php`;
      const body={come,ide}
      return this.http.put<any>( url, body );
    }
    // estan los aceptados por jefe y aceptados por RH, ya son los que se dan de alta
    getAceptados():any{
      const url =  `https://www.dikeninternational.com/angular_service/api/Becario/aceptados.php`;
      return this.http.get<any>(url)
    }

    // es para insertar el becario ya completo
    insertarBecarioCompleto(idsol,nombre,universidad,carrera,fec_ingreso,area,usuario,correo,
      solicitante,entero,tipoeval,activo,eval_fecha1,ideval1,eval_fecha2,ideval2,
    eval_fecha3,ideval3,eval_fecha4,ideval4,eval_fecha5,ideval5,evaluacion){
      const url=`https://www.dikeninternational.com/angular_service/api/Becario/addBecarioAceptado.php`;
      const body={idsol,nombre,universidad,carrera,fec_ingreso,area,usuario,correo,solicitante,entero,tipoeval,activo,eval_fecha1,
      ideval1,eval_fecha2,ideval2,eval_fecha3,ideval3,eval_fecha4,ideval4,eval_fecha5,ideval5,evaluacion}
      return this.http.post<any>( url, body );
    }


    // para obtener los becarios que tiene cada usuaro con su id
    getBecarios(id):any{
      const url =  `https://www.dikeninternational.com/angular_service/api/Becario/Evaluaciones.php?id=${id}`
      return this.http.get<any>(url)
    }

    getCompetencias():any{
      const url =  `https://www.dikeninternational.com/angular_service/api/Becario/Competencias.php`
      return this.http.get<any>(url)
    }

    // para obtener los becarios de un usuario por el id
    getBecariosPorId(id):any{
      const url =  `https://www.dikeninternational.com/angular_service/api/Becario/becariosPorId.php?id=${id}`
      return this.http.get<any>(url)
    }

    // es para insertar la evaluacion de los practicantes, las 5 evaluaciones
    insertarEvaluacion(id_becario:number,observacion:string,elementosSeleccionados:number[],valores:number[]){
      const url=`https://www.dikeninternational.com/angular_service/api/Becario/insertarEvaluacion.php`;
      const body={id_becario,observacion,elementosSeleccionados,valores}
      return this.http.post<any>( url, body );
    }

    //es el primero para actualizar fechas , se haran 5 iguales
    actualizarFechasEv(ideval1,fecha_de_eval1,idBecario){
      const url=`https://www.dikeninternational.com/angular_service/api/Becario/actualizarFechas.php`;
      const body={ideval1,fecha_de_eval1,idBecario}
      return this.http.put<any>( url, body );
    }

    // es para obtener los datos de la tabla d eevaluaciones
    getEvaluaciones(id):any{
      const url =  `https://www.dikeninternational.com/angular_service/api/Becario/getEvaluaciones.php?id=${id}`
      return this.http.get<any>(url)
    }
      //actualizar las fecha de evaluacion 2
      actualizarFechasEv2(ideval2,fecha_de_eval2,idBecario){
        const url=`https://www.dikeninternational.com/angular_service/api/Becario/actualizarFechas2.php`;
        const body={ideval2,fecha_de_eval2,idBecario}
        return this.http.put<any>( url, body );
      }
    actualizarFechasEv3(ideval3,fecha_de_eval3,idBecario){
      const url=`https://www.dikeninternational.com/angular_service/api/Becario/actualizarFechas3.php`;
      const body={ideval3,fecha_de_eval3,idBecario}
      return this.http.put<any>( url, body );
    }
    actualizarFechasEv4(ideval4,fecha_de_eval4,idBecario){
      const url=`https://www.dikeninternational.com/angular_service/api/Becario/actualizarFechas4.php`;
      const body={ideval4,fecha_de_eval4,idBecario}
      return this.http.put<any>( url, body );
    }
    actualizarFechasEv5(ideval5,fecha_de_eval5,idBecario){
      const url=`https://www.dikeninternational.com/angular_service/api/Becario/actualizarFechas5.php`;
      const body={ideval5,fecha_de_eval5,idBecario}
      return this.http.put<any>( url, body );
    }
    //todo* se termina las fechas

    // obtiene los becarios activos, los que estan en 1
    getBecariosActivos():any{
      const url = `https://www.dikeninternational.com/angular_service/api/Becario/getBecariosAct.php`
      return this.http.get<any>(url)
    }

    getObservaciones(id):any{ // obtiene las observaciones de cada evaluacion
      const url = `https://www.dikeninternational.com/angular_service/api/Becario/getObservacionesBec.php?id=${id}`
      return this.http.get<any>(url)
    }

    getChecks(id):any{ // obtiene los checks de la evaluacion
      const url = `https://www.dikeninternational.com/angular_service/api/Becario/getChecks.php?id=${id}`
      return this.http.get<any>(url)
    }

    //actualiza la evaluacion
    actualizarEv(id,numero){
      const url=`https://www.dikeninternational.com/angular_service/api/Becario/actualizarEvaluacion.php`;
      const body={id,numero}
      return this.http.put<any>( url, body );
    }

    //obtener tabla de evaluacion con su id de eval1 , o ideval2
    getEvaluacionId(id):any{ // obtiene los checks de la evaluacion
      const url = `https://www.dikeninternational.com/angular_service/api/Becario/getEvaluacionId.php?id=${id}`
      return this.http.get<any>(url)
    }




































}
