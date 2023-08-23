import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { emailValidator } from '../../theme/utils/app-validators';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: UntypedFormGroup;
  nombreUsuario: string = '';
  correoEnviado: boolean = false;

  constructor(public formBuilder: UntypedFormBuilder, public appService:AppService, private router:Router) { }
  public usuarioId =0


  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      phone: ['', Validators.required],
      message: ['', Validators.required]
    });

    let userauth = JSON.parse(localStorage.getItem('datalogin')!)
    this.usuarioId = userauth.UsuarioId
    this.nombreUsuario = userauth.Nombre

    console.log(this.nombreUsuario);

  }

  public onContactFormSubmit(values:Object):void {
    if (this.contactForm.valid) {
      console.log(values);

      const data = {
        name: values['name'],
        email: values['email'],
        phone: values['phone'],
        message: values['message'],
      };

      // console.log(data);

      this.appService.sendComments(data.name,data.email,data.phone,data.message).subscribe((res) =>{
        console.log(res);
      })

      this.contactForm.reset();
      this.correoEnviado = true
    }
  }


  irAInicio(){
    this.router.navigate(['/productos']);

  }

}
