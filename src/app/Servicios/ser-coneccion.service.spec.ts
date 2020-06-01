import { TestBed } from '@angular/core/testing';

import { SerConeccionService } from './ser-coneccion.service';

describe('SerConeccionService', () => {
  let service: SerConeccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SerConeccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
