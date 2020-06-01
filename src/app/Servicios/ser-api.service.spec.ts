import { TestBed } from '@angular/core/testing';

import { SerApiService } from './ser-api.service';

describe('SerApiService', () => {
  let service: SerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
