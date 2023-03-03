import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EmployeeTypeahead } from "../components/typeahead/employee-typeahead/employee-typeahead.component";
import { Employee } from "../models/employee.model";
import { GeneralService } from "./general.service";

@Injectable({
    providedIn: 'root'
})
export class EmployeeService implements GeneralService {
    constructor(private _http: HttpClient) { /* TODO document why this constructor is empty */ }
    getByQuery(query: string): Observable<EmployeeTypeahead[]> {
        const queryString = 'http://localhost:8080/api/employee/search?searchString='+query;
        return this._http.get<EmployeeTypeahead[]>(queryString, { responseType: 'json' });
    }
    getAll() {
        const queryString = 'http://localhost:8080/api/employee/employees';
        return this._http.get<Employee[]>(queryString);
    }
    getById(id: number) {
        throw new Error("Method not implemented.");
    }
    
}