import { RhMenu } from "./rhmenu-model"
export const RHmenuItems = [






  // new RhMenu (30, 'MI PERFIL', '/rhnet/PERFIL', null, 'account_circle', null, false, 0),
  new RhMenu (31, 'INCIDENCIAS', null, null, 'alarm_add', null, true, 0),
  new RhMenu (40, 'Pase Digital', '/rhnet/PASE', null, 'alarm_add', null, false, 31),
  new RhMenu (32, 'Pases Autorizados', '/rhnet/PASES_AUTORIZADOS', null, 'alarm_on', null, false, 31),
  new RhMenu (32, 'Relor Checador', "/rhnet/RELOJ_CHECADOR", null, 'watch_later', null, false,31),
  new RhMenu (34, 'Reporte De Incidencias', "/rhnet/REPORTE_INCIDENCIAS", null, 'assignment_late', null, false, 31),
  new RhMenu (35, 'Asistencia Perfecta', "/rhnet/ASISTENCIA PERFECTA", null, 'check_circle', null, false, 31),


  new RhMenu (36, 'VACACIONES', null, null, 'airplanemode_active', null, true, 0),
  new RhMenu (38,'Crear Solicitud', "/rhnet/CREAR_SOLICITUD", null, 'note_add', null, false, 36),
  new RhMenu (39, 'Lista De Solicitudes', "/rhnet/SOLICITUDES_VACACIONES", null, 'notes', null, false, 36),


  new RhMenu (50, 'Solicitar Becario', "/rhnet/Solicitar_Becario", null, 'notes', null, false, 0),

  new RhMenu (52, 'Becarios', null, null, 'school', null, true, 0),
  new RhMenu (53, 'Aprobar Becarios', '/rhnet/Aprobar_Becario', null, 'check_box', null, false, 52),

  new RhMenu (54, 'Alta Becario', '/rhnet/Alta_Becario', null, 'perm_identity', null, false, 52),

  // new RhMenu (35, 'VACACIONES 2', '', null, 'receipt', null, false, 33),






]
