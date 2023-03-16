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
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
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
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectFormComponent } from './project-details/project-form/project-form.component';
import { ProjectListComponent } from './project-details/project-list/project-list.component';
import { ProjectService } from './project-details/project.service';
import { EmployeeProjectDetailsComponent } from './employee-project-details/employee-project-details.component';
import { EmployeeProjectService } from './employee-project-details/EmployeeProjectService';
import { EditEmployeeComponent } from './components/employee/edit-employee/edit-employee.component';
import { ToastrModule } from 'ngx-toastr';
import { EmployeeProjectFormComponent } from './employee-project-details/employee-project-form/employee-project-form.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';

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
    NavbarComponent,
    ProjectDetailsComponent,
    ProjectFormComponent,
    ProjectListComponent,
    EmployeeProjectDetailsComponent,
    EditEmployeeComponent,
    EmployeeProjectFormComponent
  ],
  providers: [
    ClientService,
    SkillService,
    ProjectService,
    apiList,
    EmployeeProjectService,
  ],
  bootstrap: [AppComponent],
  // entryComponents: [SkillDetailsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatStepperModule,
    FormsModule,
    MatGridListModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatChipsModule,
    CommonModule,
    MaterialModule,
    ToastrModule.forRoot(),
  ],
})
export class AppModule {}
