import { Injectable } from '@angular/core';
import { iClasse } from '../models/i-classe';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { iMossa } from '../models/i-mossa';

@Injectable({
  providedIn: 'root',
})
export class BuilderService {
  classiUrl = 'http://localhost:3000/classe';
  mosseUrl = 'http://localhost:3000/mosse';
  constructor(private http: HttpClient) {}

  getAllClasses(): Observable<iClasse[]> {
    return this.http.get<iClasse[]>(this.classiUrl);
  }

  getMosse(): Observable<iMossa[]> {
    return this.http.get<iMossa[]>(this.mosseUrl);
  }
}
