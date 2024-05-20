import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { CovidService } from './service/covid.service';
import { Injectable, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class authenticationGuard implements CanActivate {
  constructor(
    private router: Router,
    private covidService: CovidService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.covidService.currentUserValue) {
      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}



// export const authenticationGuard: CanActivateFn = (route, state) => {

//   return true;
// };

