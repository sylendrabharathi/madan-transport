import { TestBed } from '@angular/core/testing';

import { BookingEnquiresApiService } from './booking-enquires-api.service';

describe('BookingEnquiresApiService', () => {
  let service: BookingEnquiresApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingEnquiresApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
