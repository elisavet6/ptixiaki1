import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component'; import {RouterLink, RouterModule, RouterOutlet, Routes} from  "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AllsubjectsComponent} from "./allsubjects/allsubjects.component";
import {AuthGuardService} from "./services/auth-guard.service";
import {NavbarComponent} from "./navbar/navbar.component";
import { MathimaComponent } from './mathima/mathima.component';
import {FooterComponent} from "./footer/footer.component";
import { MyprofileComponent } from './myprofile/myprofile.component';
import { NavmathimatosComponent } from './navmathimatos/navmathimatos.component';
import { AccountComponent } from './account/account.component';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { CreateaccountComponent } from './createaccount/createaccount.component';
import { EdituserComponent } from './edituser/edituser.component';
import {MatLegacyFormFieldModule} from "@angular/material/legacy-form-field";
import {MatSelectModule} from "@angular/material/select";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from "@angular/material/button";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialog, matDialogAnimations, MatDialogModule} from "@angular/material/dialog";
import { DialogComponent } from './dialog/dialog.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { MysubjectsComponent } from './mysubjects/mysubjects.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import { AnakoinwseisComponent } from './anakoinwseis/anakoinwseis.component';
import {MatLegacyTabsModule} from "@angular/material/legacy-tabs";
import {MatSortModule} from "@angular/material/sort";
import { VideostreamingComponent } from './videostreaming/videostreaming.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatInputModule} from "@angular/material/input";
import {YouTubePlayerModule} from "@angular/youtube-player";
import {NgbRating} from "@ng-bootstrap/ng-bootstrap";
import {MatChipsModule} from '@angular/material/chips';
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import { FileuploadComponent } from './fileupload/fileupload.component';
import { CreatesubjectComponent } from './createsubject/createsubject.component';
import { KathigitisComponent } from './kathigitis/kathigitis.component';
import { UploadanakonwsiComponent } from './uploadanakonwsi/uploadanakonwsi.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'allsubjects',
    component: AllsubjectsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService]
  },
  {
    path: 'mathima/:url',
    component: MathimaComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService]
  },
  {
    path: 'myprofile',
    component: MyprofileComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService]
  },
  {
    path: 'account',
    component: AccountComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService]
  },
  {
    path: 'createaccount',
    component: CreateaccountComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService]
  },
  {
    path: 'edituser',
    component: EdituserComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService]
  },
  {
    path: 'mysubjects',
    component: MysubjectsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService]
  },
  {
    path: 'videostreaming',
    component: VideostreamingComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService]
  },
  {
    path: 'kathigitis',
    component: KathigitisComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService]
  }

];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    AllsubjectsComponent,
    MathimaComponent,
    FooterComponent,
    MyprofileComponent,
    NavmathimatosComponent,
    AccountComponent,
    CreateaccountComponent,
    EdituserComponent,
    DialogComponent,
    MysubjectsComponent,
    AnakoinwseisComponent,
    VideostreamingComponent,
    FileuploadComponent,
    CreatesubjectComponent,
    KathigitisComponent,
    UploadanakonwsiComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterOutlet,
    RouterModule,
    RouterLink,
    RouterModule.forRoot(routes),
    MatTableModule,
    MatCardModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatSelectModule,
    FontAwesomeModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatListModule,
    MatLegacyTabsModule,
    MatSortModule,
    MatInputModule,
    MatGridListModule,
    YouTubePlayerModule,
    NgbRating,
    MatChipsModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }


