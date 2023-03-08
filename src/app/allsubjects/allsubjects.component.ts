import {Component, OnInit} from '@angular/core';
import {MatCheckboxChange} from "@angular/material/checkbox";
import {ApiService} from "../services/api.service";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {User} from "../myprofile/domain/user";
import {SnackbarService} from "../services/snackbar.service";
import {Mathima} from "../mathima/domain/mathima";
import {MatTableDataSource} from "@angular/material/table";
import {CreatesubjectComponent} from "../createsubject/createsubject.component";
import {MathimaComponent} from "../mathima/mathima.component";
import {FormControl} from "@angular/forms";
import {ReplaySubject, Subject, takeUntil} from "rxjs";
import {FileuploadComponent} from "../fileupload/fileupload.component";
import {MatFormFieldModule} from '@angular/material/form-field';
@Component({
  selector: 'app-allsubjects',
  templateUrl: './allsubjects.component.html',
  styleUrls: ['./allsubjects.component.css']
})
export class AllsubjectsComponent implements OnInit {

  isLoaded: boolean;
  mathimata: any;
  title = 'ΌΛΑ ΤΑ ΜΑΘΗΜΑΤΑ';
  displayedColumns: string[] = ['assign','mathimaName', 'upoxrewtiko','delete'];
  filtered: Mathima[];
  first: Mathima[];
  second: Mathima[];
  third: Mathima[];
  fourth: Mathima[];
  prwto = new MatTableDataSource<Mathima>();
  deutero = new MatTableDataSource<Mathima>();
  trito = new MatTableDataSource<Mathima>();
  tetarto = new MatTableDataSource<Mathima>();
  private users: any;
  private user_id: string;
  private username: string;
  private enrolledMathimata: any;
  user:any;
  studentTeacher: boolean=false;
  isSecretary: boolean = false;

  constructor(private api: ApiService,
              private auth: AuthService,
              private router: Router,
              private dialog: MatDialog,
              private snackbar: SnackbarService) {
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
              } else {
                console.log('Something went wrong with command postTypeRequest(\'enrollements/getmathimataofuser\' of ngOnInit method ');
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
          this.filtered = res.data;


              this.first = this.filtered.filter(
                (mathima) => mathima.examino === 1);
              this.prwto = new MatTableDataSource<Mathima>(this.first);

              this.second = this.filtered.filter(mathima => mathima.examino === 2);
              this.deutero = new MatTableDataSource<Mathima>(this.second);

          this.third = this.filtered.filter(mathima => mathima.examino === 3);
          this.trito = new MatTableDataSource<Mathima>(this.third);

          this.fourth = this.filtered.filter(mathima => mathima.examino === 4);
          this.tetarto = new MatTableDataSource<Mathima>(this.fourth);



        } else {
          console.log('Something went wrong with getall');
        }

      }
    );
    //παρακάτω παίρνουμε τα δεδομένα του χρήστη που είναι συνδεδεμένος ώστε να βρούμε το ρόλο
    this.user = new User();
    let temp_user_string = this.auth.getUserDetails(); //gia na paroume ta stoixeia tou xrhsth
// @ts-ignore
    let user_string = temp_user_string.substring(1, temp_user_string.length - 1); //aferoume tis aggiles, dhladh ton prwto kai ton teleutaio xarakthra
    let jsnon_user_string = JSON.parse(user_string); //to metatrepoume se JSON wste na exoume ta stoixeia se morfh pinaka

    this.user.role = jsnon_user_string['role'];



//ελέγχουμε αν είναι γραμματεία
    if (this.user.role === 'secretary') {
     this.displayedColumns= ['mathimaName', 'upoxrewtiko','delete'];
      this.studentTeacher=false;
      this.isSecretary = true;
    } else {
      this.studentTeacher=true;
      this.displayedColumns= ['assign','mathimaName', 'upoxrewtiko'];
      this.isSecretary = false;
    }




  }

  changed(url: string, event: MatCheckboxChange) {
    const mathima_id = this.get_mathima_id(url);
    if (!event.checked) {
      //apeggrafh
      const dialogResult = this.dialog.open(DialogComponent,
        {data: {message: 'Are you sure you want to dismiss this class?', button: 'Confirm'}}
      );
      dialogResult.afterClosed().subscribe((confirm) => {

        if (!confirm) {
          event.source.checked = true;
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
          event.source.checked = false;
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
        return mathima.id;
        ;
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

  deleteSub(element:Mathima){
    const dialogResult = this.dialog.open(DialogComponent,
      {data: {message: 'Are you sure you want to delete this subject?', button: 'Confirm'}}
    );
    dialogResult.afterClosed().subscribe((confirm) => {

        if (!confirm) {
          return;
        } else
          this.api.postTypeRequest('mathima/delete', element).subscribe((res: any) => {
            if (res.status === 1) {
              if (this.mathimata){
                this.snackbar.success('Subject successfully deleted')
                this.api.postTypeRequest('mathima/getall', {}).subscribe((res: any) => { //to subscribe to xrhsimopoioume epeidh perimenoume response apo backend
                    if (res.status === 1) {
                      this.mathimata = res.data;
                      this.filtered = res.data;


                      this.first = this.filtered.filter(
                        (mathima) => mathima.examino === 1);
                      this.prwto = new MatTableDataSource<Mathima>(this.first);

                      this.second = this.filtered.filter(mathima => mathima.examino === 2);
                      this.deutero = new MatTableDataSource<Mathima>(this.second);

                      this.third = this.filtered.filter(mathima => mathima.examino === 3);
                      this.trito = new MatTableDataSource<Mathima>(this.third);

                      this.fourth = this.filtered.filter(mathima => mathima.examino === 4);
                      this.tetarto = new MatTableDataSource<Mathima>(this.fourth);

                    } else {
                      console.log('Something went wrong with delete sub');
                    }

                  }
                );
              }

            } else {
              this.snackbar.failure('Subject cannot be deleted');
            }
          })
      }
    )
  }
 createSub(){
   const dialogRef = this.dialog.open(CreatesubjectComponent,{
     height: '600px',
     width: '400px',
     data: {user_id: this.user_id}
   });

   dialogRef.afterClosed().subscribe(next => {
     this.api.postTypeRequest('mathima/getall', {}).subscribe((res: any) => { //to subscribe to xrhsimopoioume epeidh perimenoume response apo backend

         if (res.status === 1) {
           this.mathimata = res.data;
           this.filtered = res.data;


           this.first = this.filtered.filter(
             (mathima) => mathima.examino === 1);
           this.prwto = new MatTableDataSource<Mathima>(this.first);

           this.second = this.filtered.filter(mathima => mathima.examino === 2);
           this.deutero = new MatTableDataSource<Mathima>(this.second);

           this.third = this.filtered.filter(mathima => mathima.examino === 3);
           this.trito = new MatTableDataSource<Mathima>(this.third);

           this.fourth = this.filtered.filter(mathima => mathima.examino === 4);
           this.tetarto = new MatTableDataSource<Mathima>(this.fourth);



         } else {
           console.log('Something went wrong with getall');
         }

       }
     );

   });
 }

  goToMathima(element: Mathima){

    this.auth.setDataInLocalStorage('tempMathima', JSON.stringify(element))
    this.router.navigate(['mathima/:element.url']);
 }

}
