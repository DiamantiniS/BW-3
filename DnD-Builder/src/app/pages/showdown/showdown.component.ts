import { Component } from '@angular/core';
import { iPg } from '../../models/i-pg';
import { PgService } from '../../services/pg.service';
import { iUser } from '../../models/i-user';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { iFavourites } from '../../models/i-favourites';
import { FavouritesService } from '../../services/favourites.service';
import { iClasse } from '../../models/i-classe';

@Component({
  selector: 'app-showdown',
  templateUrl: './showdown.component.html',
  styleUrl: './showdown.component.scss'
})
export class ShowdownComponent {
  profileForm!: FormGroup;
  user: iUser | null = null;
  characters: iPg[] = [];




  pg!:iPg
  favouritesArray:iFavourites[] = []
  arrayPgs:iPg[] = []
  classPgArray:iClasse[] = []
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private PgSvc: PgService,
    private FavortiteSvc:FavouritesService
  ){}
  ngOnInit(): void {
    const accessData = this.authService.getAccessData();
    console.log('Access Data:', accessData); // Debugging line
    if (accessData) {
      const userId = accessData.user.id;
      console.log('User ID:', userId); // Debugging line
      this.userService.getUserProfile(userId).subscribe({
        next: (user) => {
          console.log('Fetched User:', user); // Debugging line
          this.user = user;
          this.profileForm.patchValue(user);
        },
        error: (err) => {
          console.error('Error fetching user profile', err);
        },
      });

      this.userService.getUserCharacters(userId).subscribe({
        next: (characters) => {
          console.log('Fetched Characters:', characters); // Debugging line
          this.characters = characters;
        },
        error: (err) => {
          console.error('Error fetching user characters', err);
        },
      });

    this.PgSvc.getClasses().subscribe(classes => {
      this.classPgArray = classes
      console.log(this.classPgArray)
    })

    this.FavortiteSvc.getFavouritePgs(userId).subscribe(favourites => {
      this.favouritesArray = favourites

      this.favouritesArray.forEach(favorite => {
        this.PgSvc.getById(favorite.idPersonaggio).subscribe(pg => {
          this.FavortiteSvc.addClassToPg(pg, this.classPgArray)
          this.arrayPgs.push(pg)
        })
      })
    })
  }
  }
}
