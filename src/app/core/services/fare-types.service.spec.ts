import { TestBed } from '@angular/core/testing';

import { FareTypesService } from './fare-types.service';

describe('FareTypesService', () => {
  let service: FareTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FareTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
