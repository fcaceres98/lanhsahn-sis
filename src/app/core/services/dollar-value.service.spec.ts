import { TestBed } from '@angular/core/testing';

import { DollarValueService } from './dollar-value.service';

describe('DollarValueService', () => {
  let service: DollarValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DollarValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
