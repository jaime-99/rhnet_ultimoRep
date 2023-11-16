
// person.model.ts

export interface PersonRh {
  id: number;
  nombreCompleto: string;
  numeroEmpleado: number;
  usuario:string;
  correo:string;
  password:string;
  numeroEmpleadoJefe:string;
  fechaAlta:string;
  empresa:string;
  puesto:string;

  // Agrega otras propiedades aquí
}

export interface Empleado {
  nombre:               string;
  NUMERO_EMPLEADO:      string;
  NUMERO_EMPLEADO_JEFE: string;
  FECHA_ALTA:           Date;
  id:                   number;
  EMAIL:                string;
  TuNombre:             string;
  EMPRESA:              string;
  PUESTO:               string;
  NombreDelJefe:        string;
  correoDelJefe:        string;
  AniosCumplidos:       number;
  nombre_imagen:string;
}



export interface Asistencia {
  TuNombre:         string;
  NombreDelJefe:    string;
  NUMERO_EMPLEADO:  string;
  FechaEntrada:     null;
  FechaSalida:      null;
  Fecha:            Date;
  EstatusAsitencia: string;
  Empresa:          string;
  MinutosTarde:     null;
}
