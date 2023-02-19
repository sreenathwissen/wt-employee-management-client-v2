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
import { ClientListComponent } from './client-details/client-list/client-list.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';

import { ClientDetailsComponent } from './client-details/client-details.component';
import { ClientFormComponent } from './client-details/client-form/client-form.component';
import { ClientService } from './client-details/client.service';
import { SkillDetailsComponent } from './skill-details/skill-details.component';
import { SkillFormComponent } from './skill-details/skill-form/skill-form.component';
import { SkillListComponent } from './skill-details/skill-list/skill-list.component';
import { SkillService } from './skill-details/skill.service';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    CreateEmployeeComponent,
    ClientListComponent,
    SkillListComponent,
    ClientDetailsComponent,
    ClientFormComponent,
    SkillDetailsComponent,
    SkillFormComponent,
    NavbarComponent
  ],
    providers: [ClientService, SkillService,apiList ],
  bootstrap: [AppComponent],
  // entryComponents: [SkillDetailsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, 
    CommonModule,
    MaterialModule,
    BrowserAnimationsModule
  ]
})
export class AppModule { }
