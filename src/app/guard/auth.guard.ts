import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('Token');
    if (token) {
      const newToken = JSON.parse(token);
      const tokenPayload: any = decode(newToken.token);
      const role = tokenPayload.role;
      if (token != null && expectedRole.includes(role)) return true;
      window.location.href = '/';
      return false;
    } else {
      return false;
    }
  }
}
