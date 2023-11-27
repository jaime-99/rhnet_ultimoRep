import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ver-mas',
  templateUrl: './verMas.component.html',
  styleUrls: ['./verMas.component.scss'],
})
export class VerMasComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit(): void {



  }

  agregarSaltosDeLinea(texto: string): string {
    // Reemplaza cada dígito con el dígito seguido de un salto de línea
    return texto.replace(/\d\./g, match => `<br>${match}`);

  }





 }
