import {Component, OnInit} from '@angular/core';
import {MatCheckboxChange} from "@angular/material/checkbox";
import {ApiService} from "../services/api.service";
import {User} from "../myprofile/domain/user";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-allsubjects',
  templateUrl: './allsubjects.component.html',
  styleUrls: ['./allsubjects.component.css']
})
export class AllsubjectsComponent implements OnInit{

  private mathimata: any;
  private users: any;
  private user_id: string;
  private username: string;

  constructor(private api: ApiService,
              private auth: AuthService,
              private router: Router) {
  }
ngOnInit() {


  this.api.postTypeRequest('user/getall', {}).subscribe((res: any) => { //to subscribe to xrhsimopoioume epeidh perimenoume response apo backend
      if (res.status === 1) {
        this.users = res.data;
      } else {
        console.log('Something went wrong with getall');
      }

    }
  );

  this.user_id=this.get_user_id()

  this.api.postTypeRequest('mathima/getall', {}).subscribe((res: any) => { //to subscribe to xrhsimopoioume epeidh perimenoume response apo backend
      if (res.status === 1) {
        this.mathimata = res.data;
      } else {
        console.log('Something went wrong with getall');
      }

    }
  );
}

  changed(url:string, event: MatCheckboxChange){
    const mathima_id=this.get_mathima_id(url);
    if(event.checked===false){
      //apeggrafh
      const payload_string = '{"user_id":"' + this.user_id + '", "mathima_id":"' + mathima_id + '"}';  //pedio json pou stelnoume pisw sto backend
      const payload_json= JSON.parse(payload_string)
      this.api.postTypeRequest('enrollements/delete',payload_json);
    }else {
      //eggrafh
      const payload_string = '{"user_id":"' + this.user_id + '", "mathima_id":"' + mathima_id + '"}';  //pedio json pou stelnoume pisw sto backend
      const payload_json= JSON.parse(payload_string)
    this.api.postTypeRequest('enrollements/create',payload_json);
    }
}

get_mathima_id(url:string){
    for(const mathima of this.mathimata){
      if (url ===mathima.url){
        return mathima.id
      }
    }
}
get_user_id(){
  let temp_user_string = this.auth.getUserDetails(); //gia na paroume ta stoixeia tou xrhsth
// @ts-ignore
  let user_string = temp_user_string.substring(1, temp_user_string.length - 1); //aferoume tis aggiles, dhladh ton prwto kai ton teleutaio xarakthra
  let jsnon_user_string = JSON.parse(user_string); //to metatrepoume se JSON wste na exoume ta stoixeia se morfh pinaka
  const username= jsnon_user_string['username'];

  for(const user of this.users){
    if (username ===user.username){
      return user.id;

    }
  }

}

}
