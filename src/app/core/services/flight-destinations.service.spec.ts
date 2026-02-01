import { TestBed } from '@angular/core/testing';

import { FlightDestinationsService } from './flight-destinations.service';

describe('FlightDestinationsService', () => {
  let service: FlightDestinationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightDestinationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
