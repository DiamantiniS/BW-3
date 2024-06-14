import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { iUser } from '../models/i-user';
import { iPg } from '../models/i-pg';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';
  private pgUrl = 'http://localhost:3000/pg';

  constructor(private http: HttpClient) {}

  getUserProfile(userId: number): Observable<iUser> {
    return this.http.get<iUser>(`${this.apiUrl}/${userId}`);
  }

  saveUserProfile(userProfile: iUser): Observable<iUser> {
    return this.http.patch<iUser>(
      `${this.apiUrl}/${userProfile.id}`,
      userProfile
    );
  }

  getUserCharacters(userId: number): Observable<iPg[]> {
    return this.http.get<iPg[]>(`${this.pgUrl}?userId=${userId}`);
  }

  deleteUserCharacter(characterId: number): Observable<void> {
    return this.http.delete<void>(`${this.pgUrl}/${characterId}`);
  }
}
