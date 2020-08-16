import { TestBed } from '@angular/core/testing';

import { TrackApiService } from './track-api.service';

describe('TrackApiService', () => {
  let service: TrackApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
