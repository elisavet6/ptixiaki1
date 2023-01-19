import {Component, OnInit} from '@angular/core';
import {User} from "../myprofile/domain/user";
import {ApiService} from "../services/api.service";
import {Router} from "@angular/router";
import {SnackbarService} from "../services/snackbar.service";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.css']
})
export class CreateaccountComponent implements OnInit {
  user: User;
  newPassword: string;
  confirmPassword: string;
  check: boolean;
  users: any;

  constructor(private api: ApiService,
              private router: Router,
              private snackbar: SnackbarService,
              private auth: AuthService) {
  }

  ngOnInit() {
    this.user = new User(); //arxikopoihsh metavlhths
    this.check = false;
    this.api.postTypeRequest('user/getall', {}).subscribe((res: any) => { //to subscribe to xrhsimopoioume epeidh perimenoume response apo backend
        if (res.status === 1) {
          this.users = res.data;
          console.log(this.users[2].username);
        } else {
          console.log('Something went wrong with getall');
        }

      }
    );
  }

  create() {
    this.user.password = this.newPassword;
    this.api.postTypeRequest('user/create', this.user).subscribe((res: any) => {
        if (res.status === 1) {
          this.snackbar.success('User successfully created');
          this.router.navigate(['account']);
        } else {
          this.snackbar.failure('Please try again');
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
      this.user.fullName === '' || this.newPassword === undefined || this.user.role === '' || this.checkUser()||this.user.role=== undefined) {
      return true;
    } else {
      return false;
    }
  }

  checkUser(): boolean {
    for (const puser of this.users) {
      if (this.user.username === puser.username) {
        return true;

      }
    }
    return false;
  }
}
