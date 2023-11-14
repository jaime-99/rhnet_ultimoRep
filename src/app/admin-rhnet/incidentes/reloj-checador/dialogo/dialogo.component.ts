import { Component, OnInit, Inject } from '@angular/core';
import { DialogData } from '../../pase-digital/open-dialog/open-dialog.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo.component.html',
  styleUrls: ['./dialogo.component.scss']
})
export class DialogoComponent implements OnInit {

  constructor(  @Inject(MAT_DIALOG_DATA) public data,
  ) { }



  ngOnInit(): void {



  }





}
