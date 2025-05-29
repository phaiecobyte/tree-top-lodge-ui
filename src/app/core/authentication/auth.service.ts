import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

const AUTH_API_URL = 'http://localhost:8080/api/v1/auth/';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient){}

  login(username: string, password: string): Observable<any> {
    return this.http.post<{accessToken: string}>(AUTH_API_URL + 'signin', {
      username,
      password
    }).pipe(
      tap(response => {
        this.saveToken(response.accessToken);
        this.saveUser(response);
      })
    );
  }

  register(username: string, email: string, password: string, fullName: string, phoneNumber: string, role: string[]): Observable<any> {
    return this.http.post(AUTH_API_URL + 'signup', {
      username,
      email,
      password,
      fullName,
      phoneNumber,
      roles: role
    });
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API_URL + 'signout', {}).pipe(
      tap(() => {
        this.clearStorage();
      })
    );
  }

  refreshToken(token: string): Observable<any> {
    return this.http.post(AUTH_API_URL + 'refreshtoken', {
      refreshToken: token
    });
  }

  saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getUser(): any {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  clearStorage(): void {
    window.localStorage.clear();
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  hasRole(role: string): boolean {
    const user = this.getUser();
    if (user && user.roles) {
      return user.roles.includes(role);
    }
    return false;
  }
}
