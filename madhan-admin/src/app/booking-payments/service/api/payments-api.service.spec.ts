import { TestBed } from '@angular/core/testing';

import { PaymentsApiService } from './payments-api.service';

describe('PaymentsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaymentsApiService = TestBed.get(PaymentsApiService);
    expect(service).toBeTruthy();
  });
});
