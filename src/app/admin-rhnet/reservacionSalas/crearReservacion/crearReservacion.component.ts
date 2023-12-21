import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RhnetService } from '../../rhnet.service';

@Component({
  selector: 'app-crear-reservacion',
  templateUrl: './crearReservacion.component.html',
  styleUrls: ['./crearReservacion.component.scss'],
})
export class CrearReservacionComponent implements OnInit {
  junta: FormGroup;
  UsuarioId: number;
  usuario: string;

  pantalla = false;



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
      fecha: ['', Validators.required],
      hora1: ['', Validators.required],
      hora2: ['', Validators.required],
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





}
