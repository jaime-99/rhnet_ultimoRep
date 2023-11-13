import { Component, OnInit } from '@angular/core';
import { RhnetService } from '../../rhnet.service';

@Component({
  selector: 'app-reloj-checador',
  templateUrl: './reloj-checador.component.html',
  styleUrls: ['./reloj-checador.component.scss']
})
export class RelojChecadorComponent implements OnInit {
  checadas: any[] = [];
  numUsuario: any;
  checadaHoy: any[];
  filtroTexto: any;
  checadasEncontradas: any[];
  texto: any;

  constructor(private rhService:RhnetService) {

   }

  ngOnInit(): void {
    let usuarioAuth=JSON.parse(localStorage.getItem('datalogin')!);
    this.numUsuario = usuarioAuth.data.Numero_Empleado

    this.filtroTexto = '2023-11-06';


    // console.log(usuarioAuth)
    this.obtenerChecadas();


  }

  //obtener las checadas del reloj checador

  obtenerChecadas(){
    this.rhService.getRelojChecador(this.numUsuario).subscribe((res)=>{
      this.checadas = res
      this.obtenerChecadaDeHoy();
    })
  }

  //obtener checada de hoy solamente
  obtenerChecadaDeHoy(){

    const fechaHoy = new Date(); // Obtener la fecha actual en JavaScript
    const fechaHoyFormatted = fechaHoy.toISOString().slice(0, 10); //

    this.checadaHoy = this.checadas.filter(checada => {
      return checada.Fecha === fechaHoyFormatted; // Supongo que la propiedad se llama "Fecha"

    });
    this.checadasEncontradas = this.checadaHoy
  }

  buscarPorFecha(){
    if(this.filtroTexto){
      this.checadasEncontradas = this.checadas.filter((empleado) =>
      empleado.Fecha.toLowerCase().includes(this.filtroTexto.toLowerCase())
      );
      this.texto = this.filtroTexto

    } else{

      this.checadasEncontradas = this.checadas

    }

  }

}
