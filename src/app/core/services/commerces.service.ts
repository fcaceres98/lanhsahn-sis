import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '@src/app/core/environments/environment';

import { BranchData } from '@src/app/core/models/BranchData'
import { Commerces } from '@src/app/core/models/commerces'

@Injectable({
  providedIn: 'root'
})
export class CommercesService {

  API_URL = environment.apiUrl;
  PREFIX = 'options/';

  constructor(private http: HttpClient) { }

  async getAll(searchColumn: string, searchQuery: string, page: number, size: number): Promise<BranchData> {
    const source = this.http.get<BranchData>(this.API_URL + this.PREFIX + 'commerces/?' +
      'searchColumn=' + searchColumn +
      '&searchQuery=' + searchQuery +
      '&page=' + page +
      '&limit=' + size
    );
    const result = await firstValueFrom(source);
    return result;
  }

  async getAt(commerceid: number): Promise<any> {
    const source = this.http.get<any>(this.API_URL + this.PREFIX + 'commerces/' + commerceid );
    const result = await firstValueFrom(source);
    return result;
  }

  async storeCommerce(commerce: Commerces): Promise<any> {
    const source = this.http.post<any>(this.API_URL + this.PREFIX + 'commerces/', commerce );
    const result = await firstValueFrom(source);
    return result;
  }

  async updateCommerce(commerce: Commerces): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'commerces/' + commerce.id, commerce );
    const result = await firstValueFrom(source);
    return result;
  }

  async disableCommerce(commerce: Commerces): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'commerces/disable/' + commerce.id, {status: 'NO'} );
    const result = await firstValueFrom(source);
    return result;
  }

  async enableCommerce(commerce: Commerces): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'commerces/enable/' + commerce.id, {status: 'SI'} );
    const result = await firstValueFrom(source);
    return result;
  }

  async getAllEnable(): Promise<Commerces[]> {
    const source = this.http.get<Commerces[]>(this.API_URL + this.PREFIX + 'commerces-list/all-enable/');
    const result = await firstValueFrom(source);
    return result;
  }

}
