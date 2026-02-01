import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '@src/app/core/environments/environment';

import { BranchData } from '@src/app/core/models/BranchData'
import { Taxes } from '@src/app/core/models/taxes';

@Injectable({
  providedIn: 'root'
})
export class TaxesService {

  API_URL = environment.apiUrl;
  PREFIX = 'options/';

  constructor(private http: HttpClient) { }
  
  async getAll(searchColumn: string, searchQuery: string, page: number, size: number): Promise<BranchData> {
    const source = this.http.get<BranchData>(this.API_URL + this.PREFIX + 'taxes/?' +
      'searchColumn=' + searchColumn +
      '&searchQuery=' + searchQuery +
      '&page=' + page +
      '&limit=' + size
    );
    const result = await firstValueFrom(source);
    return result;
  }

  async getAt(taxid: number): Promise<any> {
    const source = this.http.get<any>(this.API_URL + this.PREFIX + 'taxes/' + taxid );
    const result = await firstValueFrom(source);
    return result;
  }

  async storeTax(tax: Taxes): Promise<any> {
    const source = this.http.post<any>(this.API_URL + this.PREFIX + 'taxes/', tax );
    const result = await firstValueFrom(source);
    return result;
  }

  async updateTax(tax: Taxes): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'taxes/' + tax.id, tax );
    const result = await firstValueFrom(source);
    return result;
  }

  async disableTax(tax: Taxes): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'taxes/disable/' + tax.id, {status: 'NO'} );
    const result = await firstValueFrom(source);
    return result;
  }

  async enableTax(tax: Taxes): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'taxes/enable/' + tax.id, {status: 'SI'} );
    const result = await firstValueFrom(source);
    return result;
  }

  async getAllEnable(): Promise<Taxes[]> {
    const source = this.http.get<Taxes[]>(this.API_URL + this.PREFIX + 'taxes-list/all-enable/');
    const result = await firstValueFrom(source);
    return result;
  }

}
