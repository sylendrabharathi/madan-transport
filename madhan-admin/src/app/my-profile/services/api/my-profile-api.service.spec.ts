import { TestBed } from '@angular/core/testing';

import { MyProfileApiService } from './my-profile-api.service';

describe('MyProfileApiService', () => {
  let service: MyProfileApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyProfileApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
