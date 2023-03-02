import { TestBed } from '@angular/core/testing';

import { HttpsService } from './https.service';

describe('HttpsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpsService = TestBed.get(HttpsService);
    expect(service).toBeTruthy();
  });
});
