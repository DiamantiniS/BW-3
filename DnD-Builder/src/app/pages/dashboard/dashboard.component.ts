import { Component } from '@angular/core';
import { PgService } from '../../services/pg.service';
import { iPg } from '../../models/i-pg';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  pgArr: iPg[] = [];
  constructor(public pgSvc: PgService) {}

  ngOnInit() {
    this.pgSvc.getAll().subscribe((pg) => {
      this.pgArr = pg;
    });
  }
}
