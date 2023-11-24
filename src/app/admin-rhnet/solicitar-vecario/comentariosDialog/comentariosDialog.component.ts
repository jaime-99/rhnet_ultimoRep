import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-comentarios-dialog',
  templateUrl: './comentariosDialog.component.html',
  styleUrls: ['./comentariosDialog.component.scss'],
})
export class ComentariosDialogComponent implements OnInit {


  constructor(  @Inject(MAT_DIALOG_DATA) public data ){}

  ngOnInit(): void {


  }





 }
