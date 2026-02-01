import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '@src/app/core/environments/environment';

import { BranchData } from '@src/app/core/models/BranchData'
import { DollarValue } from '@src/app/core/models/dollarValue'

@Injectable({
  providedIn: 'root'
})
export class DollarValueService {

  API_URL = environment.apiUrl;
  PREFIX = 'options/';

  constructor(private http: HttpClient) { }

  async getAll(page: number, size: number): Promise<BranchData> {
    const source = this.http.get<BranchData>(this.API_URL + this.PREFIX + 'dollar-value/all/?' + 
      '&page=' + page +
      '&limit=' + size
    );
    const result = await firstValueFrom(source);
    return result;
  }

  async getAt(dollarvalueid: number): Promise<DollarValue> {
    const source = this.http.get<DollarValue>(this.API_URL + this.PREFIX + 'dollar-value/' + dollarvalueid);
    const result = await firstValueFrom(source);
    return result;
  }

  async getLast(): Promise<DollarValue> {
    const source = this.http.get<DollarValue>(this.API_URL + this.PREFIX + 'dollar-value/last/');
    const result = await firstValueFrom(source);
    return result;
  }

  async storeDolarValue(dollavalue: DollarValue): Promise<any> {
    const source = this.http.post<any>(this.API_URL + this.PREFIX + 'dollar-value/', dollavalue );
    const result = await firstValueFrom(source);
    return result;
  }

}
