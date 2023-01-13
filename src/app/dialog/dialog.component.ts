import {Component, Inject, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../myprofile/domain/user";
import {ApiService} from "../services/api.service";
import {SnackbarService} from "../services/snackbar.service";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {DialogData} from "./dialog-data";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }


  ngOnInit() {
  }
}
