import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { ClientFormComponent } from './client-details/client-form/client-form.component';
import { ClientListComponent } from './client-details/client-list/client-list.component';
import { ClientService } from './client-details/client.service';
import { EditEmployeeComponent } from './components/employee/edit-employee/edit-employee.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EmployeeProjectDetailsComponent } from './employee-project-details/employee-project-details.component';
import { EmployeeProjectFormComponent } from './employee-project-details/employee-project-form/employee-project-form.component';
import { EmployeeProjectService } from './employee-project-details/EmployeeProjectService';
import { EmployeeModule } from './module/employee.module';
import { HomeModule } from './module/home.module';
import { MaterialModule } from './module/material.module';
import { SkillModule } from './module/skill.module';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectFormComponent } from './project-details/project-form/project-form.component';
import { ProjectListComponent } from './project-details/project-list/project-list.component';
import { ProjectService } from './project-details/project.service';
import { apiList } from './services/https/api-list';

@NgModule({
  declarations: [
    AppComponent,
    ClientDetailsComponent,
    ClientFormComponent,
    ClientListComponent,
    NavbarComponent,
    ProjectDetailsComponent,
    ProjectFormComponent,
    ProjectListComponent,
    EmployeeProjectDetailsComponent,
    EditEmployeeComponent,
    EmployeeProjectFormComponent,
  ],
  providers: [ClientService, ProjectService, apiList, EmployeeProjectService],
  bootstrap: [AppComponent],
  // entryComponents: [SkillDetailsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    EmployeeModule,
    FormsModule,
    MatGridListModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MaterialModule,
    HomeModule,
    SkillModule,
    ToastrModule.forRoot(),
  ],
  exports: [],
})
export class AppModule {}
