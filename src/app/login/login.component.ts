import {Component, OnInit} from '@angular/core';
import {ApiService} from "../services/api.service";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'first';
  credentials = {username: '', password: ''};


  constructor(private api: ApiService, private auth: AuthService, private router: Router) {
  }

  ngOnInit() {

  }

  login() {

    this.api.postTypeRequest('user/login', this.credentials).subscribe((res: any) => {
        if (res.status === 1) {
          this.auth.setDataInLocalStorage('userData', JSON.stringify(res.data))
          this.auth.setDataInLocalStorage('token', res.token)
          this.router.navigate(['allsubjects']);
        }
      }
    ) //url pou exoume orisei sto backend kai ta credentials pou periexoun ta stoixeia gia to login
  }
}
