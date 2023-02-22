import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientListComponent } from './client-details/client-list/client-list.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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

@NgModule({
  declarations: [
    AppComponent,
    ClientListComponent,
    SkillListComponent,
    ClientDetailsComponent,
    ClientFormComponent,
    SkillDetailsComponent,
    SkillFormComponent,
    NavbarComponent,
    ProjectDetailsComponent,
    ProjectFormComponent,
    ProjectListComponent
  ],
  providers: [ClientService, SkillService, ProjectService
  ],
  bootstrap: [AppComponent],
  // entryComponents: [SkillDetailsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ]
})
export class AppModule { }
