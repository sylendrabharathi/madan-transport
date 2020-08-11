import { TestBed } from '@angular/core/testing';

import { ReciptsApiService } from './recipts-api.service';

describe('ReciptsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReciptsApiService = TestBed.get(ReciptsApiService);
    expect(service).toBeTruthy();
  });
});
