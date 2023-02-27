import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmployeeComponent } from './components/employee/create-employee/create-employee.component';
import { EmployeesComponent } from './components/employee/employees/employees.component';  
import { ClientDetailsComponent } from './client-details/client-details.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { SkillDetailsComponent } from './skill-details/skill-details.component';

const routes: Routes = [
  {
    path: 'employees',
    component: EmployeesComponent
  },
  {
    path: 'create-employee',
    component: CreateEmployeeComponent
  },
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
