import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ISkill } from '../ISkill';
import { SkillService } from '../skill.service';
import { NotificationService } from '../../notification-service/notification.service';

@Component({
  selector: 'app-skill-form',
  templateUrl: './skill-form.component.html',
  styleUrls: ['./skill-form.component.scss'],
})
export class SkillFormComponent implements OnInit {
  constructor(
    public service: SkillService,

    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<SkillFormComponent>
  ) {}

  ngOnInit() {}

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit() {
    let found: boolean;
    if (this.service.form.valid) {
      console.log(this.service.form.value);
      this.service.insertSkill(this.service.form.value).subscribe(
        (data) => {
          this.notificationService.showSuccess(
            'Success',
            'Skill Added Successfully'
          );
          this.dialogRef.close(true);
        },
        (error) => {
          this.notificationService.showError(
            'Failure',
            'Skill Already Present'
          );
          this.dialogRef.close(false);
        }
      );
    }
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }
}
