import { TestBed } from '@angular/core/testing';

import { ManageVehicleApiService } from './manage-vehicle-api.service';

describe('ManageVehicleApiService', () => {
  let service: ManageVehicleApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageVehicleApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
