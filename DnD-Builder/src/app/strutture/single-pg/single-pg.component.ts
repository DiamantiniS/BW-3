import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { iUser } from '../../models/i-user';
import { iPg } from '../../models/i-pg';
import { PgService } from '../../services/pg.service';
import { FavouritesService } from '../../services/favourites.service';

@Component({
  selector: 'app-single-pg',
  templateUrl: './single-pg.component.html',
  styleUrl: './single-pg.component.scss',
})
export class SinglePgComponent {
  @Input() pg!: iPg;

  currentUser!: iUser;
  liked: boolean = false;

  constructor(
    protected router: Router,
    private PgSvc: PgService,
    private FavortiteSvc: FavouritesService
  ) {}

  ngOnInit() {
    const userId = this.PgSvc.getUserId();

    this.FavortiteSvc.getFavouritePgs(userId).subscribe((favourites) => {
      favourites.forEach((fav) => {
        if (fav.idPersonaggio === this.pg.id) {
          this.liked = true;
        }
      });
    });
  }

  toggleFavourite(idPersonaggio: number) {
    //const userIdAgain = this.PgSvc.getUserId()
    this.liked = !this.liked;

    this.FavortiteSvc.toggleFavourite(idPersonaggio);
  }
}
