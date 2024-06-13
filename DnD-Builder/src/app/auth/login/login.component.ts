import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword: boolean = true;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['morgan@test.com', [Validators.required, Validators.email]],
      password: ['password', Validators.required],
      rememberMe: [false],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authSvc.login(this.loginForm.value).subscribe({
      next: (data) => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage = 'Login error';
        console.error('Login error', err);
      },
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
