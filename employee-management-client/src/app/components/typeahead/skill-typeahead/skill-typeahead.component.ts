import { Component, OnInit } from '@angular/core';
import { Skill } from 'src/app/models/skill.model';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-skill-typeahead',
  templateUrl: './skill-typeahead.component.html',
  styleUrls: ['./skill-typeahead.component.scss']
})
export class SkillTypeaheadComponent implements OnInit {

  selected?: Skill;
  dropDownList?: Skill[];
  dropDown?: boolean;
  searchString?: string;
  
  constructor(private skillServices: SkillService) { /* TODO document why this constructor is empty */  }

  ngOnInit(): void {
    this.selected = undefined;
    this.dropDownList = [];
    this.dropDown = false;
    this.searchString = '';
  }

  onTypeaheadChanged(event: string) {
    this.skillServices.getByQuery(event).subscribe((x: Skill[])=>{
      this.dropDownList = x;
      console.log(this.dropDownList);
      if(this.searchString?.length === 0) {
        this.dropDownList = [];
      }
      if(this.dropDownList.length !== 0) {
        this.dropDown = true;
      } else {
        this.dropDown = false;
      }
    });
  }

  onDropDownItemClick(skill:Skill) {
    this.selected = skill;
    this.searchString = this.selected.skillName;
    this.dropDownList = [];
    this.dropDown = false;
  }

  onClearSelected() {
    this.selected = undefined;
    this.searchString = '';
    this.dropDownList = [];
    this.dropDown = false;
  }
}
