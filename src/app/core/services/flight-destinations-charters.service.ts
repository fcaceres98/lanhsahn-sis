import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '@src/app/core/environments/environment';

import { BranchData } from '@src/app/core/models/BranchData'
import { FlightDestinationCharter } from '@src/app/core/models/flightDestinationCharter'

@Injectable({
  providedIn: 'root'
})
export class FlightDestinationsChartersService {
  
  API_URL = environment.apiUrl;
  PREFIX = 'options/';

  constructor(private http: HttpClient) { }

  async getAll(searchColumn: string, searchQuery: string, page: number, size: number): Promise<BranchData> {
    const source = this.http.get<BranchData>(this.API_URL + this.PREFIX + 'flight-destinations-charters/?' +
      'searchColumn=' + searchColumn +
      '&searchQuery=' + searchQuery +
      '&page=' + page +
      '&limit=' + size
    );
    const result = await firstValueFrom(source);
    return result;
  }

  async getAt(flightdestinationcharterid: number): Promise<any> {
    const source = this.http.get<any>(this.API_URL + this.PREFIX + 'flight-destinations-charters/' + flightdestinationcharterid );
    const result = await firstValueFrom(source);
    return result;
  }

  async storeFlightDestinationCharter(flightdestinationcharter: FlightDestinationCharter): Promise<any> {
    const source = this.http.post<any>(this.API_URL + this.PREFIX + 'flight-destinations-charters/', flightdestinationcharter );
    const result = await firstValueFrom(source);
    return result;
  }

  async updateFlightDestinationCharter(flightdestinationcharter: FlightDestinationCharter): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'flight-destinations-charters/' + flightdestinationcharter.id, flightdestinationcharter );
    const result = await firstValueFrom(source);
    return result;
  }

  async disableFlightDestinationCharter(flightdestinationcharter: FlightDestinationCharter): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'flight-destinations-charters/disable/' + flightdestinationcharter.id, {status: 'NO'} );
    const result = await firstValueFrom(source);
    return result;
  }

  async enableFlightDestinationCharter(flightdestinationcharter: FlightDestinationCharter): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'flight-destinations-charters/enable/' + flightdestinationcharter.id, {status: 'SI'} );
    const result = await firstValueFrom(source);
    return result;
  }

  async getAllEnableFlightDestinationCharter(): Promise<FlightDestinationCharter[]> {
    const source = this.http.get<FlightDestinationCharter[]>(this.API_URL + this.PREFIX + 'flight-destinations-charters-list/all-enable/' );
    const result = await firstValueFrom(source);
    return result;
  }

}
