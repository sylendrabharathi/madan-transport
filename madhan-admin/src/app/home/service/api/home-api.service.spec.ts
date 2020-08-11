import { TestBed } from '@angular/core/testing';

import { HomeApiService } from './home-api.service';

describe('HomeApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomeApiService = TestBed.get(HomeApiService);
    expect(service).toBeTruthy();
  });
});
