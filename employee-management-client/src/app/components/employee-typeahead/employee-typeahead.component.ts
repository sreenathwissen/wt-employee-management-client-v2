import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, mergeMap, startWith, switchMap } from 'rxjs/operators';
import { Constants } from 'src/app/shared/constants/Constants';

@Component({
  selector: 'app-employee-typeahead',
  templateUrl: './employee-typeahead.component.html',
  styleUrls: ['./employee-typeahead.component.scss']
})
export class EmployeeTypeaheadComponent implements OnInit {
  
  searchControl = new FormControl();
  filteredOptions!: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      mergeMap(value => {
        // Call the API to get the options and filter them based on the input value
        return this.http.get<{responseData: any[]}>(Constants.BASE_URL + Constants.EMPLOYEE_URL + Constants.SEARCH_EMPLOYEE + value).pipe(
          map(response => 
            {
              return response.responseData.filter(option => option.name.toLowerCase().includes(value.toLowerCase()))
            }
            )
        );
      })
    );
  } 

}
