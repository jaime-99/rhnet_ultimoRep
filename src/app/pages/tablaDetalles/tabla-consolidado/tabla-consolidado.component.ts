import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { pedidosConsolidadosModule } from '../../pedidos_consolidados/pedidos-consolidados/pedidos.component.module';
import { AppService } from 'src/app/app.service';
import {MatDialog} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';




@Component({
  selector: 'app-tabla-consolidado',
  templateUrl: './tabla-consolidado.component.html',
  styleUrls: ['./tabla-consolidado.component.scss']
})
export class TablaConsolidadoComponent implements OnInit {
  consolidadoDetalles: 1;




  constructor(  public dialog: MatDialog,public appService: AppService,public dialogRef: MatDialogRef<TablaConsolidadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {   }

  ngOnInit(): void {


    let userauth = JSON.parse(localStorage.getItem('datalogin')!)
    this.detallesConsolidado();

    this.detallesConsolidado();

  }



  detallesConsolidado(){

    this.appService.obtenerTablaJunta(1).subscribe((res)=>{

      console.log(res)
    })

}


openDialog() {
  const dialogRef = this.dialog.open(TablaConsolidadoComponent);

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}

cerrar(){
    this.dialogRef.close(false);
}


}

