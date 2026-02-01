import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '@src/app/core/environments/environment';

import { BranchData } from '@src/app/core/models/BranchData'
import { Connections } from '@src/app/core/models/connections'

@Injectable({
  providedIn: 'root'
})
export class ConnectionsService {

  API_URL = environment.apiUrl;
  PREFIX = 'options/';

  constructor(private http: HttpClient) { }

  async getAll(searchColumn: string, searchQuery: string, page: number, size: number): Promise<BranchData> {
    const source = this.http.get<BranchData>(this.API_URL + this.PREFIX + 'connections/?' +
      'searchColumn=' + searchColumn +
      '&searchQuery=' + searchQuery +
      '&page=' + page +
      '&limit=' + size
    );
    const result = await firstValueFrom(source);
    return result;
  }

  async getAt(connectionid: number): Promise<any> {
    const source = this.http.get<any>(this.API_URL + this.PREFIX + 'connections/' + connectionid );
    const result = await firstValueFrom(source);
    return result;
  }

  async storeConnection(connection: Connections): Promise<any> {
    const source = this.http.post<any>(this.API_URL + this.PREFIX + 'connections/', connection );
    const result = await firstValueFrom(source);
    return result;
  }

  async updateConnection(connection: Connections): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'connections/' + connection.id, connection );
    const result = await firstValueFrom(source);
    return result;
  }

  async disableConnection(connection: Connections): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'connections/disable/' + connection.id, {status: 'NO'} );
    const result = await firstValueFrom(source);
    return result;
  }

  async enableConnection(connection: Connections): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'connections/enable/' + connection.id, {status: 'SI'} );
    const result = await firstValueFrom(source);
    return result;
  }

  async getAllEnable(): Promise<Connections[]> {
    const source = this.http.get<Connections[]>(this.API_URL + this.PREFIX + 'connections-list/all-enable/');
    const result = await firstValueFrom(source);
    return result;
  }

}
