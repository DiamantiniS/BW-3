import { Component } from '@angular/core';
import { PgService } from '../../services/pg.service';
import { iPg } from '../../models/i-pg';
import { FavouritesService } from '../../services/favourites.service';
import { iClasse } from '../../models/i-classe';
import { iFavourites } from '../../models/i-favourites';
import { AuthService } from '../../auth/auth.service';
import { iUser } from '../../models/i-user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  pgArr: iPg[] = [];
  pgSearchArray: iPg[] = [];
  classPgArray: iClasse[] = [];
  favouritesArray: iFavourites[] = [];
  currentUser!: iUser;
  searchTerm: string = '';
  constructor(
    private PgSvc: PgService,
    private FavortiteSvc: FavouritesService,
    private AuthSvc: AuthService
  ) {}

  ngOnInit() {
    const accessData = this.AuthSvc.getAccessData();
    if (!accessData) return;
    this.currentUser = accessData.user;
    const userId = accessData.user.id;
    this.PgSvc.getClasses().subscribe((classes) => {
      this.classPgArray = classes;
    });

    this.FavortiteSvc.getFavouritePgs(userId).subscribe((favourites) => {
      this.favouritesArray = favourites;
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
