import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {
  
  private redirectUrl: string = "";

  constructor(
    private router: Router,
  ) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const item = localStorage.getItem('userCredentials');
    const user = !item ? item : JSON.parse(item);
    if(!user || !user.roles.includes('admin')) {
      this.router.navigate(['/denied']);
      return false;
    }
    return true;
  }
}