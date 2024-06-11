import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { iUser } from '../../models/i-user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerData: Partial<iUser> = {};

  constructor(
    private authSvc: AuthService,
    private router: Router
  ){}

  signUp() {
    console.log('Attempting to register user:', this.registerData);
    this.authSvc.register(this.registerData)
      .subscribe({
        next: data => {
          console.log('Registration successful', data);
          this.router.navigate(['/auth/login']);
        },
        error: err => {
          console.error('Registration error', err);
        }
      });
  }
}
