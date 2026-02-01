import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '@src/app/core/environments/environment';

import { BranchData } from '@src/app/core/models/BranchData'
import { Clients } from '@src/app/core/models/clients'

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  API_URL = environment.apiUrl;
  PREFIX = 'options/';

  constructor(private http: HttpClient) { }

  async getAll(searchColumn: string, searchQuery: string, page: number, size: number): Promise<BranchData> {
    const source = this.http.get<BranchData>(this.API_URL + this.PREFIX + 'clients/?' +
      'searchColumn=' + searchColumn +
      '&searchQuery=' + searchQuery +
      '&page=' + page +
      '&limit=' + size
    );
    const result = await firstValueFrom(source);
    return result;
  }

  async getAt(clientid: number): Promise<any> {
    const source = this.http.get<any>(this.API_URL + this.PREFIX + 'clients/' + clientid );
    const result = await firstValueFrom(source);
    return result;
  }

  async storeClient(client: Clients): Promise<any> {
    const source = this.http.post<any>(this.API_URL + this.PREFIX + 'clients/', client );
    const result = await firstValueFrom(source);
    return result;
  }

  async updateClient(client: Clients): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'clients/' + client.id, client );
    const result = await firstValueFrom(source);
    return result;
  }

  async disableClient(client: Clients): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'clients/disable/' + client.id, {status: 'NO'} );
    const result = await firstValueFrom(source);
    return result;
  }

  async enableClient(client: Clients): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'clients/enable/' + client.id, {status: 'SI'} );
    const result = await firstValueFrom(source);
    return result;
  }

  async getAllEnable(): Promise<Clients[]> {
    const source = this.http.get<Clients[]>(this.API_URL + this.PREFIX + 'clients-list/allenable/');
    const result = await firstValueFrom(source);
    return result;
  }

}
