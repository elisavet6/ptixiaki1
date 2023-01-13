import {Component, OnInit} from '@angular/core';
import {User} from "../myprofile/domain/user";
import {AuthService} from "../services/auth.service";
import {ApiService} from "../services/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
  user: User;
  newPassword: string;
  confirmPassword: string;

  constructor(private auth: AuthService,
              private api:ApiService,
              private router: Router) {

  }

  ngOnInit() {
    this.user = new User();
    let user_string = this.auth.getVariableDetails('tempUser'); //gia na paroume ta stoixeia tou xrhsth
// @ts-ignore
    let jsnon_user_string = JSON.parse(user_string); //to metatrepoume se JSON wste na exoume ta stoixeia se morfh pinaka

    this.user.username = jsnon_user_string['username'];
    this.user.fullName = jsnon_user_string['fullName'];
    this.user.password = jsnon_user_string['password'];
    this.user.role = jsnon_user_string['role'];
  }

  update() {
    this.user.password = this.newPassword;
    this.api.postTypeRequest('user/update', this.user).subscribe((res: any) => {
        if (res.status === 1) {
          this.auth.setDataInLocalStorage('tempUser', JSON.stringify(res.data))
          this.router.navigate(['account']);
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
