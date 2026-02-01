import { TestBed } from '@angular/core/testing';

import { ParcelsPricesFixedService } from './parcels-prices-fixed.service';

describe('ParcelsPricesFixedService', () => {
  let service: ParcelsPricesFixedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParcelsPricesFixedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
