import { TestBed } from '@angular/core/testing';

import { RateApiService } from './rate-api.service';

describe('RateApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RateApiService = TestBed.get(RateApiService);
    expect(service).toBeTruthy();
  });
});
