export interface Empleado {
  id:                   number;
  NUMERO_EMPLEADO:      string;
  NOMBRE:               string;
  APELLIDO_PATERNO:     string;
  APELLIDO_MATERNO:     null | string;
  STATUS:               Status;
  RFC:                  string;
  IMSS:                 string;
  FECHA_ALTA:           Date;
  FECHA_BAJA:           Date;
  EMPRESA:              Empresa;
  ESTADO_CIVIL:         EstadoCivil;
  SEXO:                 Sexo;
  FECHA_NACIMIENTO:     Date | null;
  CURP:                 string;
  NIVEL_ESTUDIOS:       number;
  PUESTO:               string;
  AREA:                 Area;
  EMAIL:                null | string;
  CALLE:                null | string;
  COLONIA:              null | string;
  CIUDAD:               null | string;
  ENTIDAD_FEDERATIVA:   string;
  CODIGO_POSTAL:        null | string;
  fecha_actualizacion:  Date;
  NUMERO_EMPLEADO_JEFE: null | string;
  IdTipoNomina:         string;
  NIVEL:                null | string;
  CLAVE:                null | string;
  nombre_completo:      null | string;
}

export enum Area {
  Abastecimiento = "ABASTECIMIENTO",
  Administracion = "ADMINISTRACION",
  AlmacenGeneral = "ALMACEN GENERAL",
  AseguramientoYSqf = "ASEGURAMIENTO Y SQF",
  Auditoria = "AUDITORIA",
  Calidad = "CALIDAD",
  Contraloria = "CONTRALORIA",
  ControlDeCalidad = "CONTROL DE CALIDAD",
  DesarrolloHumano = "DESARROLLO HUMANO",
  DireccionCorporativa = "DIRECCION CORPORATIVA",
  DireccionGeneral = "DIRECCION GENERAL",
  Ehs = "EHS",
  GerenciaDeContraloria = "GERENCIA DE CONTRALORIA",
  InteligenciaDeNegocios = "INTELIGENCIA DE NEGOCIOS",
  InvestigacionYDesarrollo = "INVESTIGACION Y DESARROLLO",
  Logistica = "LOGISTICA",
  Mercadotecnia = "MERCADOTECNIA",
  PiSahe = "PI SAHE",
  PiUman = "PI UMAN",
  Planeacion = "PLANEACION",
  Produccion = "PRODUCCION",
  ProyectosCcs = "PROYECTOS CCS",
  ProyectosYMantenimiento = "PROYECTOS Y MANTENIMIENTO",
  RecursosHumanos = "RECURSOS HUMANOS",
  ServicioTecnico = "SERVICIO TECNICO",
  Sistemas = "SISTEMAS",
  TraficoYEmpaque = "TRAFICO Y EMPAQUE",
  VentasAlimentos = "VENTAS ALIMENTOS",
  VentasCadenas = "VENTAS CADENAS",
  VentasExportacion = "VENTAS EXPORTACION",
  VentasIndustrial = "VENTAS INDUSTRIAL",
  VentasMonterrey = "VENTAS MONTERREY",
}

export enum Empresa {
  DikenDeMexico = "DIKEN DE MEXICO",
  Institucional = "INSTITUCIONAL",
  International = "INTERNATIONAL",
}

export enum EstadoCivil {
  C = "C",
  D = "D",
  S = "S",
  U = "U",
  V = "V",
}

export enum Sexo {
  F = "F",
  M = "M",
}

export enum Status {
  B = "B",
}
