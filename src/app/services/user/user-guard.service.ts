import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserGuardService implements CanActivate {
  
  private redirectUrl: string = "";

  constructor(
    private router: Router,
  ) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const item = localStorage.getItem('userCredentials');
    const user = !item ? item : JSON.parse(item);
    if(!user || !user.roles.includes('user')) {
      this.router.navigate(['/denied']);
      return false;
    }
    return true;
  }
}