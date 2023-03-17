import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SkillDetailsComponent } from 'src/app/components/skill-details/skill-details.component';
import { SkillFormComponent } from 'src/app/components/skill-details/skill-form/skill-form.component';
import { SkillListComponent } from 'src/app/components/skill-details/skill-list/skill-list.component';
import { MaterialModule } from 'src/app/module/material.module';
import { SkillService } from 'src/app/services/skill.service';



@NgModule({
  declarations: [
    SkillDetailsComponent,
    SkillListComponent,
    SkillFormComponent
  ],
  providers: [
    SkillService
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
  ]
})
export class SkillModule { }
