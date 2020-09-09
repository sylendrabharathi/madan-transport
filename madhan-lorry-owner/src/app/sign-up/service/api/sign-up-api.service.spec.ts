import { TestBed } from '@angular/core/testing';

import { SignUpApiService } from './sign-up-api.service';

describe('SignUpApiService', () => {
  let service: SignUpApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignUpApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
