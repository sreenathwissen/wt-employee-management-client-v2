import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateEmployeeComponent } from '../components/employee/create-employee/create-employee.component';
import { EmployeesComponent } from '../components/employee/employees/employees.component';
import { EmployeeService } from '../services/employee.service';
import { SkillService } from '../services/skill.service';
import { MaterialModule } from './material.module';
import { TypeaheadSearchComponent } from '../shared/components/typeahead-search/typeahead-search.component';

@NgModule({
  declarations: [EmployeesComponent, CreateEmployeeComponent, TypeaheadSearchComponent],
  providers: [EmployeeService, SkillService],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatStepperModule,
  ],
})
export class EmployeeModule {}
