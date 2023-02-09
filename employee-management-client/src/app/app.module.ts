import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateEmployeeComponent } from './components/employee/create-employee/create-employee.component';
import { EmployeesComponent } from './components/employee/employees/employees.component';
import { apiList } from './services/https/api-list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{MatTabsModule} from '@angular/material/tabs'

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    CreateEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    apiList
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
