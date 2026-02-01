import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '@src/app/core/environments/environment';

import { BranchData } from '@src/app/core/models/BranchData'
import { Country } from '@src/app/core/models/country'

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  API_URL = environment.apiUrl;
  PREFIX = 'options/';

  constructor(private http: HttpClient) { }

  async getAll(searchColumn: string, searchQuery: string, page: number, size: number): Promise<BranchData> {
    const source = this.http.get<BranchData>(this.API_URL + this.PREFIX + 'countries/?' +
      'searchColumn=' + searchColumn +
      '&searchQuery=' + searchQuery +
      '&page=' + page +
      '&limit=' + size
    );
    const result = await firstValueFrom(source);
    return result;
  }

  async getAt(countryid: number): Promise<any> {
    const source = this.http.get<any>(this.API_URL + this.PREFIX + 'countries/' + countryid );
    const result = await firstValueFrom(source);
    return result;
  }

  async storeCountry(country: Country): Promise<any> {
    const source = this.http.post<any>(this.API_URL + this.PREFIX + 'countries/', country );
    const result = await firstValueFrom(source);
    return result;
  }

  async updateCountry(country: Country): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'countries/' + country.id, country );
    const result = await firstValueFrom(source);
    return result;
  }

  async disableCountry(country: Country): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'countries/disable/' + country.id, {status: 'NO'} );
    const result = await firstValueFrom(source);
    return result;
  }

  async enableCountry(country: Country): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'countries/enable/' + country.id, {status: 'SI'} );
    const result = await firstValueFrom(source);
    return result;
  }

  async getAllEnable(): Promise<Country[]> {
    const source = this.http.get<Country[]>(this.API_URL + this.PREFIX + 'countries-list/all-enable/');
    const result = await firstValueFrom(source);
    return result;
  }

}
