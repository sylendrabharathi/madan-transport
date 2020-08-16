import { TestBed } from '@angular/core/testing';

import { MyBookingsApiService } from './my-bookings-api.service';

describe('MyBookingsApiService', () => {
  let service: MyBookingsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyBookingsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
