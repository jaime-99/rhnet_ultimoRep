import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { aC } from '@fullcalendar/core/internal-common';
import { clearScreenDown } from 'readline';
import { RhnetService } from 'src/app/admin-rhnet/rhnet.service';

@Component({
  selector: 'app-dialogo-vecario',
  templateUrl: './dialogo-vecario.component.html',
  styleUrls: ['./dialogo-vecario.component.scss'],
})


export class DialogoVecarioComponent implements OnInit {

  formulario:FormGroup
  areas: any;
  aprobadores: any;
  numero_empleado:number

  constructor( private rhnetService:RhnetService ) {}

  ngOnInit(): void {
    this.getAreas();


    this.formulario = new FormGroup({
      usuario: new FormControl(222, [Validators.required]),
      area: new FormControl('', [Validators.required]),
      actividades: new FormControl('', [Validators.required]),
      metas: new FormControl('', [Validators.required]),
      proceso: new FormControl('sss', [Validators.required]),
      aprobador: new FormControl('', [Validators.required]),
      profesion: new FormControl('', [Validators.required]),
      fecha: new FormControl('2023/10/20', [Validators.required]),

    });

  }



  getAreas(){
    this.rhnetService.getArea().subscribe((res)=>{
      this.areas = res.map((area) => area.AREA);
      this.getAprobadores()

    })
  }

  getAprobadores(){
    this.rhnetService.getAprobadores().subscribe((res)=>{
      this.aprobadores = res

    })

  }


  guardarDatos(value:object){

    const {usuario,area,actividades,meta,proceso,profesion,aprobador} = this.formulario.value

    if(this.formulario.valid){

      this.rhnetService.insertBecario(usuario,area,actividades,meta,proceso,aprobador,profesion).subscribe((res)=>{
        console.log(res)

      })



    }else{


    }


  }


  fecha(){



  }











 }
