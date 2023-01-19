import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../myprofile/domain/user";
import {Anakoinwsh} from "./domain/anakoinwsh";
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-anakoinwseis',
  templateUrl: './anakoinwseis.component.html',
  styleUrls: ['./anakoinwseis.component.css']
})
export class AnakoinwseisComponent implements OnInit{
  displayedColumns: string[] = ['to_mathima', 'content', 'created_by'];
  anakoinwseis = new MatTableDataSource<Anakoinwsh>(); //dhlwsh listas me anakoinwseis

  constructor(private api:ApiService) {
  }

  ngOnInit() {

    this.api.postTypeRequest('anakoinwseis/getall', {}).subscribe((res: any) => { //to subscribe to xrhsimopoioume epeidh perimenoume response apo backend
        if (res.status === 1) {
          this.anakoinwseis = res.data;
        } else {
          console.log('Something went wrong with getall');
        }

      }
    );
  }
}
