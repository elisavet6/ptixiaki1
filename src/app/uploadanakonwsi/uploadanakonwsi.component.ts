import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-uploadanakonwsi',
  templateUrl: './uploadanakonwsi.component.html',
  styleUrls: ['./uploadanakonwsi.component.css']
})
export class UploadanakonwsiComponent implements OnInit{

anak_content: string;
anak_mathima: string;
anak_kathigitis: string;


  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
   private dialog: MatDialogRef<UploadanakonwsiComponent>) {
  }


  ngOnInit() {
  }
}
