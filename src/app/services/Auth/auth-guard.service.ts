import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthentifcationService } from '../Authentifcation.service';
import { UserService } from '../user.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor( auth: AuthentifcationService,public userService: UserService,public  router: Router) {}

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userId = this.userService.getUserId();
console.log(userId)
    if (userId) {
      return true;
    } else {
      // Redirect to the login page if the user is not authenticated
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}