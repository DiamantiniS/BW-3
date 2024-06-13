import { Component, Input } from '@angular/core';
import { iUser } from '../../../models/i-user';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() isLoggedIn: boolean = false;
  @Input() user: iUser | null = null;

  constructor(private AuthSvc: AuthService) {}

  logout() {
    this.AuthSvc.logout();
  }
}
