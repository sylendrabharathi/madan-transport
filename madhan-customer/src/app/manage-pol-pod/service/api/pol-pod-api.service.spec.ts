import { TestBed } from '@angular/core/testing';

import { PolPodApiService } from './pol-pod-api.service';

describe('PolPodApiService', () => {
  let service: PolPodApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PolPodApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
