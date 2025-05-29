// auth.guard.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.authService.getUser();
    
    if (user) {
      // Check if route has any roles specified
      if (route.data['roles'] && route.data['roles'].length > 0) {
        // Check if user has required role
        const hasRole = route.data['roles'].some((role: string) => 
          this.authService.hasRole(role)
        );
        
        if (hasRole) {
          return true;
        }
        
        // User doesn't have required role
        this.router.navigate(['/unauthorized']);
        return false;
      }
      
      // No specific roles required, user is logged in
      return true;
    }

    // Not logged in, redirect to login with return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}