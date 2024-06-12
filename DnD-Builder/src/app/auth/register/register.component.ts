import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { iUser } from '../../models/i-user';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  hidePassword: boolean = true;

  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      proPic: [''],
    });
  }

  ngOnInit(): void {}

  signUp() {
    if (this.registerForm.valid) {
      this.authSvc.register(this.registerForm.value).subscribe({
        next: () => {
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          console.error('Registration error', err);
        },
      });
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
