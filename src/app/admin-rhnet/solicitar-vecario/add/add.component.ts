import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogoVecarioComponent } from '../openDialogVecario/dialogo-vecario/dialogo-vecario.component';
import { RhnetService } from '../../rhnet.service';
import { Router } from '@angular/router';
import { ComentariosDialogComponent } from '../comentariosDialog/comentariosDialog.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  numEmpleado: any;
  misSolicitudes: any;
  numUsuario: any;
  porAprobar:[]=[];
  datosPersona: any;

  constructor(public dialog: MatDialog, private rhnetService:RhnetService, private router:Router){}

  ngOnInit(): void {

    let usuarioAuth=JSON.parse(localStorage.getItem('datalogin')!);
    this.datosCompletos();
    console.log(usuarioAuth)
    this.numEmpleado = usuarioAuth.data.Numero_Empleado,
    this.getMisSolicitudes();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogoVecarioComponent, {
      data: {numUsuario:this.numUsuario},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getMisSolicitudes();
      this.getMisSolicitudes();
    });
}

getMisSolicitudes(){// aqui se coloca el numero de usuario
  this.rhnetService.getMisSolicitudesBecarios('471').subscribe((res)=>{
    // console.log("mis solicitudes becarios",res)
    this.misSolicitudes = res
    this.getSolicitar();
  })
}

// para ver las solicitudes que tengo por aprobar
getSolicitar(){
// aqui se coloca el num de empleado
  this.rhnetService.getSolicitudesAprobar('277').subscribe((res)=>{
    this.porAprobar = res
    // console.log(res)
  })
}

datosCompletos(){
  this.rhnetService.getAllInfoEmpleados('1514').subscribe((res)=>{
    this.datosPersona = res
    const id = this.datosPersona.idUsuario
    this.numUsuario= id
    // console.log("el id de usuario es "+id)
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





}
