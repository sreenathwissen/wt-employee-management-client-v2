import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IEmployee } from '../employee/employees/IEmployee';
import { IEmployeeSearch } from './IEmployeeSearch';

@Injectable({
  providedIn: 'root',
})
export class EmployeeSearchService {
  private apiUrl = 'http://localhost:8080/api/employee/search';

  constructor(private http: HttpClient) {}

  searchEmployees(searchString: string): Observable<IEmployeeSearch[]> {
    if (!searchString.trim()) {
      return of([]);
    }
    const params = new HttpParams().set('searchString', searchString);
    return this.http.get<IEmployee[]>(this.apiUrl, { params }).pipe(
      map((employees: IEmployeeSearch[]) => {
        if (Array.isArray(employees)) {
          // Add this check
          return employees.filter((employee: IEmployeeSearch) => {
            const searchQuery = searchString.toString().toLowerCase();
            return (
              employee.empId.toString().indexOf(searchQuery) !== -1 ||
              employee.firstName.toLowerCase().indexOf(searchQuery) !== -1 ||
              employee.email.toLowerCase().indexOf(searchQuery) !== -1
            );
          });
        } else {
          return [];
        }
      })
    );
  }
}
