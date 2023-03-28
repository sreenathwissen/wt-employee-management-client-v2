import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HomeComponent } from 'src/app/components/home/home.component';



@NgModule({
  declarations: [
    HomeComponent,
    // SkillListComponent
  ],
  providers: [],
  imports: [
    CommonModule,
    MatCardModule,
    // FormsModule,
    // MaterialModule
  ],
  exports: [
    // SkillListComponent
  ]
})
export class HomeModule { }
