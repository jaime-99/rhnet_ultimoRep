import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RhnetService } from '../../rhnet.service';

@Component({
  selector: 'app-detalle',

  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  constructor ( private rhnet:RhnetService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }




}
