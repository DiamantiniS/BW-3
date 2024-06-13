import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap, map, Observable } from 'rxjs';
import { iUser } from '../models/i-user';
import { iAuthData } from '../models/i-auth-data';
import { iAuthResponse } from '../models/i-auth-response';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {
    this.restoreUser();
  }

  jwtHelper: JwtHelperService = new JwtHelperService();
  userSubj = new BehaviorSubject<iUser | null>(null);
  loggedIn: boolean = false;

  user$ = this.userSubj.asObservable();
  isLogged$ = this.user$.pipe(
    map((user) => !!user),
    tap((user) => (this.loggedIn = !!user))
  );

  registerUrl: string = 'http://localhost:3000/register';
  loginUrl: string = 'http://localhost:3000/login';

  register(newUser: Partial<iUser>): Observable<iAuthResponse> {
    return this.http.post<iAuthResponse>(this.registerUrl, newUser);
  }

  login(loginData: iAuthData): Observable<iAuthResponse> {
    return this.http.post<iAuthResponse>(this.loginUrl, loginData).pipe(
      tap((data) => {
        this.userSubj.next(data.user);
        localStorage.setItem('accessData', JSON.stringify(data));
        this.autoLogout(data.accessToken);
      })
    );
  }

  logout() {
    this.userSubj.next(null);
    localStorage.removeItem('accessData');
    this.router.navigate(['/auth/login']);
  }

  restoreUser() {
    const userJson = localStorage.getItem('accessData');
    if (!userJson) return;
    const accessData: iAuthResponse = JSON.parse(userJson);
    if (this.jwtHelper.isTokenExpired(accessData.accessToken)) return;
    this.userSubj.next(accessData.user);
    this.autoLogout(accessData.accessToken);
  }

  autoLogout(jwt: string) {
    const expDate = this.jwtHelper.getTokenExpirationDate(jwt) as Date;
    const expMs = expDate.getTime() - new Date().getTime();
    setTimeout(() => {
      this.logout();
    }, expMs);
  }

  accessToken(): string {
    const userJson = localStorage.getItem('accessData');
    if (!userJson) return '';
    const accessData: iAuthResponse = JSON.parse(userJson);
    if (this.jwtHelper.isTokenExpired(accessData.accessToken)) return '';
    return accessData.accessToken;
  }

  getAccessData(): iAuthResponse | null {
    const jsonData = localStorage.getItem('accessData');
    if (!jsonData) return null;
    const accessData: iAuthResponse = JSON.parse(jsonData);
    return accessData;
  }
}
