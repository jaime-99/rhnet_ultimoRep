import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogoVecarioComponent } from '../openDialogVecario/dialogo-vecario/dialogo-vecario.component';
import { RhnetService } from '../../rhnet.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  numEmpleado: any;
  misSolicitudes: any;

  constructor(public dialog: MatDialog, private rhnetService:RhnetService){}

  ngOnInit(): void {

    let usuarioAuth=JSON.parse(localStorage.getItem('datalogin')!);
    // console.log(usuarioAuth)
    this.numEmpleado = usuarioAuth.data.Numero_Empleado
    this.getMisSolicitudes();

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogoVecarioComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
    });
}

getMisSolicitudes(){
  this.rhnetService.getMisSolicitudesBecarios('471').subscribe((res)=>{
    console.log("mis solicitudes becarios",res)
    this.misSolicitudes = res
    // this.getSolicitar();

  })
}

getSolicitar(){

  this.rhnetService.getSolicitudesAprobar('3').subscribe((res)=>{

  })



}





}
