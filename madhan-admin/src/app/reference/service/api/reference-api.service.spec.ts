import { TestBed } from '@angular/core/testing';

import { ReferenceApiService } from './reference-api.service';

describe('ReferenceApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReferenceApiService = TestBed.get(ReferenceApiService);
    expect(service).toBeTruthy();
  });
});
