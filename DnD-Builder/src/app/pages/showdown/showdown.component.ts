import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { iPg } from '../../models/i-pg';
import { iUser } from '../../models/i-user';
import { iFavourites } from '../../models/i-favourites';
import { iClasse } from '../../models/i-classe';

import { PgService } from '../../services/pg.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../auth/auth.service';
import { FavouritesService } from '../../services/favourites.service';

@Component({
  selector: 'app-showdown',
  templateUrl: './showdown.component.html',
  styleUrls: ['./showdown.component.scss'],
})
export class ShowdownComponent implements OnInit {
  profileForm!: FormGroup;
  user: iUser | null = null;
  characters: iPg[] = [];

  pg!: iPg;
  favouritesArray: iFavourites[] = [];
  arrayPgs: iPg[] = [];
  classPgArray: iClasse[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private pgService: PgService,
    private favouritesService: FavouritesService
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    const accessData = this.authService.getAccessData();
    if (!accessData) return;
    this.user = accessData.user;
    const userId = accessData.user.id;

    this.favouritesService.getFavouritePgs(userId).subscribe((favourites) => {
      this.favouritesArray = favourites;
    });

    if (accessData) {

      this.pgService.getClasses().subscribe({
        next: (classes) => {
          this.classPgArray = classes;
        },
        error: (err) => {
          console.error('Errore durante il recupero delle classi', err);
        },
      });

      this.userService.getUserProfile(userId).subscribe({
        next: (user) => {
          this.user = user;
        },
        error: (err) => {
          console.error('Errore durante il recupero del profilo utente', err);
        },
      });

      this.userService.getUserCharacters(userId).subscribe({
        next: (characters) => {
          characters.forEach(character => {
            this.favouritesService.addClassToPg(character, this.classPgArray);
              this.characters.push(character);
          })
        },
        error: (err) => {
          console.error(
            'Errore durante il recupero dei personaggi utente',
            err
          );
        },
      });

      this.favouritesService.getFavouritePgs(userId).subscribe({
        next: (favourites) => {
          this.favouritesArray = favourites;
          this.caricaPersonaggiPreferiti();
        },
        error: (err) => {
          console.error(
            'Errore durante il recupero dei personaggi preferiti',
            err
          );
        },
      });
    } else {
      console.error('Nessun utente attualmente connesso.');
    }
  }

  caricaPersonaggiPreferiti() {
    this.favouritesArray.forEach((favorite) => {
      this.pgService.getById(favorite.idPersonaggio).subscribe({
        next: (pg) => {
          this.favouritesService.addClassToPg(pg, this.classPgArray);
          this.arrayPgs.push(pg);
        },
        error: (err) => {
          console.error(
            `Errore durante il recupero del personaggio con ID ${favorite.idPersonaggio}`,
            err
          );
        },
      });
    });
  }
}
