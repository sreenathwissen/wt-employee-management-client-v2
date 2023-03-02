import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {

  constructor(public service: ClientService,
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
      this.service.insertClient(this.service.form.value).subscribe(data => {

        console.log(data);
        this.service.clientList.forEach((client, index) => {
          if (Array.isArray(data) && client.clientId === data[0].clientId) {
            this.service.clientList[index] = data[0];
            this.service.clientList = [...this.service.clientList];
            found = true;
          }
        });
        if (!found && Array.isArray(data))
          this.service.clientList = [...this.service.clientList, data[0]];

      },
      (err) => {
        if (err.status === 400) alert(err.error[0].errorMessage);
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
