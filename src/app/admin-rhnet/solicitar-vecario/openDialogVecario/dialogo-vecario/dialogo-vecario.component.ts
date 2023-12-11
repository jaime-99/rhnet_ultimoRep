import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  email: any;
  numEmpleadoJefe: any;

  constructor( private cdRef: ChangeDetectorRef, private rhnetService:RhnetService,
    public dialogRef: MatDialogRef<DialogoVecarioComponent> , @Inject(MAT_DIALOG_DATA) public data, public snackBar: MatSnackBar) {

    }

  ngOnInit(): void {




    let usuarioAuth=JSON.parse(localStorage.getItem('datalogin')!);
    this.numUsuario = usuarioAuth.data.Numero_Empleado,

    // console.log(this.data.numUsuario)
    this.obtenerIdJefe();
    this.getAreas();

    this.formulario = new FormGroup({
      usuario: new FormControl(this.data.numUsuario, [Validators.required]),
      area: new FormControl('', [Validators.required]),
      actividades: new FormControl(this.generarListaInicial(), [Validators.required,this.validarActividades], ),
      metas: new FormControl('', [Validators.required]),
      proceso: new FormControl('', [Validators.required]),
      aprobador: new FormControl(this.idJefe, [Validators.required]), // todo cambiarlo al nombre
      profesion: new FormControl('', [Validators.required]),
      fecha: new FormControl('2023/10/20', [Validators.required]),

    });

  }

  generarListaInicial(): string {
    // Genera una lista inicial de 5 puntos, uno en cada línea.
    // return Array(5).fill('').map(() => '- ').join('\n');
    return Array(5).fill(0).map((_, index) => (index + 1).toString() + '. ').join('\n');
  }
  // esto es para que no se puedan borrar los numeros del textArea
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    // Evita que se borren los números
    const textarea = event.target as HTMLTextAreaElement;
    const caretPosition = textarea.selectionStart;
    const value = textarea.value;

    if (event.key === 'Backspace' && caretPosition > 0) {
      const charBeforeCaret = value.charAt(caretPosition - 1);

      if (charBeforeCaret === ' ') {
        event.preventDefault();
      }
    }
    // Evita que se sobrescriba el número con un espacio al presionar Enter
    if (event.key === 'Enter') {
      event.preventDefault();

    }

    }
    // validar que si se llenen los 5 puntos con minimo 5 letras
    validarActividades(control: FormControl): { [s: string]: boolean } | null {
      const actividades = control.value;
      const puntos = actividades.split('\n').map(linea => linea.trim());

      // Verifica que haya exactamente 5 líneas y que cada línea tenga al menos 5 letras
      if (puntos.some(linea =>(linea.length < 5))) {
        return { 'formatoInvalido': true };
      }

      return null;
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
    // console.log(this.formulario.value)

    const {usuario,area,actividades,metas,proceso,profesion,aprobador,fecha} = this.formulario.value


    if(this.formulario.valid){
      this.rhnetService.insertBecario(usuario,area,actividades,metas,proceso,aprobador,profesion,fecha).subscribe((res)=>{
        // console.log(res)
        this.dialogRef.close(this.data.numUsuario);
        this.enviarEmail();

        this.snackBar.open('se ha enviado la solicitud a tu jefe', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });


      })
    }else{

      this.snackBar.open('te falta llenar campos', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
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
    this.rhnetService.getAllInfoEmpleados(this.numUsuario).subscribe((res)=>{
      this.idJefe = res.NUMERO_EMPLEADO_JEFE
      console.log("id del jefe",this.idJefe)
      this.misDatos = res
      this.email = res.correoDelJefe
      this.numEmpleadoJefe = res.NUMERO_EMPLEADO_JEFE

      this.formulario.get('aprobador').setValue(this.idJefe);
    })
  }


  //esto enviara el correo al jefe para que pueda ver la solicitud
  enviarEmail(){

    const envio = {
      destinatario:this.email  ,
      mensaje:'tiene una solicitud pendiente de Becario' ,
      subtitulo: 'Becario',
      titulo1: 'solicitud Becario'
    }

    this.rhnetService.mensajeDinamico(envio.destinatario,envio.mensaje,envio.subtitulo,envio.titulo1).subscribe((res)=>{
      this.enviarNotificacion();

    })
  }


  enviarNotificacion(){

    const notifi = {
      usuario:this.numEmpleadoJefe,
      mensaje : 'Se le ha enviado un Becario para Autorizar',
      tipo: 'Becario'
    }


    this.rhnetService.insertarNotificacion(notifi.usuario,notifi.mensaje,notifi.tipo).subscribe(()=>{

    })

  }











 }
