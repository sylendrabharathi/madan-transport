import { TestBed } from '@angular/core/testing';

import { ConsignerApiService } from './consigner-api.service';

describe('ConsignerApiService', () => {
  let service: ConsignerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsignerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
