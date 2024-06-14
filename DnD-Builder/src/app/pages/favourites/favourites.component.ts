import { Component } from '@angular/core';
import { iFavourites } from '../../models/i-favourites';
import { iUser } from '../../models/i-user';
import { iPg } from '../../models/i-pg';
import { FavouritesService } from '../../services/favourites.service';
import { iClasse } from '../../models/i-classe';
import { AuthService } from '../../auth/auth.service';
import { PgService } from '../../services/pg.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.scss',
})
export class FavouritesComponent {
  currentUser!: iUser;

  pg!: iPg;
  favouritesArray: iFavourites[] = [];
  arrayPgs: iPg[] = [];
  classPgArray: iClasse[] = [];

  constructor(
    private FavortiteSvc: FavouritesService,
    private AuthSvc: AuthService,
    private PgSvc: PgService
  ) {}

  ngOnInit() {
    this.PgSvc.getClasses().subscribe((classes) => {
      this.classPgArray = classes;
      console.log('classi', this.classPgArray);
    });

    const accessData = this.AuthSvc.getAccessData();
    if (!accessData) return;
    this.currentUser = accessData.user;
    const userId = accessData.user.id;

    this.FavortiteSvc.getFavouritePgs(userId).subscribe((favourites) => {
      this.favouritesArray = favourites;

      this.favouritesArray.forEach((favorite) => {
        this.PgSvc.getById(favorite.idPersonaggio).subscribe((pg) => {
          this.FavortiteSvc.addClassToPg(pg, this.classPgArray);
          this.arrayPgs.push(pg);
        });
      });
    });

    setTimeout(() => {
      console.log(this.arrayPgs);
    }, 2000); //check proprietà pgs
  }

  toggleFavourite(idPersonaggio: number) {
    this.FavortiteSvc.toggleFavourite(idPersonaggio);
  }
}
