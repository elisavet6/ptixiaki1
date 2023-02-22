import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Mathima} from "../mathima/domain/mathima";
import {ApiService} from "../services/api.service";
import {SnackbarService} from "../services/snackbar.service";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-createsubject',
  templateUrl: './createsubject.component.html',
  styleUrls: ['./createsubject.component.css']
})
export class CreatesubjectComponent implements OnInit{
 mathima: Mathima;
 mathimata: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
              private api: ApiService,
              private snackbar: SnackbarService,
              private router: Router,
              private dialog: MatDialogRef<CreatesubjectComponent>){

  }

  ngOnInit(){
    this.api.postTypeRequest('mathima/getall', {}).subscribe((res: any) => { //to subscribe to xrhsimopoioume epeidh perimenoume response apo backend

        if (res.status === 1) {
          this.mathimata = res.data;


        } else {
          console.log('Something went wrong with getall');
        }

      }
    );

  }

  create() {

    this.api.postTypeRequest('mathima/create', this.mathima).subscribe((res: any) => {
        if (res.status === 1) {
          this.snackbar.success('Subject successfully created');
        } else {
          this.snackbar.failure('Please try again');
        }
      }
    ); this.dialog.close();
  }
  isDisabled() {

    if (this.mathima.name === '' || this.mathima.name === undefined || this.mathima.url === '' || this.mathima.examino === undefined
      ||this.mathima.upoxrewtiko === '' || this.mathima.upoxrewtiko === undefined) {
      return true;
    } else {
      return false;
    }
  }
}
