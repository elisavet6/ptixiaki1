import {Component, OnInit} from '@angular/core';
import {User} from "./domain/user";
import {AuthService} from "../services/auth.service";
import {ApiService} from "../services/api.service";
import * as url from "url";
import {Router} from "@angular/router";

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  user: User;
  newPassword: string;
  confirmPassword: string;

  constructor(private auth: AuthService,
              private api:ApiService,
              private router: Router) {

  }

  ngOnInit() {
    this.user = new User();
    let temp_user_string = this.auth.getUserDetails(); //gia na paroume ta stoixeia tou xrhsth
// @ts-ignore
    let user_string = temp_user_string.substring(1, temp_user_string.length - 1); //aferoume tis aggiles, dhladh ton prwto kai ton teleutaio xarakthra
    let jsnon_user_string = JSON.parse(user_string); //to metatrepoume se JSON wste na exoume ta stoixeia se morfh pinaka

    this.user.username = jsnon_user_string['username'];
    this.user.fullName = jsnon_user_string['fullName'];
  }

  update() {
    this.user.password = this.newPassword;
    this.api.postTypeRequest('user/update', this.user).subscribe((res: any) => {
        if (res.status === 1) {
          this.auth.setDataInLocalStorage('userData', JSON.stringify(res.data))
          this.router.navigate(['allsubjects']);
        }
      }
    )
  }


  passwordsDoNotMatch() {
    if (this.newPassword !== this.confirmPassword) {
      return true;
    } else {
      return false;
    }
  }

  isDisabled() {
    if (this.passwordsDoNotMatch() || this.newPassword === '' ||
      this.user.fullName === '' || this.newPassword === undefined) {
      return true;
    } else {
      return false;
    }
  }
}
