// import { Usuario } from "../support/interfaces/iTiket";

export class User {
  id: number;
  username: string;
  password: string;
  profile: UserProfile;
  work: UserWork;
  contacts: UserContacts;
  social: UserSocial;
  settings: UserSettings;
  usuario1:Usuario1;
  usuario:Usuario;
}


export class UserProfile {
  name: string;
  surname: string;
  birthday: Object;
  gender: string;
  image: string;
}

export class UserWork {
  company: string;
  position: string;
  salary: number;
}

export class UserContacts{
  email: string;
  phone: string;
  address: string;
}

export class UserSocial {
  facebook: string;
  twitter: string;
  google: string;
}

export class UserSettings{
  isActive: boolean;
  isDeleted: boolean;
  registrationDate: Date;
  joinedDate: Date;
}


// todo jaime
export class Usuario1{
  nombre:string;
  edad:number;
  apellido:string;
}



export interface Usuario {
  name: string;
  number: string;
  email:string;
  apellidos:string;
  direccion:string;
  nombreUsuario:string;
  contraseña:string;
  IdDeUsuario:number;
  imagen:string;
  numEmpleado:number;
  tokenId:number;
}

//todo ejemplo , borrar
export interface Empleados {
  Nombre:string;
  NombreCompleto:string;
  Numero_Empleado:number;
  Nomina:string;
  Empresa:String;
  id:number;

}

