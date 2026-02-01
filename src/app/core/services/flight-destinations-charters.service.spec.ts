import { TestBed } from '@angular/core/testing';

import { FlightDestinationsChartersService } from './flight-destinations-charters.service';

describe('FlightDestinationsChartersService', () => {
  let service: FlightDestinationsChartersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightDestinationsChartersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
