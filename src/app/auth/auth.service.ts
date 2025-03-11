import { Subject, BehaviorSubject } from "rxjs";
import { Injectable, OnDestroy, PLATFORM_ID, inject } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "./user.model";
import { AuthData } from "./auth-data.model";
import { isPlatformBrowser } from "@angular/common";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential, onAuthStateChanged } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnDestroy {
    // Use BehaviorSubject to maintain the current auth state
    authChange = new BehaviorSubject<boolean>(false);
    private user: User | null = null;
    private platformId = inject(PLATFORM_ID);
    private router = inject(Router);
    private auth = inject(Auth);
    private snackbar = inject(MatSnackBar);
    
    private authStateUnsubscribe: (() => void) | null = null;
 
    constructor() {
        console.log('AuthService initialized');
        if (isPlatformBrowser(this.platformId)) {
            console.log('Running in browser');
            this.initAuthListener();
        } else {
            console.log('Running on server');
        }
    }

    initAuthListener() {
        this.authStateUnsubscribe = onAuthStateChanged(this.auth, user => {
            console.log('Auth state changed');

                if (user) {
                    console.log('User is authenticated:', user.uid);
                    this.user = {
                        email: user.email || '',
                        userId: user.uid
                    };
                    this.authChange.next(true);
                } else {
                    // Check if we're on a protected route before redirecting
                    const currentUrl = this.router.url;
                    if (currentUrl === '/training') {
                        this.router.navigate(['/login']);
                    }
                    console.log('User is not authenticated');
                    this.user = null;
                    this.authChange.next(false);
                }
            });

    }

    registerUser(authData: AuthData) {
        if (!isPlatformBrowser(this.platformId)) return;

        console.log('Registering user:', authData.email);
        createUserWithEmailAndPassword(this.auth, authData.email, authData.password)
        .then((result: UserCredential) => {
            console.log('User registered successfully:', result.user.uid);
            this.router.navigate(['/training']);
        }).catch((error: Error) => {
            console.error('Registration error:', error);
            this.snackbar.open(error.message, 'Close', {
                duration: 3000
            });
        });
    }

    login(authData: AuthData) {
        if (!isPlatformBrowser(this.platformId)) return;

        console.log('Logging in user:', authData.email);
        signInWithEmailAndPassword(this.auth, authData.email, authData.password)
        .then((result: UserCredential) => {
            console.log('User logged in successfully:', result.user.uid);
            this.router.navigate(['/training']);
        }).catch((error: Error) => {
            console.error('Login error:', error);
            this.snackbar.open(error.message, 'Close', {
                duration: 3000
            });
        });
    }

    logout() {
        if (!isPlatformBrowser(this.platformId)) return;

        console.log('Logging out user');
        signOut(this.auth).then(() => {
            console.log('User logged out successfully');
            // Clear local user state
            this.user = null;
            this.authChange.next(false);
            // Navigate using Angular router
            this.router.navigate(['/login']);
        }).catch((error: Error) => {
            console.error('Logout error:', error);
            this.snackbar.open(error.message, 'Close', {
                duration: 3000
            });
            // Even if there's an error, try to clear the state and redirect
            this.user = null;
            this.authChange.next(false);
            this.router.navigate(['/login']);
        });
    }

    getUser() {
        return this.user  != null;
    }

    isAuth() {
        return this.user != null;
    }

    ngOnDestroy() {
        if (this.authStateUnsubscribe) {
            this.authStateUnsubscribe();
        }
    }
}