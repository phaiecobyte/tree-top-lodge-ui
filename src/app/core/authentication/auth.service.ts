import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Initialize later to avoid using auth before initialization
  private userObservable: any;

  constructor(private auth: Auth, private router: Router) {
    // Move initialization to constructor
    this.userObservable = user(this.auth);
  }
  
  // Use getter for currentUser$
  get currentUser$() {
    return this.userObservable;
  }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password))
      .pipe(
        catchError(error => {
          console.error('Authentication failed:', error);
          throw new Error(`Authentication failed: ${error.message}`);
        })
      );
  }

  logout(): Observable<void> {
    return from(signOut(this.auth))
      .pipe(
        tap(() => this.router.navigate(['/login'])),
        catchError(error => {
          console.error('Logout failed:', error);
          throw new Error(`Logout failed: ${error.message}`);
        })
      );
  }

  isLoggedIn(): Observable<boolean> {
    return this.currentUser$.pipe(
      map(user => !!user)
    );
  }
}