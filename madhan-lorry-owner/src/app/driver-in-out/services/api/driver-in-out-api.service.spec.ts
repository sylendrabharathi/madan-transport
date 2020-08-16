import { TestBed } from '@angular/core/testing';

import { DriverInOutApiService } from './driver-in-out-api.service';

describe('DriverInOutApiService', () => {
  let service: DriverInOutApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriverInOutApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
