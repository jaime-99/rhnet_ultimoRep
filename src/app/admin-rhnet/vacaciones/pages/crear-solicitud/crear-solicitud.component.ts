import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OpenDialogComponent } from './open-dialog/open-dialog.component';
import { RhnetService } from 'src/app/admin-rhnet/rhnet.service';
import { resolve6 } from 'dns/promises';

@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './crear-solicitud.component.html',
  styleUrls: ['./crear-solicitud.component.scss']
})
export class CrearSolicitudComponent implements OnInit {
  Empleado_id: any;
  Solicitudes: any;
  numEmpleado: any;
  usuario: any;

  constructor( public dialog: MatDialog, private rhService: RhnetService ) { }

  ngOnInit(): void {

    let usuarioAuth=JSON.parse(localStorage.getItem('datalogin')!);
    // console.log(usuarioAuth)
    this.usuario = usuarioAuth.data.Usuario
    this.numEmpleado = usuarioAuth.data.Numero_Empleado,



    this.obtenerDatosSolicitud();


  }











  openDialog(): void {
    const dialogRef = this.dialog.open(OpenDialogComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('el dialogo se ha cerrado');
      // const resultado = result;
      // console.log(resultado)



    });

}

  obtenerDatosSolicitud(){
    this.rhService.getSolicitudes(this.numEmpleado).subscribe((res)=>{
      this.Solicitudes= res
      // console.log(res)
    })
  }

  cancelarSolicitud(id){
    this.rhService.cancelarSolicitud(id).subscribe((res)=>{
      console.log(res)
      this.obtenerDatosSolicitud();
    })
  }


}
