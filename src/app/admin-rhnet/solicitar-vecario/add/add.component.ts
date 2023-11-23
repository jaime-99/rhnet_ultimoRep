import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogoVecarioComponent } from '../openDialogVecario/dialogo-vecario/dialogo-vecario.component';
import { RhnetService } from '../../rhnet.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  numEmpleado: any;
  misSolicitudes: any;
  numUsuario: any;
  porAprobar: any;
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
    this.getnombreCompleto();
    // console.log(res)
  })
}
//pendiente
getnombreCompleto(){
  const id:any = this.porAprobar.map(aprobar => aprobar.usuario);
  // console.log(id)

  this.rhnetService.getAllInfoEmpleados(id).subscribe((res)=>{
    const ejemplo  = res
    const nombre = ejemplo.nombre
    // console.log("el id de usuario es "+nombre)
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


irDetalles(){
  // es para ir a detalles de cada solicitud por aprobar y colocar los comentarios
  this.router.navigate(['rhnet/Solicitar_Becario/detalle-solicitud']);

}






}
