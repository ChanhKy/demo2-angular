import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { Employee } from "../model/employee";

import { on } from "process";
import { SelectorMatcher } from "@angular/compiler";
import { strictEqual } from "assert";

const API_URL = `${environment.apiUrl1}`;

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  constructor(private http: HttpClient) { }

  getPaging(object): Observable<any>{
    return this.http.get(`${API_URL}/list`, {
      params: {
        search: object.search,
        pageSize: object.pageSize,
        pageNumber: object.pageNumber,
        sortBy: object.sortBy,
        sortDirection: object.sortDirection
      }
    })
  }

  // getPaging(object?): Observable<any>{
  //   if(object) {
  //     if(object.search){
  //       return this.http.get(`${API_URL}/list?search=${object.search}&pageSize=${object.pageSize}&pageNumber=${object.pageNumber}`)
  //     }
  //     return this.http.get(`${API_URL}/list?pageSize=${object.pageSize}&pageNumber=${object.pageNumber}`)
  //   }
  //   return this.http.get(`${API_URL}/list`);
  // }

  getAll1(search:string, page:number): Observable<any> {
    return this.http.get<any>(API_URL + '/list' + '?search=' + search + '&page=' + page);
  }

  findAllEmployeeByDepartmentId(id: number): Observable <any> {
    return this.http.get<any>(`${API_URL}/list-department-id/${id}`);
  }

  findAllFlagFalse() :Observable<Employee> {
    return this.http.get<Employee>(`${API_URL}/list-false`);
  }

  getEmployeeByName(name:string) :Observable<Employee> {
    return this.http.get<Employee>(`${API_URL}/get/${name}`);
  }

  deleteEmployee(id: number): Observable<Employee> {
    console.log("id o servicce" + id);
    return this.http.delete<Employee>(`${API_URL}/remove/${id}`);
  }

  deleteEmployeeByUpdate(employee: Employee):Observable<Employee>  {
    return this.http.put<Employee>(`${API_URL}/delete/${employee.employeeId}`, employee);
  }

  getEmployeeByFlagAndId(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${API_URL}/view/${id}`);
  }

  saveEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(API_URL + '/create', employee);
  }

  findById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${API_URL}/edit/${id}`);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${API_URL}/update/${employee.employeeId}`, employee);
  }
}
