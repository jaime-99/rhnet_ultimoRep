import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RhnetService } from '../../rhnet.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';


import { universidades } from './universidades';
import { Carreras } from './universidades';
import { areas } from './universidades';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.scss'],
})
export class AltaComponent implements OnInit {
  aceptados: any;
  miFormulario: FormGroup;
  error= false;
  solicitante: any;
  idsol: any;


  constructor (private rhnet:RhnetService,private fb:FormBuilder,private location:Location,
    private route: ActivatedRoute, private router: Router) {}

  listaUniversidades = universidades;
  listaCarreras = Carreras;
  listaAreas = areas;



  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      // Aquí puedes trabajar con los parámetros recibidos
      const id = params['id'];
      const solicitante = params['solicitante'];
      this.solicitante = solicitante
      this.idsol = id
    });


    const valorInicialUniversidad = this.listaUniversidades[0].id;
    const valorInicialCarrera = this.listaCarreras[0].id;
    const valorInicialArea = this.listaAreas[0].id;


    this.miFormulario = this.fb.group({

      nombre: ['', Validators.required],
      idsol: [this.idsol, Validators.required],
      universidad: [valorInicialUniversidad, Validators.required],
      carrera: [valorInicialCarrera, Validators.required],
      fecha_ingreso: ['', Validators.required],
      area: [valorInicialArea, Validators.required],
      usuario: [' '],
      correo: [' ', [Validators.required, Validators.email]],
      solicitante: [this.solicitante, [Validators.required, Validators.email]],
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
    if (
      this.miFormulario.get('nombre').valid &&
      this.miFormulario.get('idsol').valid && this.miFormulario.get('universidad').valid && this.miFormulario.get('carrera').valid
      && this.miFormulario.get('fecha_ingreso').valid && this.miFormulario.get('area').valid && this.miFormulario.get('correo').valid
      // Agrega los campos adicionales que deseas validar
    )
    {
      const {idsol,nombre,universidad,carrera,fecha_ingreso,area,correo} =  this.miFormulario.value
      console.log(this.miFormulario.value);

    } else {
      // Maneja el caso cuando al menos un campo no es válido
    }

    // if(this.miFormulario.valid){
    //   console.log(this.miFormulario.value)

    //   const {nombre,universidad,carrera,fecha_ingreso,area,correo} = this.miFormulario.getRawValue()

    // }else{

    //   this.error=true
    //   console.log("faltan datos")


    // }
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
}



