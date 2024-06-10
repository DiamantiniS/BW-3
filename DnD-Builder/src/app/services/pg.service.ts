import { Observable } from 'rxjs';
import { iPg } from './../models/i-pg';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PgService {
  apiUrl = 'http://localhost:3000/pg';
  constructor(private http: HttpClient) {}

  getAll(): Observable<iPg[]> {
    return this.http.get<iPg[]>(this.apiUrl);
  }
  getById(id: number): Observable<iPg> {
    return this.http.get<iPg>(`${this.apiUrl}/${id}`);
  }
}
