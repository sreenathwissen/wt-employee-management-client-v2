import { TestBed } from '@angular/core/testing';

import { EmployeeSearchService } from './employee-search.service';

describe('EmployeeSearchService', () => {
  let service: EmployeeSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
