import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {ApiService} from "../services/api.service";
import {Router} from "@angular/router";
import {User} from "../myprofile/domain/user";
import {Mathima} from "../mathima/domain/mathima";


@Component({
  selector: 'app-kathigitis',
  templateUrl: './kathigitis.component.html',
  styleUrls: ['./kathigitis.component.css']
})
export class KathigitisComponent implements OnInit{
  user: User;
  private users: any;
  private user_id: string;
  enrolledmathimata: Mathima[];
  mathimaName: any;
  mathimaList: any;

  constructor(private auth: AuthService,
              private api:ApiService,
              private router: Router) {
  }

  ngOnInit() {
    this.user = new User();
    let user_string = this.auth.getVariableDetails('tempTeacher'); //gia na paroume ta stoixeia tou xrhsth
// @ts-ignore
    let jsnon_user_string = JSON.parse(user_string); //to metatrepoume se JSON wste na exoume ta stoixeia se morfh pinaka
    this.user.id = jsnon_user_string['id'];
    this.user.username = jsnon_user_string['username'];
    this.user.fullName = jsnon_user_string['fullName'];
    this.user.password = jsnon_user_string['password'];
    this.user.role = jsnon_user_string['role'];
    this.user.email = jsnon_user_string['email'];


    this.api.postTypeRequest('user/getall', {}).subscribe((res: any) => { //to subscribe to xrhsimopoioume epeidh perimenoume response apo backend
      if (res.status === 1) {
        this.users = res.data;


      }
    });


    const payload_string = '{"user_id":"' + this.user.id + '"}';  //pedio json pou stelnoume pisw sto backend
    const payload_json = JSON.parse(payload_string);
    this.api.postTypeRequest('enrollements/getmathimataofuser', payload_json).subscribe((res: any) => { //to subscribe to xrhsimopoioume epeidh perimenoume response apo backend
        if (res.status === 1) {
          this.enrolledmathimata = res.data;
          console.log(this.enrolledmathimata);


            const mathimaNames = this.enrolledmathimata.map(mathima => mathima.name);
            const mathimaList = document.getElementById("mathima-names");

            mathimaNames.forEach(name => {
              const li = document.createElement('li');
              li.textContent = name;
              // @ts-ignore
              mathimaList.appendChild(li);
              console.log(mathimaList);
            });


        } else {
          console.log('Something went wrong with getall');
        }

      }
    );


  }


}
