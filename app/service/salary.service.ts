import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Salary } from '../model/salary';

const API_URL = `${environment.apiUrlSalary}`;

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  constructor(private http: HttpClient ) { }

  saveSalary(salary: Salary): Observable<Salary> {
    return this.http.post<Salary>(API_URL + '/create', salary);
  }

  getAll(): Observable<Salary> {
    return this.http.get<Salary>(API_URL + '/list');
  }
}
