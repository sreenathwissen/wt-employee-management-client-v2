import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/notification-service/notification.service';
import { IProject } from 'src/app/project-details/IProject';
import { ProjectService } from 'src/app/project-details/project.service';
import { EmployeeProjectService } from '../EmployeeProjectService';


@Component({
  selector: 'app-employee-project-form',
  templateUrl: './employee-project-form.component.html',
  styleUrls: ['./employee-project-form.component.scss']
})
export class EmployeeProjectFormComponent implements OnInit {

  projects: IProject[] = [];


  isUpdate!: boolean;

  constructor(
    public service: EmployeeProjectService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<EmployeeProjectFormComponent>,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.projectService.getProjectData().subscribe(
      list => {
        console.log(list)
        this.projects = list
      }
    );
  }

  onSubmit() {
    let found: boolean;
    if (this.service.employeeProjectForm.valid) {
      console.log(this.service.employeeProjectForm.value);
      this.service.insertEmpProj(this.service.employeeProjectForm.value).subscribe(
        (data) => {
          console.log(data);


          found = true;
          this.notificationService.showSuccess(
            'Success',
            'Employee Project added Successfully'
          );
          this.onClear()
          this.dialogRef.close(true);
        },
        (err) => {
          if (err.status === 400) {
            this.notificationService.showError(
              'Failure',
              'Already Present'
            );
            this.dialogRef.close(false);
          }
        }
      )
    };
    this.onClear()
    this.service.form.reset();
  }

  onClear() {
    this.service.employeeProjectForm.reset();
    this.service.initializeFormGroup();
  }

  onClose() {
    this.onClear()
    this.service.employeeProjectForm.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }
}

