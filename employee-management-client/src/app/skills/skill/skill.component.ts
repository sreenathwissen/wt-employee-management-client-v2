import { Component, OnInit } from '@angular/core';
import { SkillService } from 'src/app/shared/skill.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {

  constructor(public service: SkillService,
    public dialogRef: MatDialogRef<SkillComponent>) { }

  ngOnInit() {
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit() {
    if (this.service.form.valid) {
      console.log(this.service.form.value)
      this.service.insertSkill(this.service.form.value).subscribe(data => {

        console.log(data);

      });
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
