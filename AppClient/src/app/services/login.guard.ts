import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from "./auth/auth.service"

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private authService:AuthService)
  {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
     {
       if(this.authService.isAuthenticated())
        return true;
       else return false;
  }
}
