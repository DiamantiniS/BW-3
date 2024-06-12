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
  searchTerm: string = '';
  constructor(private pgSvc: PgService) {}

  ngOnInit() {
    this.pgSvc.getAll().subscribe((pg) => {
      this.pgArr = pg;
    });
  }
  onSearch() {
  this.pgArr = this.pgArr.filter(pg =>
    pg.name.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}
}

