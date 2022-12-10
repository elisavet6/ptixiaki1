import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, Router}
  from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }
  canActivate(next: ActivatedRouteSnapshot, state:
    RouterStateSnapshot): Observable<boolean> | Promise<boolean> |
    boolean {
    if (this.authService.getToken()) {
      return true;
    }
// navigate to login page
    this.router.navigate(['']);
// you can save redirect url so after authing we can movethem back to the page they requested
    return false;
  }
}
