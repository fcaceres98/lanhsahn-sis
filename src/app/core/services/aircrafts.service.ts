import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '@src/app/core/environments/environment';

import { BranchData } from '@src/app/core/models/BranchData';

@Injectable({
  providedIn: 'root'
})
export class AircraftsService {

  API_URL = environment.apiUrl;
  PREFIX = 'maintenance/';

  constructor(private http: HttpClient) { }

  async getAll(searchColumn: string, searchQuery: string, page: number, size: number): Promise<BranchData> {
    const source = this.http.get<BranchData>(this.API_URL + this.PREFIX + 'aircrafts/?' +
      'searchColumn=' + searchColumn +
      '&searchQuery=' + searchQuery +
      '&page=' + page +
      '&limit=' + size
    );
    const result = await firstValueFrom(source);
    return result;
  }

  async getAt(aircraftid: number): Promise<any> {
    const source = this.http.get<any>(this.API_URL + this.PREFIX + 'aircrafts/' + aircraftid );
    const result = await firstValueFrom(source);
    return result;
  }

  async storeAircraft(aircraft: any): Promise<any> {
    const source = this.http.post<any>(this.API_URL + this.PREFIX + 'aircrafts/', aircraft );
    const result = await firstValueFrom(source);
    return result;
  }

  async updateAircraft(updateAircraft: any): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'aircrafts/' + updateAircraft.aircraft.id, updateAircraft );
    const result = await firstValueFrom(source);
    return result;
  }

  async getAllEnable(): Promise<any> {
    const source = this.http.get<any>(this.API_URL + this.PREFIX + 'aircrafts-list/all-enable' );
    const result = await firstValueFrom(source);
    return result;
  }

}
