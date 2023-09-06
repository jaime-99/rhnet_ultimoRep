import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { AppService } from 'src/app/app.service';
// import { Usuario } from 'src/app/auth/interfaces/iUsuario';
import { EmpleadoVentas } from 'src/app/app.models';
import { array } from '@amcharts/amcharts5';
import { id } from '@swimlane/ngx-charts';
import { ThisReceiver } from '@angular/compiler';
import { SupportService } from 'src/app/admin/support/service/support.service';
import { Usuario } from 'src/app/admin/users/user.model';
import { Settings,AppSettings } from 'src/app/app.settings';
import { Empleados } from 'src/app/admin/users/user.model';
@Component({
  selector: "app-venta-empleado",
  templateUrl: "./ventaEmpleado.component.html",
  styleUrls: ["./venta.component.scss"],
})
export class VentaEmpleadoComponent implements OnInit {
  ventaForm: FormGroup;
  detallesForm: FormGroup;
  grandTotal: number = 0;
  numVenta: number = 0;
  UsuarioId = "";
  Nombre = "";
  Mensaje = ""; // solamente es una variable para ver mensaje en consola.log()
  maxPalabras = 60;
  Producto = "";
  NumeroEmpleado = "";
  numeroDeVentaNuevo = 0;
  correoDestinatario = "";

  Desabilitado: boolean = false;
  noUsuario: string = "after";
  abrirFormulario: boolean = false;
  formAdicional: any;
  mostrarFormAdicional: boolean = true; // Inicialmente visible
  pasoConfirmacionHabilitado: boolean = false; // Inicialmente deshabilitado

  mostrarBox: boolean = true; // es para los que no tienen cuenta, se les desabilitara a los que si tienen
  public searchText: string;
  public usuarios = [];
  public settings: Settings;

