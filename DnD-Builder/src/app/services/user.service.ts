import { Injectable } from '@angular/core';
import { iUser } from '../models/i-user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  getUserProfile(userId: number): Observable<iUser> {
    return this.http.get<iUser>(`${this.apiUrl}/${userId}`);
  }

  saveUserProfile(userProfile: iUser): Observable<iUser> {
    return this.http.put<iUser>(`${this.apiUrl}/${userProfile.id}`, userProfile);
  }
}
