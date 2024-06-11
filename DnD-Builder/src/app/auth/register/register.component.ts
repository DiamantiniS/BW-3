import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from '../auth.service';
import { iAuthData } from '../../models/i-auth-data';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerData: Partial<iAuthData> = {};

  constructor(
    private authSvc: AuthService,
    private router: Router
  ){}

  signUp(){
    this.authSvc.register(this.registerData)
      .subscribe(data => {
        // Dopo la registrazione, reindirizza all pagina di login
        this.router.navigate(['/login']);
      });
  }
}


