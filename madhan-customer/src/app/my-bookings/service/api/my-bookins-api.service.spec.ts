import { TestBed } from '@angular/core/testing';

import { MyBookinsApiService } from './my-bookins-api.service';

describe('MyBookinsApiService', () => {
  let service: MyBookinsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyBookinsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
