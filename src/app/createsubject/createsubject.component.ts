import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Mathima} from "../mathima/domain/mathima";
import {ApiService} from "../services/api.service";
import {SnackbarService} from "../services/snackbar.service";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {MathimaComponent} from "../mathima/mathima.component";
import {ReplaySubject, Subject, takeUntil} from "rxjs";
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
@Component({
  selector: 'app-createsubject',
  templateUrl: './createsubject.component.html',
  styleUrls: ['./createsubject.component.css']
})
export class CreatesubjectComponent implements OnInit{

 mathimata: any;

 mathima_name: string;
 mathima_examino: number;
 mathima_url: string;
 mathima_description: string;
 mathima_upoxrewtiko: string;

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
    let mathima = new Mathima();
    mathima.name = this.mathima_name;
    mathima.url = this.mathima_name.replace(/\s/g, "").toLowerCase();
    mathima.examino = this.mathima_examino;
    mathima.description = this.mathima_description;
    mathima.upoxrewtiko = this.mathima_upoxrewtiko;
    this.api.postTypeRequest('mathima/create', mathima).subscribe((res: any) => {
        if (res.status === 1) {
          this.snackbar.success('Subject successfully created');
        } else {
          this.snackbar.failure('Please try again');
        }
      }
    ); this.dialog.close();
  }

}
