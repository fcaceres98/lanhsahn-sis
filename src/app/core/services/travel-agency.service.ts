import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '@src/app/core/environments/environment';

import { BranchData } from '@src/app/core/models/BranchData'
import { TravelAgency } from '@src/app/core/models/travelAgency';
import { TravelAgencyUsers } from '@src/app/core/models/travelAgencyUsers';

@Injectable({
  providedIn: 'root'
})
export class TravelAgencyService {

  API_URL = environment.apiUrl;
  PREFIX = 'options/';

  constructor(private http: HttpClient) { }

  async getAll(searchColumn: string, searchQuery: string, page: number, size: number): Promise<BranchData> {
    const source = this.http.get<BranchData>(this.API_URL + this.PREFIX + 'travel-agency/?' +
      'searchColumn=' + searchColumn +
      '&searchQuery=' + searchQuery +
      '&page=' + page +
      '&limit=' + size
    );
    const result = await firstValueFrom(source);
    return result;
  }

  async getAt(travelagencyid: number): Promise<any> {
    const source = this.http.get<any>(this.API_URL + this.PREFIX + 'travel-agency/' + travelagencyid );
    const result = await firstValueFrom(source);
    return result;
  }

  async storeTravelAgency(travelagency: TravelAgency): Promise<any> {
    const source = this.http.post<any>(this.API_URL + this.PREFIX + 'travel-agency/', travelagency );
    const result = await firstValueFrom(source);
    return result;
  }

  async updateTravelAgency(travelagency: TravelAgency): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'travel-agency/' + travelagency.id, travelagency );
    const result = await firstValueFrom(source);
    return result;
  }

  async disableTravelAgency(travelagency: TravelAgency): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'travel-agency/disable/' + travelagency.id, {status: 'NO'} );
    const result = await firstValueFrom(source);
    return result;
  }

  async enableTravelAgency(travelagency: TravelAgency): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'travel-agency/enable/' + travelagency.id, {status: 'SI'} );
    const result = await firstValueFrom(source);
    return result;
  }

  async getAllEnable(): Promise<TravelAgency[]> {
    const source = this.http.get<TravelAgency[]>(this.API_URL + this.PREFIX + 'travel-agency-list/all-enable/');
    const result = await firstValueFrom(source);
    return result;
  }

  async getAllAsignUsers(travelagency: TravelAgency): Promise<TravelAgencyUsers[]> {
    const source = this.http.get<TravelAgencyUsers[]>(this.API_URL + this.PREFIX + 'travel-agency-list/all-asign-users/' + travelagency.id);
    const result = await firstValueFrom(source);
    return result;
  }

  async storeTravelAgencyUser(travelagencyusers: TravelAgencyUsers): Promise<any> {
    const source = this.http.post<any>(this.API_URL + this.PREFIX + 'travel-agency-users/', travelagencyusers );
    const result = await firstValueFrom(source);
    return result;
  }
}
