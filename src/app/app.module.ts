import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component'; import {RouterLink, RouterModule, RouterOutlet, Routes} from  "@angular/router";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AllsubjectsComponent} from "./allsubjects/allsubjects.component";
import {AuthGuardService} from "./services/auth-guard.service";
import {NavbarComponent} from "./navbar/navbar.component";
import { MathimaComponent } from './mathima/mathima.component';
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
  }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    AllsubjectsComponent,
    MathimaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterOutlet,
    RouterModule,
    RouterLink,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
