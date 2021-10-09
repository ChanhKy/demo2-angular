import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Skill } from "../model/skill";


const API_URL = `${environment.apiUrl2}`;


@Injectable({
  providedIn: 'root'
})

export class SkillService {
  constructor (private http : HttpClient) {}

  getAllSkill():Observable<Skill[]> {
    return this.http.get<Skill[]>(API_URL + '/list');
  }
}
