import { iMossa } from './../../models/i-mossa';
import { Component } from '@angular/core';
import { iFavourites } from '../../models/i-favourites';
import { iUser } from '../../models/i-user';
import { iPg } from '../../models/i-pg';
import { FavouritesService } from '../../services/favourites.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.scss'
})
export class FavouritesComponent {

  mossa:iMossa = {id:1, nome: 'fendente', danno: 15, descrizione:'è un fendente'}

  pg:iPg = {id:1, name:'Pippo Fortissimo', img:'https://www.dumpaday.com/wp-content/uploads/2019/08/the-random-pics-495.jpg', classe: {id:1, name:'guerriero', cA: 5, pf: 80, mossa1:this.mossa, mossa2:this.mossa, mossa3:this.mossa}, forza: 10, dext:14, int:4 , cos:7}

  favouritesArray:iFavourites[] = []
  arrayPgs:iPg[] = [this.pg]
  currentUser!:iUser

  constructor(
    private FavortiteSvc:FavouritesService
  ) {}

  /*ngOnInit() {
    const accessData = this.AuthSvc.getAccessData()
    if(!accessData) return
    this.currentUser = accessData.user
    const userId = accessData.user.id

    this.FavortiteSvc.getFavouritePgs(userId).subscribe(favourites => {
      this.favouritesArray = favourites

      this.favouritesArray.forEach(favorite => {
        this.PgSvc.getPgById(favorite.idPersonaggio).subscribe(pg => this.arrayPgs.push(pg))
      })
    })

  }*/
}
