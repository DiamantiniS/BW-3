import { Component, OnInit } from '@angular/core';

import { iUser } from '../../models/i-user';
import { iPg } from '../../models/i-pg';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  user: iUser | null = null;
  characters: iPg[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

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
    } else {
      console.error('No user is currently logged in.');
    }
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const userProfile: iUser = {
        ...this.profileForm.value,
        id: this.user!.id,
      };
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

  deleteCharacter(characterId: number) {
    this.userService.deleteUserCharacter(characterId).subscribe({
      next: () => {
        console.log(`Character with ID ${characterId} deleted`);
        this.characters = this.characters.filter((c) => c.id !== characterId);
      },
      error: (err) => {
        console.error('Error deleting character', err);
      },
    });
  }

  createCharacter() {
    this.router.navigate(['/builder/0']);
  }
}
