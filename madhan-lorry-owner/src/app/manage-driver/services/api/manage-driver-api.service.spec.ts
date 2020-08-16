import { TestBed } from '@angular/core/testing';

import { ManageDriverApiService } from './manage-driver-api.service';

describe('ManageDriverApiService', () => {
  let service: ManageDriverApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageDriverApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
