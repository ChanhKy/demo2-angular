import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HeSoTangCa } from '../model/heSoTangCa';

const API_URL = `${environment.apiUrlHeSoTangCa}`;

@Injectable({
  providedIn: 'root'
})
export class HesotangcaService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<HeSoTangCa> {
    return this.http.get<HeSoTangCa>(API_URL + '/list');
  }
}
