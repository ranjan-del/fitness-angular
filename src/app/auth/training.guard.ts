import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable, inject } from "@angular/core";
import { Auth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class TrainingGuard implements CanActivate {
    private router = inject(Router);
    private auth = inject(Auth);
    private snackbar = inject(MatSnackBar);

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log('TrainingGuard.canActivate called for route:', state.url);
        
        // Check if user is authenticated
        if (this.auth.currentUser) {
            console.log('User is authenticated, allowing access to training');
            return true;
        } else {
            console.log('User is not authenticated, redirecting to login');
            this.snackbar.open('You must be logged in to access the training section', 'Close', {
                duration: 3000
            });
            this.router.navigate(['/login']);
            return false;
        }
    }
}