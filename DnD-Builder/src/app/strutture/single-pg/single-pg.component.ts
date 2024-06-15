import { UserService } from './../../services/user.service';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { iUser } from '../../models/i-user';
import { iPg } from '../../models/i-pg';
import { PgService } from '../../services/pg.service';
import { FavouritesService } from '../../services/favourites.service';
import { iFavourites } from '../../models/i-favourites';

@Component({
  selector: 'app-single-pg',
  templateUrl: './single-pg.component.html',
  styleUrl: './single-pg.component.scss',
})
export class SinglePgComponent {
  @Input() pg!: iPg;
  @Input() arrayFavourites!: iFavourites[];

  currentUser!: iUser;
  deleted:boolean = false
  liked: boolean = false;
  pageFavourite: boolean = this.router.url === '/favourites';
  pageProfile: boolean = this.router.url === '/profile';
  pageShowdown: boolean = this.router.url === '/showdown';
  characters: iPg[] = [];

  constructor(
    protected router: Router,
    private PgSvc: PgService,
    private FavortiteSvc: FavouritesService,
    private UserSvc: UserService
  ) {}

  ngOnInit() {
    const userId = this.PgSvc.getUserId();

    this.arrayFavourites.forEach((fav) => {
      if (fav.idPersonaggio === this.pg.id) {
        this.liked = true;
      }
    });
    /*this.FavortiteSvc.getFavouritePgs(userId).subscribe((favourites) => {
      favourites.forEach((fav) => {
        if (fav.idPersonaggio === this.pg.id) {
          this.liked = true;
        }
      });
    });*/
  }

  toggleFavourite(idPersonaggio: number) {
    //const userIdAgain = this.PgSvc.getUserId()
    this.liked = !this.liked;

    this.FavortiteSvc.toggleFavourite(idPersonaggio);
  }

  deleteCharacter(characterId: number) {
    this.UserSvc.deleteUserCharacter(characterId).subscribe({
      next: () => {
        console.log(`Character with ID ${characterId} deleted`);
        this.deleted = true
        this.characters = this.characters.filter((c) => c.id !== characterId);
      },
      error: (err) => {
        console.error('Error deleting character', err);
      },
    });
  }
}
