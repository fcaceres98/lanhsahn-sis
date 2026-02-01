import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '@src/app/core/environments/environment';

import { BranchData } from '@src/app/core/models/BranchData'
import { FareTypes } from '@src/app/core/models/fareTypes';

@Injectable({
  providedIn: 'root'
})
export class FareTypesService {

  API_URL = environment.apiUrl;
  PREFIX = 'options/';

  constructor(private http: HttpClient) { }
  
  async getAll(searchColumn: string, searchQuery: string, page: number, size: number): Promise<BranchData> {
    const source = this.http.get<BranchData>(this.API_URL + this.PREFIX + 'faretypes/?' +
      'searchColumn=' + searchColumn +
      '&searchQuery=' + searchQuery +
      '&page=' + page +
      '&limit=' + size
    );
    const result = await firstValueFrom(source);
    return result;
  }

  async getAt(taxid: number): Promise<any> {
    const source = this.http.get<any>(this.API_URL + this.PREFIX + 'faretypes/' + taxid );
    const result = await firstValueFrom(source);
    return result;
  }

  async storeFareTypes(Faretype: FareTypes): Promise<any> {
    const source = this.http.post<any>(this.API_URL + this.PREFIX + 'faretypes/', Faretype );
    const result = await firstValueFrom(source);
    return result;
  }

  async updateFareTypes(Faretype: FareTypes): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'faretypes/' + Faretype.id, Faretype );
    const result = await firstValueFrom(source);
    return result;
  }

  async disableFareTypes(Faretype: FareTypes): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'faretypes/disable/' + Faretype.id, {status: 0} );
    const result = await firstValueFrom(source);
    return result;
  }

  async enableFareTypes(Faretype: FareTypes): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'faretypes/enable/' + Faretype.id, {status: 1} );
    const result = await firstValueFrom(source);
    return result;
  }

  async getAllEnable(): Promise<FareTypes[]> {
    const source = this.http.get<FareTypes[]>(this.API_URL + this.PREFIX + 'faretypes-list/all-enable/');
    const result = await firstValueFrom(source);
    return result;
  }

}
