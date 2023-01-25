import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../myprofile/domain/user";
import {Anakoinwsh} from "./domain/anakoinwsh";
import {ApiService} from "../services/api.service";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-anakoinwseis',
  templateUrl: './anakoinwseis.component.html',
  styleUrls: ['./anakoinwseis.component.css']
})
export class AnakoinwseisComponent implements OnInit{
  displayedColumns: string[] = ['to_mathima', 'content', 'created_by','creation_timestamp'];
  anakoinwseis = new MatTableDataSource<Anakoinwsh>(); //dhlwsh listas me anakoinwseis

  @ViewChild(MatSort) sort:MatSort;
  constructor(private api:ApiService) {
  }

  ngOnInit() {

    this.api.postTypeRequest('anakoinwseis/getallanakoinoseisfull', {}).subscribe((res: any) => { //to subscribe to xrhsimopoioume epeidh perimenoume response apo backend
        if (res.status === 1) {
          this.anakoinwseis = new MatTableDataSource<Anakoinwsh>(res.data);
          this.sort.sort({id:'creation_timestamp', start:'desc',disableClear: false});
          this.anakoinwseis.sort=this.sort;
        } else {
          console.log('Something went wrong with getall');
        }

      }
    );


  }
}
