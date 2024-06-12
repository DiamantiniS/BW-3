import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { iAuthData } from '../../models/i-auth-data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginData: iAuthData = {
    email: 'paulo@paulo.com',
    password: 'password',
  };

  constructor(private authSvc: AuthService, private router: Router) {}

  signIn() {
    this.authSvc.login(this.loginData).subscribe({
      next: (data) => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Login error', err);
      },
    });
    console.log(this.loginData);
  }
}
