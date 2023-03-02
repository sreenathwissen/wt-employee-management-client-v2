import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/notification-service/notification.service';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {

  constructor(public service: ClientService,public notificationService: NotificationService,
    public dialogRef: MatDialogRef<ClientFormComponent>) { }

  ngOnInit() {

  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit() {
    let found: boolean;
    if (this.service.form.valid) {
      console.log(this.service.form.value)
      this.service.insertClient(this.service.form.value).subscribe(
        (data) => {
          this.notificationService.showSuccess(
            'Success',
            'Client Added Successfully'
          );
          this.dialogRef.close(true);
        },
        (error) => {
          this.notificationService.showError(
            'Failure',
            'Client Already Present'
          );
          this.dialogRef.close(false);
        }
      );
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.onClose();
    }
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

}