  public empleadoSeleccionado: number;
  numeroDeEmpleado: number = 0;
  nombre1: string = "ejemplo";
  public empleados = [];
  Empresa: any;
  IdNomina: any;
  empresaEmpleado: any;
  nominaEmpleado: any;
  idEmpleado: any;
  verCuadroEmpleados: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public appService: AppService,
    public supportService: SupportService,
    public appSettings: AppSettings
  ) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.extraerValores();
    // this.getObtenerUsuarios();
    this.getObtenerEmpleadosSinCuenta();

    // this.mostrarPerfilNuevo();

    let userauth = JSON.parse(localStorage.getItem("datalogin")!);


    this.UsuarioId = userauth.UsuarioId; // con esto sacamos informacion del usuario
    this.Nombre = userauth.Nombre;
    this.NumeroEmpleado = userauth.data.Numero_Empleado;
    this.Empresa = userauth.data.Empresa
    // console.log(this.Empresa);
    this.IdNomina = userauth.data.IdTipoNomina
    // este es para ver mejor que hay//console.log(userauth);
    //this.UsuarioId = userauth.data.INUsuarioId;
    // //console.log(this.UsuarioId);
    // //console.log(this.NumeroEmpleado);

    console.log(userauth);

    this.correoDestinatario = userauth.data.Correo; // Obtén la dirección de correo electrónico del usuario
    //console.log(this.correoDestinatario);

    this.appService.Data.cartList.forEach((product) => {
      this.grandTotal += product.cartCount * product.newPrice;
      this.Producto = product.name;
    });

    this.ventaForm = this.formBuilder.group({
      RhUsuarioId: ["", Validators.required],
      Fecha: [this.getCurrentDate(), Validators.required],
      Total: [this.grandTotal, Validators.required],
      Numero_Empleado: ["" ,Validators.required],
      Nombre: ["", Validators.required],
      Empresa: ["", Validators.required],
      TipoNomina: ["", Validators.required],
      detalles: this.formBuilder.array([]),
    });

    this.formAdicional = this.formBuilder.group({
      numUsuario: ["", Validators.required],
      nombre: [this.grandTotal, Validators.required],
    });

    // this.fillDetalles(); // Llenar los detalles de venta automáticamente

    this.detallesForm = this.formBuilder.group({
      detalles: this.formBuilder.array([]),
    });

    // this.addDetalle();// Agregamos un detalle inicial al formulario

    //this.ventaForm.controls['RhUsuarioId'].setValue(this.UsuarioId)
    this.ventaForm.controls["RhUsuarioId"].setValue(this.Nombre); // para que se vea el nombre
  }

  //formulario adicional
  numUsu: FormControl = new FormControl("", [
    Validators.required,
    Validators.pattern("^[0-9]*$"), // Patrón que permite solo números
  ]);

  nombre: FormControl = new FormControl("", [
    Validators.required,
    Validators.pattern("^[a-zA-Z ]*$"), // Patrón que permite solo letras (mayúsculas y minúsculas) y espacios
  ]);

  EmpresaCapturar: FormControl = new FormControl("", [
    Validators.required,
    Validators.pattern("^[a-zA-Z ]*$"), // Patrón que permite solo letras (mayúsculas y minúsculas) y espacios
  ]);

  TipoNomina: FormControl = new FormControl("", [
    Validators.required,
    Validators.pattern("^[a-zA-Z ]*$"), // Patrón que permite solo letras (mayúsculas y minúsculas) y espacios
  ]);

  NumeroEmpleadoEmpleado: FormControl = new FormControl("", [
    Validators.required,
    Validators.pattern("^[0-9]*$"), // Patrón que permite solo letras (mayúsculas y minúsculas) y espacios
  ]);


  // se termina el formulario adicional

  extraerValores() {
    const numUsuarioValue = this.numUsu.value;
    const nombreValue = this.nombre.value;

    //console.log('Número de Usuario:', numUsuarioValue);
    //console.log('Nombre:', nombreValue);
  } // se acaba el dormulario adicional

  // fillDetalles() {
  //   const detallesFormArray = this.ventaForm.get('detalles') as FormArray;
  //   this.appService.Data.cartList.forEach(product => {
  //     const detalleFormGroup = this.formBuilder.group({
  //       ProductoId: [product.CodigoDiken, Validators.required],
  //       Precio: [product.newPrice, Validators.required],
  //       Cantidad: [product.cartCount, Validators.required],
  //       Importe: [product.cartCount * product.newPrice, Validators.required]
  //     });

  //     detallesFormArray.push(detalleFormGroup);
  //   });
  // }
  // fecha automatica
  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = this.formatNumber(currentDate.getMonth() + 1);
    const day = this.formatNumber(currentDate.getDate());
    return `${year}-${month}-${day}`;
  }

  formatNumber(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
  }
  // cierre de fecha automatica

  get detalles(): FormArray {
    return this.detallesForm.get("detalles") as FormArray;
  }

  // addDetalle() {
  //   const detalles = this.formBuilder.group({
  //     ProductoId: ['', Validators.required],
  //     Precio: ['', Validators.required],
  //     Cantidad: ['', Validators.required],
  //     Importe: ['', Validators.required]
  //   });

  //   this.detalles.push(detalles);
  // }

  removeDetalle(index: number) {
    this.detalles.removeAt(index);
  }

  nextStep(stepper: any) {
    if (this.ventaForm.valid) {
      stepper.next();
      // this.fillDetalles(); // Llenar los detalles de venta automáticamente
    }
  }

  clickDosBotones() {
    this.submitForm();
    this.mostrarFormAdicional = false;

    // this.clear();
  }

  submitForm() {
    // const clave = this.ventaForm.get('RhUsuarioId').value;

    this.Desabilitado = true;
    // esto es para agregar ahora si bien el numero de la venta
    let empleadoVentas = new EmpleadoVentas();

    let userauth = JSON.parse(localStorage.getItem("datalogin")!);

    if (this.ventaForm.valid) {
      //console.log('Formulario válido');
    } else {
      //console.log('Formulario inválido');
    }

    const ventaEmpleado = {
      RhUsuarioId: this.abrirFormulario ? this.numUsu.value : this.UsuarioId,
      Fecha: this.ventaForm.get("Fecha").value,
      Total: this.ventaForm.get("Total").value,

      // de aqui para aca son los que agregue
      //Nombre:this.ventaForm.controls['RhusuarioId'].setValue(this.Nombre)
      Nombre: this.abrirFormulario ? this.nombre.value : this.Nombre, // para que se vea el nombre
      //numVenta:this.numVenta = this.numVenta + 1, // para sumar cada venta , es una demo
      Numero_Empleado:this.abrirFormulario? this.NumeroEmpleadoEmpleado.value: this.NumeroEmpleado,
      Empresa: this.abrirFormulario ? this.EmpresaCapturar.value : this.Empresa,
      TipoNomina:this.abrirFormulario ? this.TipoNomina.value : this.IdNomina,




      NumeroDeEmpleado:  this.NumeroEmpleado,

      correoDestino: this.correoDestinatario,
      //Total: 0  // Inicializamos el Total en 0
      // hacemos algo con el numVenta
    };

    const detalles = this.appService.Data.cartList.map((product) => ({
      ProductoId: product.id,
      Precio: product.newPrice,
      Cantidad: product.cartCount,
      Importe: product.newPrice * product.cartCount,
      CodigoDiken: product.CodigoDiken,
      productoName: (product.name =
        product.name.length > this.maxPalabras
          ? product.name.substring(0, this.maxPalabras) + "..."
          : product.name),
    }));

    const data = {
      ventaEmpleado: ventaEmpleado,
      detalles: detalles,
    };

    //   // saber el numero de venta
    // // this.appService.AddVentaEmpleado(ventaEmpleado, this.appService.Data.cartList).subscribe((res) => {
    // //   this.numVenta = res.id;

    const varhtml = {
      ventaEmpleado: ventaEmpleado,
    };

    // });

    this.appService
      .AddVentaEmpleado(ventaEmpleado, detalles)
      .subscribe((res) => {
        this.numVenta = res.id;
        this.Mensaje = "se hizo la venta correctamente.";
        //this.numVenta +=1;

        // Agregar algo sobre que ha sido exitoso
        //console.log(this.numVenta);

        //enviar los datos al correo elctronico
        this.appService
          .sendemailVentaEmpleado(
            ventaEmpleado.NumeroDeEmpleado,
            ventaEmpleado.Fecha,
            ventaEmpleado.Total,
            detalles,
            ventaEmpleado.Nombre,
            this.numVenta,
            ventaEmpleado.correoDestino
          )
          .subscribe((res) => {
            //console.log(this.numVenta);
            // const id = res.id;
            // //console.log('ID recibido:', id);
            // Agregar algo sobre que ha sido exitoso
          });
      });
  }
  //     // saber el id
  //   onFocusOutEventCliente(value) {
  //     let clave = (value.target as HTMLInputElement).value;
  //     this.appService.GetClienteByClave(clave).subscribe((res: any) => {
  //       //console.log(res);
  //       this.billingForm.controls['claveCliente'].setValue(res.ClaveCliente);
  //     })

  // }

  //todo para limpiar carrito //
  public clear() {
    this.appService.Data.cartList.forEach((product) => {
      this.appService.resetProductCartCount(product);
    });
    this.appService.Data.cartList.length = 0;
    this.appService.Data.totalPrice = 0;
    this.appService.Data.totalCartCount = 0;
  }

  // Método que se llama cuando cambia la selección del radio button
  onNoUsuarioChange(value: string) {
    this.noUsuario = value;
    if (value === "before") {
      this.abrirFormulario = true;
    } else {
      this.abrirFormulario = false;
    }
  }

  //sera para que los perfiles solo vean el textBox
