import { TestBed } from '@angular/core/testing';

import { NewBookingApiService } from './new-booking-api.service';

describe('NewBookingApiService', () => {
  let service: NewBookingApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewBookingApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
