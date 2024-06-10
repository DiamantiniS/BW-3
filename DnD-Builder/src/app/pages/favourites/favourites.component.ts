import { Component } from '@angular/core';
import { iFavourites } from '../../models/i-favourites';
import { iUser } from '../../models/i-user';
import { iPg } from '../../models/i-pg';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.scss'
})
export class FavouritesComponent {

  favouritesArray:iFavourites[] = []
  arrayPgs:iPg[] = []
  currentUser!:iUser

  pg!:iPg

  constructor(
    //Services
  ) {}

  /*ngOnInit() {
    const accessData = this.AuthSvc.getAccessData()
    if(!accessData) return
    this.currentUser = accessData.user
    const userId = accessData.user.id

    this.PgSvc.getFavouritePgs(userId).subscribe(favourites => {
      this.favouritesArray = favourites

      this.favouritesArray.forEach(favorite => {
        this.PgSvc.getPgById(favorite.idPersonaggio).subscribe(pg => this.arrayPgs.push(pg))
      })
    })

  }*/
}
