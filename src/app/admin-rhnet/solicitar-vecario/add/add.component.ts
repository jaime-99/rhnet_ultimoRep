import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogoVecarioComponent } from '../openDialogVecario/dialogo-vecario/dialogo-vecario.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {

  constructor(public dialog: MatDialog){}

  ngOnInit(): void {




  }




  openDialog(): void {
    const dialogRef = this.dialog.open(DialogoVecarioComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {



    });
}





}
