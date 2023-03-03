import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Skill } from "../models/skill.model";
import { GeneralService } from "./general.service";

@Injectable({
    providedIn: 'root'
})
export class SkillService implements GeneralService {
    constructor(private _http: HttpClient) { /* TODO document why this constructor is empty */ }
    public getByQuery(query: string) {
        const queryString = 'http://localhost:8080/api/skill/search?skill='+query;
        return this._http.get<Skill[]>(queryString);
    }
    public getAll() {
        const queryString = 'http://localhost:8080/api/skill';
        return this._http.get<Skill[]>(queryString);        
    }
    public getById(id: number) {
        const queryString = 'http://localhost:8080/api/skill/'+id;
        return this._http.get<Skill>(queryString);
    }
    public saveSkill(skill: Skill) {
        return this.saveSkills([skill]);
    }
    public saveSkills(skills: Skill[]) {
        const queryString = 'http://localhost:8080/api/skill';
        const headers = { 'content-type': 'application/json' };
        const body = JSON.stringify(skills);
        return this._http.post(queryString, body, { 'headers': headers });
    }
    // The Following Code needs Conformation from Backend
    /* public deleteSkill(id: number) {
        const queryString = 'http://localhost:8080/api/skill/deleteEmployeeSkill?employeeSkillId='+id;
        return this._http.delete(queryString);
    } */
}