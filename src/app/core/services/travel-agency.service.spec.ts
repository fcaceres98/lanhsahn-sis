import { TestBed } from '@angular/core/testing';

import { TravelAgencyService } from './travel-agency.service';

describe('TravelAgencyService', () => {
  let service: TravelAgencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravelAgencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
