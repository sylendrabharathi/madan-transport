import { TestBed } from '@angular/core/testing';

import { VehicleDetailsapiService } from './vehicle-detailsapi.service';

describe('VehicleDetailsapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VehicleDetailsapiService = TestBed.get(VehicleDetailsapiService);
    expect(service).toBeTruthy();
  });
});
