import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iFavourites } from '../models/i-favourites';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  favouritesUrl:string ='http://localhost:3000/favoriti'

  constructor(
    private http:HttpClient
  ) { }

  getFavouritePgs(idUser:number) {
    return this.http.get<iFavourites[]>(`${this.favouritesUrl}?idUser=${idUser}`)
  }

  // Ricerca preferito con idUser e idPersonaggio, restituisce un array ma dovrebbe esserci solo un risultato dal backend
  getFavouriteSinglePg(idPersonaggio:number,idUser:number) {
    return this.http.get<iFavourites[]>(`${this.favouritesUrl}?idPersonaggio=${idPersonaggio}&idUser=${idUser}`)
  }

  createFavourite(idPersonaggio:number,idUser:number) {
    const newFav:Partial<iFavourites> = {
      idPersonaggio: idPersonaggio,
      idUser: idUser
    }
    //swal("Aggiunto ai preferiti!", "", "success"); Eventuale Sweet alert per aggiunta/rimozione preferiti
    return this.http.post<iFavourites>(this.favouritesUrl, newFav)
  }

  deleteFavourite(id:number){
    //swal("Rimosso dai preferiti", "", "warning");
    return this.http.delete(`${this.favouritesUrl}/${id}`)
  }
}
