import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '@src/app/core/environments/environment';

import { BranchData } from '@src/app/core/models/BranchData'
import { ParcelsPricesPound } from '@src/app/core/models/parcelsPricesPound'

@Injectable({
  providedIn: 'root'
})
export class ParcelsPricesPoundService {

  API_URL = environment.apiUrl;
  PREFIX = 'options/';

  constructor(private http: HttpClient) { }

  async getAll(searchColumn: string, searchQuery: string, page: number, size: number): Promise<BranchData> {
    const source = this.http.get<BranchData>(this.API_URL + this.PREFIX + 'parcels-prices-pound/?' +
      'searchColumn=' + searchColumn +
      '&searchQuery=' + searchQuery +
      '&page=' + page +
      '&limit=' + size
    );
    const result = await firstValueFrom(source);
    return result;
  }

  async getAt(parcelspricespoundid: number): Promise<any> {
    const source = this.http.get<any>(this.API_URL + this.PREFIX + 'parcels-prices-pound/' + parcelspricespoundid );
    const result = await firstValueFrom(source);
    return result;
  }

  async storeParcelsPricesPound(parcelspricespound: ParcelsPricesPound): Promise<any> {
    const source = this.http.post<any>(this.API_URL + this.PREFIX + 'parcels-prices-pound/', parcelspricespound );
    const result = await firstValueFrom(source);
    return result;
  }

  async updateParcelsPricesPound(parcelspricespound: ParcelsPricesPound): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'parcels-prices-pound/' + parcelspricespound.id, parcelspricespound );
    const result = await firstValueFrom(source);
    return result;
  }

  async disableParcelsPricesPound(parcelspricespound: ParcelsPricesPound): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'parcels-prices-pound/disable/' + parcelspricespound.id, {status: 'NO'} );
    const result = await firstValueFrom(source);
    return result;
  }

  async enableParcelsPricesPound(parcelspricespound: ParcelsPricesPound): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'parcels-prices-pound/enable/' + parcelspricespound.id, {status: 'SI'} );
    const result = await firstValueFrom(source);
    return result;
  }

}
