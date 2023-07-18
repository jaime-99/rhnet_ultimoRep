import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-pedidos-consolidados',
  templateUrl: './pedidos-consolidados.component.html',
  styleUrls: ['./pedidos-consolidados.component.scss']
})


export class PedidosConsolidadosComponent implements OnInit {

  numAdmin:number =0;
  constructor( public appService: AppService) { }

  ngOnInit(): void {


    let userauth = JSON.parse(localStorage.getItem('datalogin')!)
    console.log(userauth);


    // obtengo el id de solo los admin de ventaEmpelados
    this.appService.obtenerAdmin().subscribe((res)=>{

      console.log(res)
    })








  }









}
