import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable, inject } from "@angular/core";
import { Auth } from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    private router = inject(Router);
    private auth = inject(Auth);

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log('AuthGuard.canActivate called');

        // Simple check - if there's a current user, allow access
        if (this.auth) {
            console.log('User is authenticated, allowing access');
            return true;
        } else {
            console.log('User is not authenticated, redirecting to login');
            this.router.navigate(['/login']);
            return false;
        }
    }
}