import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientTypeaheadComponent } from './client-typeahead.component';

describe('ClientTypeaheadComponent', () => {
  let component: ClientTypeaheadComponent;
  let fixture: ComponentFixture<ClientTypeaheadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientTypeaheadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientTypeaheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
