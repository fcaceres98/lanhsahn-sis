import { TestBed } from '@angular/core/testing';

import { ParcelsPricesPoundService } from './parcels-prices-pound.service';

describe('ParcelsPricesPoundService', () => {
  let service: ParcelsPricesPoundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParcelsPricesPoundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
