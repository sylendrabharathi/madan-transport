import { TestBed } from '@angular/core/testing';

import { LrApiService } from './lr-api.service';

describe('LrApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LrApiService = TestBed.get(LrApiService);
    expect(service).toBeTruthy();
  });
});
