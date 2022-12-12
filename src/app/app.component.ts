import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title='first';
  constructor(private auth: AuthService) {

  }

  ngOnInit() {

    this.isAuthenticated();
  }

  isAuthenticated() {
    if (this.auth.getToken() != null) {
      return true;
    } else {
      return false;
    }
  }
}



