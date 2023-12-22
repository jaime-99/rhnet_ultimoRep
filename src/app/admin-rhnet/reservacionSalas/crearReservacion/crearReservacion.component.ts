import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RhnetService } from '../../rhnet.service';
import * as html2pdf from 'html2pdf.js';


@Component({
  selector: 'app-crear-reservacion',
  templateUrl: './crearReservacion.component.html',
  styleUrls: ['./crearReservacion.component.scss'],
})
export class CrearReservacionComponent implements OnInit {
  @ViewChild('miPlantilla') pdfContent: ElementRef;

  junta: FormGroup;
  UsuarioId: number;
  usuario: string;

  pantalla = false;
  fechaActual: string;



  constructor (private formBuilder: FormBuilder, private rhnet:RhnetService ) {}
  ngOnInit(): void {


    let userauth=JSON.parse(localStorage.getItem('datalogin')!);
    this.UsuarioId = userauth.UsuarioId
    this.usuario = userauth.Nombre
    // console.log(userauth)

    this.initializeForm();
  }


  private initializeForm(): void {
    // Usa el FormBuilder para construir tu FormGroup con validadores si es necesario
    this.junta = this.formBuilder.group({
      // Campos del formulario y validadores
      id_usuario: [this.UsuarioId, Validators.required],
      motivo: ['', Validators.required,],
      descripcion: ['', Validators.required],
      fecha: [this.obtenerFechaActual(), Validators.required],
      hora1: [this.obtenerHoraActual(), Validators.required],
      hora2: [this.obtenerHoraActual(), Validators.required],
      sala: ['', Validators.required],
    });
  }

  onSubmit(){


    if(this.junta.valid){

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
    return `${hora}:${minutos}`;
  }


}
