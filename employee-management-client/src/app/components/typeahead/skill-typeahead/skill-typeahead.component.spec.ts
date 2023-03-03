import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillTypeaheadComponent } from './skill-typeahead.component';

describe('SkillTypeaheadComponent', () => {
  let component: SkillTypeaheadComponent;
  let fixture: ComponentFixture<SkillTypeaheadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillTypeaheadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillTypeaheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
