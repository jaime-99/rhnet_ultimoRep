import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RhnetService } from '../../rhnet.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Asistencia } from '../../interfaces/personRHnet.component';
@Component({
  selector: 'app-reloj-checador',
  templateUrl: './reloj-checador.component.html',
  styleUrls: ['./reloj-checador.component.scss']
})
export class RelojChecadorComponent implements OnInit  {
  checadas: any[] = [];
  numUsuario: any;
  checadaHoy: any[];
  filtroTexto: any;
  checadasEncontradas: any[];
  texto: any;

  FechaIF: FormGroup;
  FechaColaborador: FormGroup;
  fechaFormato: string;
  asistenciasRango:Asistencia
  AsistenciaColaborador:Asistencia;





  constructor(private rhService:RhnetService, private fb:FormBuilder) {

   }


   ngOnInit(): void {

    const fechaHoy = new Date(); // Obtener la fecha actual en JavaScript
    const fechaHoyFormatted = fechaHoy.toISOString().slice(0, 10); //
    this.fechaFormato = fechaHoyFormatted


    let usuarioAuth=JSON.parse(localStorage.getItem('datalogin')!);
    this.numUsuario = usuarioAuth.data.Numero_Empleado

    // this.filtroTexto = '2023-11-06';
    // console.log(usuarioAuth)
    // this.obtenerChecadas();


    //formulairo reactivo
    this.FechaIF = this.fb.group({
      id: [this.numUsuario],
      fechaInicio: this.fechaFormato,
      fechaFin: [this.fechaFormato,  Validators.compose([Validators.required])],

      filtroFecha: []
    });
    this.busquedaPorRangos(this.FechaIF.value);


    this.FechaColaborador = this.fb.group({
      id: [this.numUsuario],
      fechaInicio: ['',  Validators.compose([Validators.required])],
      fechaFin: ['',  Validators.compose([Validators.required])],

      filtroFecha: []
    });

    // this.busquedaPorRangos(this.FechaIF.value);
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

    this.fechaFormato = fechaHoyFormatted
    console.log(this.fechaFormato)

    this.checadaHoy = this.checadas.filter(checada => {
      return checada.Fecha === fechaHoyFormatted; // Supongo que la propiedad se llama "Fecha"

    });
    this.checadasEncontradas = this.checadaHoy
  }

  // buscarPorFecha(){
  //   if(this.filtroTexto){
  //     this.checadasEncontradas = this.checadas.filter((empleado) =>
  //     empleado.Fecha.toLowerCase().includes(this.filtroTexto.toLowerCase())
  //     );
  //     this.texto = this.filtroTexto

  //   } else{

  //     this.checadasEncontradas = this.checadas

  //   }
  // }


  buscarPorFecha2() {
    const fechaFiltro = this.FechaIF.get('filtroFecha').value;
    // Resto de tu lógica...

    if(fechaFiltro){
      this.checadasEncontradas = this.checadas.filter((empleado) =>
      empleado.Fecha.toLowerCase().includes(fechaFiltro.toLowerCase())
      );
      this.texto = fechaFiltro

    } else{

      this.checadasEncontradas = this.checadas
    }
  }


  busquedaPorRangos(values:Object){

    if(this.FechaIF.valid){
      const {id,fechaInicio,fechaFin} = this.FechaIF.value;

      this.rhService.getAsistnciasPorFecha(id,fechaInicio,fechaFin).subscribe((res)=>{
        // console.log(res)

        this.asistenciasRango = res

        this.busquedaColaboradores();
      })
    }else{
      //colocar si no coloca los rangos
    }
  }


  busquedaColaboradores(){

    const fechaInicio = this.FechaIF.get('fechaInicio').value;
    const fechaFin = this.FechaIF.get('fechaFin').value;
    const id = this.FechaIF.get('id').value;

    this.rhService.getAsistenciaColaborado(id,fechaInicio,fechaFin).subscribe((res)=>{
      this.AsistenciaColaborador= res

    })

  }


  openDialog(){
    // es para abrir el openDialog

  }

}
