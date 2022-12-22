import {Component, OnInit} from '@angular/core';
import {User} from "../myprofile/domain/user";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit{
  users= new MatTableDataSource<User>(); //dhlwsh listas me users

  displayedComumns: string[] = ['username','fullName','role'];
  constructor() {
  }

  ngOnInit() {
  }

}
