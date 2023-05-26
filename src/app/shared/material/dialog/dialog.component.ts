import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  msgTitle: string = '';
  msg: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) data: DialogData) {
    this.msgTitle = data.title;
    this.msg = data.msg;
  }
}

export interface DialogData {
  title: string,
  msg: string
}
