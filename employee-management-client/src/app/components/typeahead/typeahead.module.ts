import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ClientTypeaheadComponent } from './client-typeahead/client-typeahead.component';
import { EmployeeTypeaheadComponent } from './employee-typeahead/employee-typeahead.component';
import { ProjectTypeaheadComponent } from './project-typeahead/project-typeahead.component';
import { SkillTypeaheadComponent } from './skill-typeahead/skill-typeahead.component';

@NgModule({
  declarations: [
    EmployeeTypeaheadComponent,
    ProjectTypeaheadComponent,
    ClientTypeaheadComponent,
    SkillTypeaheadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    TypeaheadModule.forRoot(),
  ],
  exports: [
    EmployeeTypeaheadComponent,
    ProjectTypeaheadComponent,
    ClientTypeaheadComponent,
    SkillTypeaheadComponent
  ]
})
export class GTypeaheadModule {}