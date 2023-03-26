import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/module/material.module';
import { EmployeeTypeaheadComponent } from '../components/employee-typeahead/employee-typeahead.component';



@NgModule({
  declarations: [
    EmployeeTypeaheadComponent
  ],
  providers: [
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class TypeaheadModule { }
