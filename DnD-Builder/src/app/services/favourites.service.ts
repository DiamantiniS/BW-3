import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iFavourites } from '../models/i-favourites';
import { iPg } from '../models/i-pg';
import { AuthService } from '../auth/auth.service';
import { iClasse } from '../models/i-classe';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  favouritesUrl: string = 'http://localhost:3000/favoriti';

  constructor(private http: HttpClient, private AuthSvc: AuthService) {}

  getFavouritePgs(idUser: number) {
    return this.http.get<iFavourites[]>(
      `${this.favouritesUrl}?idUser=${idUser}`
    );
  }

  // Ricerca preferito con idUser e idPersonaggio, restituisce un array ma dovrebbe esserci solo un risultato dal backend
  getFavouriteSinglePg(idPersonaggio: number, idUser: number) {
    return this.http.get<iFavourites[]>(
      `${this.favouritesUrl}?idPersonaggio=${idPersonaggio}&idUser=${idUser}`
    );
  }

  createFavourite(idPersonaggio: number, idUser: number) {
    const newFav: Partial<iFavourites> = {
      idPersonaggio: idPersonaggio,
      idUser: idUser,
    };
    //swal("Aggiunto ai preferiti!", "", "success"); Eventuale Sweet alert per aggiunta/rimozione preferiti
    return this.http.post<iFavourites>(this.favouritesUrl, newFav);
  }

  deleteFavourite(id: number) {
    //swal("Rimosso dai preferiti", "", "warning");
    return this.http.delete(`${this.favouritesUrl}/${id}`);
  }

  toggleFavourite(idPersonaggio: number) {
    const accessData = this.AuthSvc.getAccessData();
    if (!accessData) return;
    const userId: number = accessData.user.id;

    this.getFavouriteSinglePg(idPersonaggio, userId).subscribe((fav) => {
      if (fav.length) {
        this.deleteFavourite(fav[0].id).subscribe();
      } else {
        this.createFavourite(idPersonaggio, userId).subscribe();
      }
    });
  }

  addClassToPg(pg: iPg, array2: iClasse[]): iPg {
    let classe = array2.find((classe) => classe.id == pg.classeId);
    pg.classe = classe;
    return pg;
  }

  /* INUTILIZZATO
  isFavourite(pg: iPg, arrayFavourites:iFavourites[]): boolean {
    return arrayFavourites.some((fav) => fav.idPersonaggio === pg.id);
  }*/

  /*isFavourite(pg: iPg): boolean {
    return this.favouritesArray.some((fav) => fav.idPersonaggio === pg.id);
  }*/

  // Metodo (alternativo) per mescolamento dati di array (2 parametri array)
  /*addClass(array1:iPg[], array2:iClasse[]):iPg[] {
    array1 = array1.map(pg => {
      let classe = array2.find(classe => classe.id == pg.classeId
      )
      pg.classe = classe
      return pg
    })
    return array1
  }*/
}
