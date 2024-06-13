import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { iUser } from '../../models/i-user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  user: iUser | null = null;

  constructor(private AuthSvc: AuthService) {}

  ngOnInit() {
    this.AuthSvc.isLogged$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      const accessData = this.AuthSvc.getAccessData();
      if (accessData) {
        this.user = accessData.user;
      } else {
        this.user = null;
      }
    });
  }

  logout() {
    this.AuthSvc.logout();
  }
}
