import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserData } from 'src/app/shared/all-interface';

@Component({
  selector: 'app-list-dialog',
  templateUrl: './list-dialog.component.html',
  styleUrls: ['./list-dialog.component.scss']
})
export class ListDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: UserData,
  ) { }
}
