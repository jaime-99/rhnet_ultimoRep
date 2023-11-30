import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RhnetService } from '../../rhnet.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';


import { universidades } from './universidades';
import { Carreras } from './universidades';
import { areas } from './universidades';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.scss'],
})
export class AltaComponent implements OnInit {
  aceptados: any;
  miFormulario: FormGroup;
  error= false;
  solicitante: string; // es el nombre del solicitante desde solbecarios
  idsol: number; // es el id de la tabla solbecarios
  usuario: number; // es el id de usuario de la tabla solbecarios de quien es el solicitante
  pantalla: boolean = false ; // esto es para que se active un div


  constructor (private rhnet:RhnetService,private fb:FormBuilder,private location:Location,
    private route: ActivatedRoute, private router: Router, public snackBar: MatSnackBar) {}

  listaUniversidades = universidades;
  listaCarreras = Carreras;
  listaAreas = areas;



  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      // Aquí puedes trabajar con los parámetros recibidos
      const id = params['id'];
      const solicitante = params['solicitante'];
      const usuario = params['usuario']
      this.solicitante = solicitante
      this.idsol = id
      console.log("este es el usuario de solbecarios",usuario)
      this.usuario= usuario
    });


    const valorInicialUniversidad = this.listaUniversidades[0].nombre;
    const valorInicialCarrera = this.listaCarreras[0].nombre;
    const valorInicialArea = this.listaAreas[0].nombre;


    this.miFormulario = this.fb.group({

      idsol: [this.idsol, Validators.required],
      nombre: ['', Validators.required],
      universidad: [valorInicialUniversidad, Validators.required],
      carrera: [valorInicialCarrera, Validators.required],
      fecha_ingreso: ['', Validators.required],
      area: [valorInicialArea, Validators.required],
      usuario: [this.usuario], // este lo traemos del usuario de solbecarios
      correo: [' ', [Validators.required, Validators.email]],
      solicitante: [this.solicitante, ],
      entero: [' '],
      tipoeval: [' '],
      activo: ['1'],
      eval_fecha1: [' '],
      ideval1: ['0'],
      eval_fecha2: [' '],
      ideval2: ['0'],
      eval_fecha3: [' '],
      ideval3: ['0'],
      eval_fecha4: [' '],
      ideval4: ['0'],
      eval_fecha5: [' ' ],
      ideval5: ['0'],
      evaluacion: ['1'],

    });

    this.miFormulario.get('fecha_ingreso').valueChanges.subscribe((fechaIngreso) => {
      // Verificar si la fecha_ingreso es válida y calcular las fechas
      if (fechaIngreso) {
        this.calcularFechasEvaluacion(fechaIngreso);
      }
    });
  }



  submitForm(){
    console.log(this.miFormulario.value)
    if (
      this.miFormulario.get('nombre').valid &&
      this.miFormulario.get('idsol').valid && this.miFormulario.get('universidad').valid && this.miFormulario.get('carrera').valid
      && this.miFormulario.get('fecha_ingreso').valid && this.miFormulario.get('area').valid && this.miFormulario.get('correo').valid
      // Agrega los campos adicionales que deseas validar
    )
    {
      const {idsol,nombre,universidad,carrera,fecha_ingreso,area,usuario,correo,
      solicitante,entero,tipoeval,activo,eval_fecha1,ideval1,eval_fecha2,ideval2,
    eval_fecha3,ideval3,eval_fecha4,ideval4,eval_fecha5,ideval5,evaluacion} =  this.miFormulario.value
      // console.log(this.miFormulario.value);

      this.rhnet.insertarBecarioCompleto(idsol,nombre,universidad,carrera,fecha_ingreso,area,usuario,correo,
        solicitante,entero,tipoeval,activo,eval_fecha1,ideval1,eval_fecha2,ideval2,eval_fecha3,ideval3,eval_fecha4,
        ideval4,eval_fecha5,ideval5,evaluacion).subscribe((res)=>{
          console.log(res)

        })
        this.snackBar.open('Se ha dado de alta el becario', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });

        this.pantalla = true;


    } else {
      // Maneja el caso cuando al menos un campo no es válido
      this.snackBar.open('Faltan Campos de llenar', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });

    }

  }


  calcularFechasEvaluacion(fechaIngreso: Date): void {
    // Reiniciar las fechas de evaluación
    this.miFormulario.get('eval_fecha1').setValue('');
    this.miFormulario.get('eval_fecha2').setValue('');
    this.miFormulario.get('eval_fecha3').setValue('');
    this.miFormulario.get('eval_fecha4').setValue('');
    this.miFormulario.get('eval_fecha5').setValue('');

    // Calcular y asignar las nuevas fechas
    for (let i = 1; i <= 5; i++) {
      const nuevaFecha = new Date(fechaIngreso);
      nuevaFecha.setDate(nuevaFecha.getDate() + i * 15);
      this.miFormulario.get(`eval_fecha${i}`).setValue(nuevaFecha.toISOString().substring(0, 10));
    }
  }


  back(){
    this.location.back();
  }

  cambiarEstatus(){
    //cambiar el estatus a 6 para que se finalize la sesion , significa que el becario ya esta de alta

    const data = {

    }
    this.rhnet.updateEstatus(6,this.idsol).subscribe(()=>{

    })
  }
}



