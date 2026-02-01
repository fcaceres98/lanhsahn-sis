import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '@src/app/core/environments/environment';

import { BranchData } from '@src/app/core/models/BranchData'
import { FlightDestination } from '@src/app/core/models/flightDestination'

@Injectable({
  providedIn: 'root'
})
export class FlightDestinationsService {

  API_URL = environment.apiUrl;
  PREFIX = 'options/';

  constructor(private http: HttpClient) { }

  async getAll(searchColumn: string, searchQuery: string, page: number, size: number): Promise<BranchData> {
    const source = this.http.get<BranchData>(this.API_URL + this.PREFIX + 'flight-destinations/?' +
      'searchColumn=' + searchColumn +
      '&searchQuery=' + searchQuery +
      '&page=' + page +
      '&limit=' + size
    );
    const result = await firstValueFrom(source);
    return result;
  }

  async getAt(flightdestinationid: number): Promise<any> {
    const source = this.http.get<any>(this.API_URL + this.PREFIX + 'flight-destinations/' + flightdestinationid );
    const result = await firstValueFrom(source);
    return result;
  }

  async storeFlightDestination(flightdestination: FlightDestination): Promise<any> {
    const source = this.http.post<any>(this.API_URL + this.PREFIX + 'flight-destinations/', flightdestination );
    const result = await firstValueFrom(source);
    return result;
  }

  async updateFlightDestination(flightdestination: FlightDestination): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'flight-destinations/' + flightdestination.id, flightdestination );
    const result = await firstValueFrom(source);
    return result;
  }

  async disableFlightDestination(flightdestination: FlightDestination): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'flight-destinations/disable/' + flightdestination.id, {status: 'NO'} );
    const result = await firstValueFrom(source);
    return result;
  }

  async enableFlightDestination(flightdestination: FlightDestination): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'flight-destinations/enable/' + flightdestination.id, {status: 'SI'} );
    const result = await firstValueFrom(source);
    return result;
  }

  async getAllEnableFlightDestination(): Promise<FlightDestination[]> {
    const source = this.http.get<FlightDestination[]>(this.API_URL + this.PREFIX + 'flight-destinations-list/all-enable/' );
    const result = await firstValueFrom(source);
    return result;
  }

}
