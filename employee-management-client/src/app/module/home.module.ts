import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from 'src/app/components/home/home.component';



@NgModule({
  declarations: [
    HomeComponent,
    // SkillListComponent
  ],
  providers: [],
  imports: [
    CommonModule,
    // FormsModule,
    // MaterialModule
  ],
  exports: [
    // SkillListComponent
  ]
})
export class HomeModule { }
