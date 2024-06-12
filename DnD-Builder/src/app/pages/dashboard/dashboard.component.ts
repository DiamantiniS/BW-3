import { Component } from '@angular/core';
import { PgService } from '../../services/pg.service';
import { iPg } from '../../models/i-pg';
import { FavouritesService } from '../../services/favourites.service';
import { iClasse } from '../../models/i-classe';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  pgArr: iPg[] = [];
  pgSearchArray: iPg[] = [];
  classPgArray: iClasse[] = [];
  searchTerm: string = '';
  constructor(
    private PgSvc: PgService,
    private FavortiteSvc: FavouritesService
  ) {}

  ngOnInit() {
    this.PgSvc.getClasses().subscribe((classes) => {
      this.classPgArray = classes;
    });

    this.PgSvc.getAll().subscribe((pg) => {
      this.pgArr = pg;
      this.pgSearchArray = this.pgArr;

      this.pgArr.forEach((pg) => {
        this.FavortiteSvc.addClassToPg(pg, this.classPgArray);
      });
    });
  }
  onSearch() {
    this.pgSearchArray = this.pgArr.filter(
      (pg) =>
        pg.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        pg.classe?.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  showAll() {
    this.pgSearchArray = this.pgArr;
  }
}