//todo creo es para los perfiles que no tienen perfil
  mostrarPerfilNuevo() {
    let userauth = JSON.parse(localStorage.getItem("datalogin")!);
    //console.log(userauth);
    this.appService.obtenerPerfil().subscribe((res) => {
      if (res !== null && res.includes(userauth.data.INUsuarioId)) {
        this.mostrarBox = true;
        console.log("Mostrar el box para el usuario actual");
      } else {
        this.mostrarBox = false;
        console.log("No mostrar el box para el usuario actual");
      }
    });
  }

  // se usara para buscar el usuario
  poderBuscarUsuario() {}

  getObtenerUsuarios(): void {
    this.supportService.getObtenerUsuarios().subscribe(
      (res) => {
        //console.log(res);
        this.usuarios = res.map((user: any) => {
          const usuario: Usuario = {
            name: user.Nombre,
            number: user.Telefono,
            email: user.Email,
            apellidos: user.Apellidos,
            direccion: user.Direccion,
            nombreUsuario: user.Usuario,
            contraseña: user.Password,
            IdDeUsuario: user.UsuarioId,
            imagen: user.Imagen,
            numEmpleado: user.Numero_Empleado,
            tokenId: user.TokenId,
          };

          // Aqui los asigno para que despues los obtenga en el formAdicional
          this.numeroDeEmpleado = usuario.numEmpleado;
          this.nombre1 = usuario.name;

          //console.log(usuario); // Realizar un //console.log con los datos de nombre y número de cada usuario
          return usuario;
        });
        // this.filterUsers(); // Llamamos a la función para filtrar los usuarios
      },
      (error) => {
        console.error("Error al obtener usuarios", error);
      }
    );
  }

  getObtenerEmpleadosSinCuenta(): void {
    this.supportService.getObtenerEmpleadosRhnet().subscribe(
      (res) => {
        //console.log(res);
        this.empleados = res.map((e: any) => {
          const empleado: Empleados = {
            NombreCompleto: e.Nombre + " " + e.APELLIDO_PATERNO + " " + e.APELLIDO_MATERNO,
            Numero_Empleado: e.NUMERO_EMPLEADO,
            Nomina: e.Nomina,
            Nombre:e.Nombre,
            Empresa:e.EMPRESA,
            id:e.id
          };

          // Aqui los asigno para que despues los obtenga en el formAdicional

          // console.log(empleado);
          return empleado;
        });
      },
      (error) => {
        console.error("Error al obtener empleados", error);
      }
    );
  }

  SeleccionarEmpleado(NumeroEmpleado, name ,empresa ,Nomina,id) {
    // es para seleccionar el empleado que se elegira por si no tiene cuenta la persona

    this.empleadoSeleccionado = id;

    console.log(id, name,empresa,Nomina,NumeroEmpleado);

    this.nombre1 = name;
    this.numeroDeEmpleado = NumeroEmpleado;
    this.empresaEmpleado = empresa;
    this.nominaEmpleado = Nomina
    this.idEmpleado = id


    this.numUsu.setValue(this.numeroDeEmpleado); // Actualizar el valor del FormControl numUsu
    this.nombre.setValue(this.nombre1); // Actua
    this.EmpresaCapturar.setValue(this.empresaEmpleado); // Actua
    this.TipoNomina.setValue(this.nominaEmpleado); // Actua
    this.NumeroEmpleadoEmpleado.setValue(this.idEmpleado); // Actua


    this.verCuadroEmpleados = false;


  }
}





