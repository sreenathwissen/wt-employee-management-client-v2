import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { SkillDetailsComponent } from './skill-details/skill-details.component';

const routes: Routes = [
  //{path : 'employee', component: 'EmployeeDetailsComponent'}
  { path: 'project', component: ProjectDetailsComponent },
  { path: 'skill', component: SkillDetailsComponent },
  { path: 'client', component: ClientDetailsComponent },
  //{path : 'help', component: 'HelpComponent'},
  //{path : 'support', component: 'SupportComponent'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
