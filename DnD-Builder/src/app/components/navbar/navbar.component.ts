import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(private AuthSvc: AuthService) {}

  isLoggedIn = this.AuthSvc.loggedIn;

  ngOnInit() {
    this.AuthSvc.isLogged$.subscribe(
      (isLoggedIn) => (this.isLoggedIn = isLoggedIn)
    );
  }
  logout() {
    this.AuthSvc.logout();
  }
}
