import { Component, OnInit } from '@angular/core';
import { RhnetService } from '../rhnet.service';

@Component({
  selector: 'app-todo-los-pases',
  templateUrl: './todo-los-pases.component.html',
  styleUrls: ['./todo-los-pases.component.scss']
})
export class TodoLosPasesComponent implements OnInit {
  pases: any;
  filtroTexto: any;
  pasesEncontrados: any[] = [];

  alerta = false;
  texto: any;

  constructor(private  rhService:RhnetService) { }

  ngOnInit(): void {

    this.rhService.getTodosLosEmpleados().subscribe((res)=>{
      this.pases = res
      this.buscarPases();
    })


  }

  buscarPases(){


    if(this.filtroTexto){
    this.pasesEncontrados = this.pases.filter((empleado) =>
    empleado.NumeroEmpleado.toLowerCase().includes(this.filtroTexto.toLowerCase())
    );
    this.texto = this.filtroTexto


    if(this.pasesEncontrados.length ===0){
      this.alerta = true
    }else{
      this.alerta = false
    }

  } else{

    this.pasesEncontrados = this.pases

  }

}


}
