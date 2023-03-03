import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProjectTypeahead } from "../components/typeahead/project-typeahead/project-typeahead.component";
import { GeneralService } from "./general.service";

@Injectable({
    providedIn: 'root'
})
export class ProjectService implements GeneralService {
    constructor(private _http: HttpClient) { /* TODO document why this constructor is empty */ }
    getAll() {
        throw new Error("Method not implemented.");
    }
    getById(id: number) {
        throw new Error("Method not implemented.");
    }
    getByQuery(query: string): Observable<ProjectTypeahead[]> {
        const queryString = 'http://localhost:8080/api/project/search?searchString='+query;
        return this._http.get<ProjectTypeahead[]>(queryString, { responseType: 'json' });
    }
}