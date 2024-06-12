import { Component, OnInit } from '@angular/core';

import { iUser } from '../../models/i-user';
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

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.profileForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    const userId = 1;
    this.userService.getUserProfile(userId).subscribe((user) => {
      this.user = user;
      this.profileForm.patchValue(user);
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const userProfile: iUser = {
        ...this.profileForm.value,
        id: this.user!.id,
      };
      this.userService.saveUserProfile(userProfile).subscribe((response) => {
        console.log('Form Submitted', response);
      });
    }
  }
}
