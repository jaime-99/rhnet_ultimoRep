import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogoVecarioComponent } from '../openDialogVecario/dialogo-vecario/dialogo-vecario.component';
import { RhnetService } from '../../rhnet.service';
import { Router } from '@angular/router';
import { ComentariosDialogComponent } from '../comentariosDialog/comentariosDialog.component';
import { VerMasComponent } from '../verMas/verMas.component';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  numEmpleado: any; //  numero de empelado
  misSolicitudes: any;
  numUsuario: any; // aqui es el numero de usuaroo
  porAprobar:[]=[];
  datosPersona: any;

  config: PerfectScrollbarConfigInterface = {
    suppressScrollY: true, // Desactiva la barra de desplazamiento vertical
    wheelSpeed: 2, // Configura la velocidad del scrollbar (color)
    wheelPropagation: true, //
  };

  constructor(public dialog: MatDialog, private rhnetService:RhnetService, private router:Router){}

  ngOnInit(): void {

    let usuarioAuth=JSON.parse(localStorage.getItem('datalogin')!);
    this.numEmpleado = usuarioAuth.data.Numero_Empleado,
    // console.log(usuarioAuth)
    this.datosCompletos();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogoVecarioComponent, {
      data: {numUsuario:this.numUsuario},

    });

    dialogRef.afterClosed().subscribe(result => {

      if(result ===undefined){
        return;

      }else{
      this.getMisSolicitudes(result);
      // console.log(result)
      }

    });
}

getMisSolicitudes(id){// aqui se coloca el numero de usuario || es el de ariel 471
  this.rhnetService.getMisSolicitudesBecarios(id).subscribe((res)=>{
    // console.log("mis solicitudes becarios",res)
    // console.log("mi usuario",this.numUsuario)
    this.misSolicitudes = res
    this.getSolicitar();
  })
}

// para ver las solicitudes que tengo por aprobar
getSolicitar(){
// aqui se coloca el num de empleado de martin 277
  this.rhnetService.getSolicitudesAprobar(this.numEmpleado).subscribe((res)=>{
    this.porAprobar = res
    // console.log(res)
  })
}

datosCompletos(){ // numero de empleado de ariel
  this.rhnetService.getAllInfoEmpleados(this.numEmpleado).subscribe((res)=>{
    this.datosPersona = res
    const id = this.datosPersona.idUsuario
    this.numUsuario= id
    // console.log("el id de usuario es "+id)
    this.getMisSolicitudes(id)
  })
}


irDetalles(id){
  // es para ir a detalles de cada solicitud por aprobar y colocar los comentarios

 this.router.navigate(['rhnet/Solicitar_Becario/detalle-solicitud'], {
    queryParams: { id: id }
  });
}


verComentariosDialog(uno,dos): void {
  const dialogRef = this.dialog.open(ComentariosDialogComponent, {
    data: {comentarios1:uno, comentarios2:dos},
  });

  dialogRef.afterClosed().subscribe(result => {
    // al cerrar
  });
}


verMas(actividades)
{

  const dialogRef = this.dialog.open(VerMasComponent, {
    data: {actividades:actividades},
  });

  dialogRef.afterClosed().subscribe(result => {

  });




}



}
