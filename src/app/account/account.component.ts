import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../myprofile/domain/user";
import {MatTableDataSource} from "@angular/material/table";
import {ApiService} from "../services/api.service";
import {SnackbarService} from "../services/snackbar.service";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DialogComponent} from "../dialog/dialog.component";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  users = new MatTableDataSource<User>(); //dhlwsh listas me users
  deleteUser: boolean= false;
  displayedColumns: string[] = ['username', 'fullName', 'role', 'delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.users.paginator = this.paginator;
  }

  constructor(private api: ApiService,
  private snackbar: SnackbarService,
              private auth: AuthService,
              private router: Router,
              public dialog: MatDialog) {
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
  }

  delete(element:User) {
    const dialogResult= this.dialog.open(DialogComponent,
      {data: {message: 'Are you sure you want to delete this user?',button: 'Confirm'}}
      );
    dialogResult.afterClosed().subscribe((confirm) => {

      if (!confirm) {
        return;
      } else

    this.api.postTypeRequest('user/delete', element).subscribe((res: any) => {
      if (res.status ===1){
        this.snackbar.success('User ' + res.data.username+ 'successfully deleted')
        this.api.postTypeRequest('user/getall', {}).subscribe((res: any) => { //to subscribe to xrhsimopoioume epeidh perimenoume response apo backend
            if (res.status === 1) {
              this.users = res.data;
            } else {
              console.log('Something went wrong with getall');
            }

          }
        );
      } else {
        this.snackbar.failure('Cannot be deleted');
      }
    })
  }
  )
}


  viewDetails(element: User){
    this.auth.setDataInLocalStorage('tempUser', JSON.stringify(element))
    this.router.navigate(['edituser']);
  }
}
