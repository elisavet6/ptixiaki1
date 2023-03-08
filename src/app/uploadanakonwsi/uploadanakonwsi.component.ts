import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Anakoinwsh} from "../anakoinwseis/domain/anakoinwsh";
import {SnackbarService} from "../services/snackbar.service";
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-uploadanakonwsi',
  templateUrl: './uploadanakonwsi.component.html',
  styleUrls: ['./uploadanakonwsi.component.css']
})
export class UploadanakonwsiComponent implements OnInit{

anak_content: string;


  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
   private dialog: MatDialogRef<UploadanakonwsiComponent>,
              private snackbar: SnackbarService,
              private api: ApiService) {
  }


  ngOnInit() {
  }

  create(){
    let anakoinwsi = new Anakoinwsh()
    anakoinwsi.content = this.anak_content;
    anakoinwsi.to_mathima = this.data.mathima_id;
    anakoinwsi.created_by = this.data.user_id;

    console.log(anakoinwsi.content);
    this.api.postTypeRequest('anakoinwseis/createanakoinwsi', anakoinwsi).subscribe((res: any) => {
        if (res.status === 1) {
          this.snackbar.success('Announcement successfully created');
          this.dialog.close();
        } else {
          this.snackbar.failure('Please try again');
        }
      }
    );
  }
}
