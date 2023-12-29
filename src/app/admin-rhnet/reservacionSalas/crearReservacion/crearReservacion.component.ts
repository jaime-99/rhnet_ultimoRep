import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RhnetService } from '../../rhnet.service';
import * as html2pdf from 'html2pdf.js';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-crear-reservacion',
  templateUrl: './crearReservacion.component.html',
  styleUrls: ['./crearReservacion.component.scss'],
})
export class CrearReservacionComponent implements OnInit {



  @ViewChild('miPlantilla') pdfContent: ElementRef;
  @ViewChild('miCheckbox', { static: false }) miCheckbox: ElementRef;


  junta: FormGroup;
  UsuarioId: number;
  usuario: string;

  pantalla = false;
  fechaActual: string;
  currentDate: string;
  reservaciones:any[]
  fechas: any[];
  hora1: any;
  hora2: any;
  horaActual: string;



  constructor (private formBuilder: FormBuilder, private rhnet:RhnetService, public snackBar: MatSnackBar ) {
    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0];
  }
  ngOnInit(): void {


    let userauth=JSON.parse(localStorage.getItem('datalogin')!);
    this.UsuarioId = userauth.UsuarioId
    this.usuario = userauth.Nombre
    // console.log(userauth)
    this.getJuntas()
    this.initializeForm();
    // this.obtenerValorCheckbox()
  }


  private initializeForm(): void {
    // Usa el FormBuilder para construir tu FormGroup con validadores si es necesario
    this.junta = this.formBuilder.group({
      // Campos del formulario y validadores
      id_usuario: [this.UsuarioId, Validators.required],
      motivo: ['', Validators.required,],
      descripcion: ['', Validators.required],
      fecha: [this.obtenerFechaActual(), Validators.required],
      hora1: ['', [Validators.required, this.validarHoras.bind(this)]],
      hora2: ['', [Validators.required, this.validarHoras.bind(this)]],


      sala: ['', Validators.required],
    });
  }

  onSubmit(){


    if(this.junta.valid){
      const valorCheckbox = this.miCheckbox.nativeElement.checked;
      if(!valorCheckbox){
        this.snackBar.open("debes aceptar las condiciones", '×', { panelClass: "error", verticalPosition: 'top', duration: 3000 })
        return;
      }

      const {id_usuario,motivo,descripcion,fecha,hora1,hora2,sala} = this.junta.value
      this.rhnet.addJunta(id_usuario,motivo,descripcion,fecha,hora1,hora2,sala).subscribe((res)=>{
        // console.log(res)
        this.pantalla = true;
      })
    }
  }

  descargarPDF() {

    const sala =  this.junta.get('sala').value;
    const motivo = this.junta.get('motivo').value;
    const fecha = this.junta.get('fecha').value;
    const hora1= this.junta.get('hora1').value;
    const hora2= this.junta.get('hora2').value;
    const descripcion= this.junta.get('descripcion').value;


    const contenidoHTML = `
    <html>
      <head>
        <!-- Puedes agregar estilos y encabezados aquí -->
        <style>
        </style>
      </head>
      <body>
        <!-- Contenido de tu documento HTML -->
        <p>Acuse de reservacion - sala de ${sala}</p>
        <p>RH Net - Recursos Humanos - Sistemas </p>
        <a>http://www.rhnet.dikeninternational.com/</a>
        <div class="container text-center">
          <div class="row">
              <div class="col alert alert-secondary">
              Solicita
              </div>
              <div class="col alert alert-secondary">
              Motivo
              </div>
          </div>
          <div class="row align-items-start ">
          <div class="col">
          <p>${this.usuario}<p></p>
          </div>
          <div class="col">
          <p>${motivo}</p>
          </div>
          </div>
          <div class="row ">
          <div class="col-6 alert alert-secondary">
          Dia
          </div>
          <div class="col-6 alert alert-secondary">
          Horario
          </div>
          </div>
          <div class="row align-items-start">
          <div class="col">
          <p> ${fecha} </p>
          </div>
          <div class="col">
          <p> ${hora1} - ${hora2}</p>
          </div>
          </div>
          <div class="row">
          <div class="col-12 alert alert-danger">
          Observaciones
          </div>
          </div>
          <div class="row align-items-start">
          <div class="col-12">
          <p>${descripcion}</p>
          </div>
          </div>
          <div class="row">
          <div class="col-12 alert alert-warning">
          <h3>Reglramento en el uso de la sala de ${sala}</h3>
          </div>
          </div>
          <div className="row">
          <div className="col">

          <ul class="list-unstyled text-start">
          <li>Respetar el horario apartado</li>
          <li>Apagar las luces al salir</li>
          <li>Apagar todos los equipos que se utilizaron</li>
          <li>Si se movió inmobiliario regresarlo a su lugar original</li>
          <li>Colocar la basura en el cesto</li>
          <li>Reportar cualquier percance que se haya suscitado</li>
          </ul>

          </div>
          </div>

        </div>

      </body>
    </html>
  `;

  // Configura las opciones de html2pdf
  const opciones = {
    margin: 10,
    filename: 'documento.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().from(contenidoHTML).set(opciones).save();

  }

  obtenerFechaActual(): string {
    const fecha = new Date();
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const dia = fecha.getDate().toString().padStart(2, '0');
    return `${fecha.getFullYear()}-${mes}-${dia}`;
  }

  obtenerHoraActual(): string {
    const fecha = new Date();
    const hora = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    this.horaActual = hora + ':'+ minutos
    console.log(this.horaActual)
    return `${hora}:${minutos}`;
  }



  getJuntas(){

    this.rhnet.getJuntas().subscribe((res)=>{
      this.reservaciones = res
      // console.log(res)

      this.fechas = res.map((item: any) => item.fecha);
      this.hora1 = res.map((item:any) =>item.hora1);
      this.hora2 = res.map((item:any) =>item.hora2);

      // console.log(this.fechas) // año mes y dia
    })
  }

  date(){

    const fecha = this.junta.get('fecha').value;
    const hora1 = this.junta.get('hora1').value;
    const hora2 = this.junta.get('hora2').value;


    if(this.fechas.includes(fecha)){

      this.horas(hora1,hora2)
    }else{
      // console.log("esa fecha si se puede colocar")
      return;
    }
  }

  horas(hora1,hora2){

    const hora1Formato = this.convertirAFormato24h(hora1);
    const hora2Formato = this.convertirAFormato24h(hora2);

    if(this.hora1.includes(hora1Formato) || this.hora2.includes(hora2Formato)){

      this.snackBar.open("esa fecha y horas ya estan en uso", '×', { panelClass: "error", verticalPosition: 'top', duration: 3000 })

      this.junta.patchValue({
        hora1: '',
        hora2:''
      });


    }


  }

  convertirAFormato24h(hora12h: string): string {
    const fechaHora12h = new Date(`2000-01-01T${hora12h}`);
    const formato24h = fechaHora12h.toLocaleTimeString('en-US', { hour12: false });
    return formato24h;
  }


  obtenerValorCheckbox() {
    const valorCheckbox = this.miCheckbox.nativeElement.checked;
    if(!valorCheckbox){
      return
    }
  }

  validarHoras(control:AbstractControl) {
    const value = control.value;
    if (value) {
      const horaPartes = value.split(':');
      const minutos = parseInt(horaPartes[1]);

      if (minutos !== 0 && minutos !== 30) {
        return { invalidHora: true };
      }
    }

    return null;
  }
}
