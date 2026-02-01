import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '@src/app/core/environments/environment';

import { BranchData } from '@src/app/core/models/BranchData';
import { Itinerary } from '@src/app/core/models/itinerary';

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {

  API_URL = environment.apiUrl;
  PREFIX = 'operations/';

  constructor(private http: HttpClient) { }

  async getAll(searchColumn: string, searchQuery: string, page: number, size: number): Promise<BranchData> {
    const source = this.http.get<BranchData>(this.API_URL + this.PREFIX + 'itinerary/?' +
      'searchColumn=' + searchColumn +
      '&searchQuery=' + searchQuery +
      '&page=' + page +
      '&limit=' + size
    );
    const result = await firstValueFrom(source);
    return result;
  }

  async getAt(itinerarytid: number): Promise<any> {
    const source = this.http.get<any>(this.API_URL + this.PREFIX + 'itinerary/' + itinerarytid );
    const result = await firstValueFrom(source);
    return result;
  }

  async storeItinerary(itinerary: Itinerary): Promise<any> {
    const source = this.http.post<any>(this.API_URL + this.PREFIX + 'itinerary/', itinerary );
    const result = await firstValueFrom(source);
    return result;
  }

  async updateItinerary(itinerary: Itinerary): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'itinerary/' + itinerary.id, itinerary );
    const result = await firstValueFrom(source);
    return result;
  }

  async disableItinerary(itinerary: Itinerary): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'itinerary/disable/' + itinerary.id, {status: 0} );
    const result = await firstValueFrom(source);
    return result;
  }

  async enableItinerary(itinerary: Itinerary): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'itinerary/enable/' + itinerary.id, {status: 1} );
    const result = await firstValueFrom(source);
    return result;
  }

  async getAllEnabled(): Promise<any> {
    const source = this.http.get<any>(this.API_URL + this.PREFIX + 'itinerary-list/all-enable' );
    const result = await firstValueFrom(source);
    return result;
  }

  async updateItineraryConnections(itinerary: Itinerary): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'itinerary/update-connections/' + itinerary.id, itinerary );
    const result = await firstValueFrom(source);
    return result;
  }

}
