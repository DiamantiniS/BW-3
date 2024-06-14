import { Component, OnInit } from '@angular/core';
import { iUser } from '../../models/i-user';
import { iPg } from '../../models/i-pg';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { iFavourites } from '../../models/i-favourites';
import { FavouritesService } from '../../services/favourites.service';
import { PgService } from '../../services/pg.service';
import { iClasse } from '../../models/i-classe';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  favouritesArray: iFavourites[] = [];
  classPgArray: iClasse[] = [];
  arrayPgs: iPg[] = [];
  user: iUser | null = null;
  characters: iPg[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private FavortiteSvc: FavouritesService,
    private PgSvc: PgService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {

    this.PgSvc.getClasses().subscribe(classes => {
      this.classPgArray = classes
      console.log('classi',this.classPgArray)
    })

    const accessData = this.authService.getAccessData();
    if (!accessData) return;
    this.user = accessData.user;
    const userId = accessData.user.id;

    this.FavortiteSvc.getFavouritePgs(userId).subscribe((favourites) => {
      this.favouritesArray = favourites;

      this.favouritesArray.forEach(favorite => {
        this.PgSvc.getById(favorite.idPersonaggio).subscribe(pg => {
          this.FavortiteSvc.addClassToPg(pg, this.classPgArray)
          this.arrayPgs.push(pg)
        })
      })
    });

    this.userService.getUserProfile(userId).subscribe({
      next: (user) => {
        this.user = user;
        this.profileForm.patchValue(user);
      },
      error: (err) => {
        console.error('Error fetching user profile', err);
      },
    });

    this.userService.getUserCharacters(userId).subscribe({
      next: (characters) => {
        characters.forEach(character => {
          this.FavortiteSvc.addClassToPg(character, this.classPgArray);
            this.characters.push(character);
        })
      },
      error: (err) => {
        console.error('Error fetching user characters', err);
      },
    });

  }

  onSubmit() {
    if (this.profileForm.valid) {
      const userProfile: iUser = {
        ...this.profileForm.value,
        id: this.user!.id,
      };
      delete userProfile.password
      this.userService.saveUserProfile(userProfile).subscribe({
        next: (response) => {
          console.log('Form Submitted', response);
        },
        error: (err) => {
          console.error('Error saving user profile', err);
        },
      });
    }
  }

  createCharacter() {
    this.router.navigate(['/builder/0']);
  }
}
