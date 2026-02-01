import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '@src/app/core/environments/environment';

import { BranchData } from '@src/app/core/models/BranchData'
import { ParcelsPricesFixed } from '@src/app/core/models/parcelsPricesFixed'

@Injectable({
  providedIn: 'root'
})
export class ParcelsPricesFixedService {

  API_URL = environment.apiUrl;
  PREFIX = 'options/';

  constructor(private http: HttpClient) { }

  async getAll(searchColumn: string, searchQuery: string, page: number, size: number): Promise<BranchData> {
    const source = this.http.get<BranchData>(this.API_URL + this.PREFIX + 'parcels-prices-fixed/?' +
      'searchColumn=' + searchColumn +
      '&searchQuery=' + searchQuery +
      '&page=' + page +
      '&limit=' + size
    );
    const result = await firstValueFrom(source);
    return result;
  }

  async getAt(parcelspricesfixedid: number): Promise<any> {
    const source = this.http.get<any>(this.API_URL + this.PREFIX + 'parcels-prices-fixed/' + parcelspricesfixedid );
    const result = await firstValueFrom(source);
    return result;
  }

  async storeParcelsPricesFixed(parcelspricesfixed: ParcelsPricesFixed): Promise<any> {
    const source = this.http.post<any>(this.API_URL + this.PREFIX + 'parcels-prices-fixed/', parcelspricesfixed );
    const result = await firstValueFrom(source);
    return result;
  }

  async updateParcelsPricesFixed(parcelspricesfixed: ParcelsPricesFixed): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'parcels-prices-fixed/' + parcelspricesfixed.id, parcelspricesfixed );
    const result = await firstValueFrom(source);
    return result;
  }

  async disableParcelsPricesFixed(parcelspricesfixed: ParcelsPricesFixed): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'parcels-prices-fixed/disable/' + parcelspricesfixed.id, {status: 'NO'} );
    const result = await firstValueFrom(source);
    return result;
  }

  async enableParcelsPricesFixed(parcelspricesfixed: ParcelsPricesFixed): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'parcels-prices-fixed/enable/' + parcelspricesfixed.id, {status: 'SI'} );
    const result = await firstValueFrom(source);
    return result;
  }
  
}
