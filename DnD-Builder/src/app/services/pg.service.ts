import { Observable } from 'rxjs';
import { iPg } from './../models/i-pg';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { iClasse } from '../models/i-classe';
import { iUser } from '../models/i-user';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root',
})
export class PgService {
  apiUrl = 'http://localhost:3000/pg';
  classUrl = 'http://localhost:3000/classe';

  constructor(private http: HttpClient, private AuthSvc: AuthService) {}

  getAll(): Observable<iPg[]> {
    return this.http.get<iPg[]>(this.apiUrl);
  }
  create(newPg: Partial<iPg>): Observable<iPg> {
    return this.http.post<iPg>(this.apiUrl, newPg);
  }
  edit(pg: Partial<iPg>): Observable<iPg> {
    return this.http.put<iPg>(`${this.apiUrl}/${pg.id}`, pg);
  }
  getById(id: number): Observable<iPg> {
    return this.http.get<iPg>(`${this.apiUrl}/${id}`);
  }
  getClasses(): Observable<iClasse[]> {
    return this.http.get<iClasse[]>(this.classUrl);
  }
  getClassbyId(classId: number): Observable<iClasse> {
    return this.http.get<iClasse>(`${this.classUrl}/${classId}`);
  }

  getUserId(): number {
    const accessData = this.AuthSvc.getAccessData()
    if(!accessData) return 0
    const userId = accessData.user.id
    return userId
  }
}
