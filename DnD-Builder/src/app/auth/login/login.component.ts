import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from '../auth.service';
import { iAuthData } from '../../models/i-auth-data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  loginData: iAuthData = {
    email: '',
    password: ''
  };

  constructor(
    private authSvc: AuthService,
    private router: Router
  ){}

  signIn(){
    this.authSvc.login(this.loginData)
      .subscribe(data => {
        this.router.navigate(['/dashboard']);
      });
    console.log(this.loginData);
  }


}
