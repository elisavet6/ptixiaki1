import {Component, OnInit} from '@angular/core';
import {MatCheckboxChange} from "@angular/material/checkbox";
import {ApiService} from "../services/api.service";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";

@Component({
  selector: 'app-allsubjects',
  templateUrl: './allsubjects.component.html',
  styleUrls: ['./allsubjects.component.css']
})
export class AllsubjectsComponent implements OnInit {

  isLoaded: boolean;
  private mathimata: any;
  private users: any;
  private user_id: string;
  private username: string;
  private enrolledMathimata: any;

  constructor(private api: ApiService,
              private auth: AuthService,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit() {


    this.api.postTypeRequest('user/getall', {}).subscribe((res: any) => { //to subscribe to xrhsimopoioume epeidh perimenoume response apo backend
        if (res.status === 1) {
          this.users = res.data;
          this.user_id = this.get_user_id(); //pairnei to user id tou xrhsth

          //parakatw theloume na pairnoume  ta enrolled mathimata kathe fora pou anoigei h selida
          const payload_string = '{"user_id":"' + this.user_id + '"}';  //pedio json pou stelnoume pisw sto backend
          const payload_json = JSON.parse(payload_string);
          this.api.postTypeRequest('enrollements/getmathimataofuser', payload_json).subscribe((res: any) => { //to subscribe to xrhsimopoioume epeidh perimenoume response apo backend
              if (res.status === 1) {
                this.enrolledMathimata = res.data;
                this.isLoaded = true; // molis ginei true mporei na treksei o html kwdikas wste na exoun fortwsei ta dedomena
                console.log(this.enrolledMathimata);
              } else {
                console.log('Something went wrong with getall');
              }

            }
          );


        } else {
          console.log('Something went wrong with getall');
        }

      }
    );


    this.api.postTypeRequest('mathima/getall', {}).subscribe((res: any) => { //to subscribe to xrhsimopoioume epeidh perimenoume response apo backend
        if (res.status === 1) {
          this.mathimata = res.data;
        } else {
          console.log('Something went wrong with getall');
        }

      }
    );


  }

  changed(url: string, event: MatCheckboxChange) {
    const mathima_id = this.get_mathima_id(url);
    if (event.checked === false) {
      //apeggrafh
      const dialogResult = this.dialog.open(DialogComponent,
        {data: {message: 'Are you sure you want to dismiss this class?', button: 'Confirm'}}
      );
      dialogResult.afterClosed().subscribe((confirm) => {

        if (!confirm) {
          event.source.checked= true;
          return;
        } else {
          const payload_string = '{"user_id":"' + this.user_id + '", "mathima_id":"' + mathima_id + '"}';  //pedio json pou stelnoume pisw sto backend
          const payload_json = JSON.parse(payload_string);
          this.api.postTypeRequest('enrollements/delete', payload_json).subscribe((res: any) => { //to subscribe to xrhsimopoioume epeidh perimenoume response apo backend
              if (res.status === 1) {
                this.api.postTypeRequest('enrollements/getmathimataofuser', payload_json).subscribe((res: any) => { //to subscribe to xrhsimopoioume epeidh perimenoume response apo backend
                    if (res.status === 1) {
                      this.enrolledMathimata = res.data;
                      console.log(this.enrolledMathimata);
                    } else {
                      console.log('Something went wrong with getmathimata');
                    }

                  }
                );

              } else {
                console.log('something went wrong with delete')
              }

            }
          );
        }
      })
    } else {
      //eggrafh
      const dialogResult = this.dialog.open(DialogComponent,
        {data: {message: 'Are you sure you want to enroll to this class?', button: 'Confirm'}}
      );
      dialogResult.afterClosed().subscribe((confirm) => {

        if (!confirm) {
           event.source.checked= false;
          return;
        } else {
          const payload_string = '{"user_id":"' + this.user_id + '", "mathima_id":"' + mathima_id + '"}';  //pedio json pou stelnoume pisw sto backend
          const payload_json = JSON.parse(payload_string);

          this.api.postTypeRequest('enrollements/create', payload_json).subscribe((res: any) => { //to subscribe to xrhsimopoioume epeidh perimenoume response apo backend
              if (res.status === 1) {
                this.api.postTypeRequest('enrollements/getmathimataofuser', payload_json).subscribe((res: any) => { //to subscribe to xrhsimopoioume epeidh perimenoume response apo backend
                    if (res.status === 1) {
                      this.enrolledMathimata = res.data;
                      console.log(this.enrolledMathimata);
                    } else {
                      console.log('Something went wrong with getall');
                    }

                  }
                );

              }
            }
          );
        }
      })
    }
  }

  get_mathima_id(url: string) {
    for (const mathima of this.mathimata) {
      if (url === mathima.url) {
        return mathima.id
      }
    }
  }

  get_user_id() {
    let temp_user_string = this.auth.getUserDetails(); //gia na paroume ta stoixeia tou xrhsth
// @ts-ignore
    let user_string = temp_user_string.substring(1, temp_user_string.length - 1); //aferoume tis aggiles, dhladh ton prwto kai ton teleutaio xarakthra
    let jsnon_user_string = JSON.parse(user_string); //to metatrepoume se JSON wste na exoume ta stoixeia se morfh pinaka
    const username = jsnon_user_string['username'];

    for (const user of this.users) {
      if (username === user.username) {
        return user.id;

      }
    }

  }

  calculate(url: string): boolean {
    for (const mathima of this.enrolledMathimata) {
      if (url === mathima.url) {
        return true;
      }
    }
    return false;
  }
}

