import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {User} from "../myprofile/domain/user";
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  user: User;
  role: string;
  isSecretary : boolean= false;
  constructor(private auth: AuthService,
             private router: Router){
  }
  ngOnInit() {
    this.user = new User();
    let temp_user_string = this.auth.getUserDetails(); //gia na paroume ta stoixeia tou xrhsth
// @ts-ignore
    let user_string = temp_user_string.substring(1, temp_user_string.length - 1); //aferoume tis aggiles, dhladh ton prwto kai ton teleutaio xarakthra
    let jsnon_user_string = JSON.parse(user_string); //to metatrepoume se JSON wste na exoume ta stoixeia se morfh pinaka

    this.user.role = jsnon_user_string['role'];

      if (this.user.role === 'secretary'){
        this.isSecretary=true;
      } else {
        this.isSecretary=false;
      }

  }

  logout(){
    this.auth.clearStorage(); //svhnetai to token
    this.router.navigate(['']); //gurname sth selida login
  }

}



