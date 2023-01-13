import {Component, OnInit} from '@angular/core';
import {User} from "../myprofile/domain/user";
import {ApiService} from "../services/api.service";
import {Router} from "@angular/router";
import {SnackbarService} from "../services/snackbar.service";

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.css']
})
export class CreateaccountComponent implements OnInit {
  user: User;
  newPassword: string;
  confirmPassword: string;

  constructor(private api: ApiService,
              private router: Router,
              private snackbar: SnackbarService) {
  }

  ngOnInit() {
    this.user = new User(); //arxikopoihsh metavlhths
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
      this.user.fullName === '' || this.newPassword === undefined || this.user.role ==='') {
      return true;
    } else {
      return false;
    }
  }
}
