import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  fecha: string;
  numUsuario: any;
  idJefe: any;
  misDatos: any;

  constructor( private cdRef: ChangeDetectorRef, private rhnetService:RhnetService,
    public dialogRef: MatDialogRef<DialogoVecarioComponent> , @Inject(MAT_DIALOG_DATA) public data) {

    }

  ngOnInit(): void {
    this.obtenerIdJefe();
    this.getAreas();
    let usuarioAuth=JSON.parse(localStorage.getItem('datalogin')!);
    this.numUsuario = usuarioAuth.data.Numero_Empleado,

    this.formulario = new FormGroup({
      usuario: new FormControl(this.data.numUsuario, [Validators.required]),
      area: new FormControl('', [Validators.required]),
      actividades: new FormControl('', [Validators.required]),
      metas: new FormControl('', [Validators.required]),
      proceso: new FormControl('', [Validators.required]),
      aprobador: new FormControl(this.idJefe, [Validators.required]),
      profesion: new FormControl('', [Validators.required]),
      fecha: new FormControl('2023/10/20', [Validators.required]),

    });

  }



  getAreas(){
    this.rhnetService.getArea().subscribe((res)=>{
      this.areas = res.map((area) => area.AREA);
      this.getAprobadores()
      this.obtenerFechaActualEnFormato()

    })
  }

  getAprobadores(){
    this.rhnetService.getAprobadores().subscribe((res)=>{
      this.aprobadores = res

    })

  }


  guardarDatos(value:object){

    const {usuario,area,actividades,metas,proceso,profesion,aprobador,fecha} = this.formulario.value


    if(this.formulario.valid){
      this.rhnetService.insertBecario(usuario,area,actividades,metas,proceso,aprobador,profesion,fecha).subscribe((res)=>{
        // console.log(res)
        this.dialogRef.close();

      })
    }else{

      return;
    }
  }

  Salir(): void {
    this.dialogRef.close();
  }

   obtenerFechaActualEnFormato() {
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = ('0' + (fechaActual.getMonth() + 1)).slice(-2); // Agrega un cero al principio si es necesario
    const dia = ('0' + fechaActual.getDate()).slice(-2); // Agrega un cero al principio si es necesario

    const fechaFormateada = `${año}-${mes}-${dia}`;

    this.fecha= fechaFormateada

    this.formulario.get('fecha').setValue(this.fecha);

  }


  obtenerIdJefe(){
    this.rhnetService.getAllInfoEmpleados('1514').subscribe((res)=>{
      this.idJefe = res.NUMERO_EMPLEADO_JEFE
      console.log("id del jefe",this.idJefe)
      this.misDatos = res

      this.formulario.get('aprobador').setValue(this.idJefe);
    })
  }











 }
