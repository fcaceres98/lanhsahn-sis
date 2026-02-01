import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '@src/app/core/environments/environment';

import { BranchData } from '@src/app/core/models/BranchData'
import { Group } from '@src/app/core/models/group'

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  API_URL = environment.apiUrl;
  PREFIX = 'options/';

  constructor(private http: HttpClient) { }

  async getAll(searchColumn: string, searchQuery: string, page: number, size: number): Promise<BranchData> {
    const source = this.http.get<BranchData>(this.API_URL + this.PREFIX + 'groups/?' +
      'searchColumn=' + searchColumn +
      '&searchQuery=' + searchQuery +
      '&page=' + page +
      '&limit=' + size
    );
    const result = await firstValueFrom(source);
    return result;
  }

  async getAt(groupid: number): Promise<any> {
    const source = this.http.get<any>(this.API_URL + this.PREFIX + 'groups/' + groupid );
    const result = await firstValueFrom(source);
    return result;
  }

  async storeGroup(group: Group): Promise<any> {
    const source = this.http.post<any>(this.API_URL + this.PREFIX + 'groups/', group );
    const result = await firstValueFrom(source);
    return result;
  }

  async updateGroup(group: Group): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'groups/' + group.id, group );
    const result = await firstValueFrom(source);
    return result;
  }

  async disableGroup(group: Group): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'groups/disable/' + group.id, {status: 'NO'} );
    const result = await firstValueFrom(source);
    return result;
  }

  async enableGroup(group: Group): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'groups/enable/' + group.id, {status: 'SI'} );
    const result = await firstValueFrom(source);
    return result;
  }

  async getAllEnable(): Promise<Group[]> {
    const source = this.http.get<Group[]>(this.API_URL + this.PREFIX + 'groups-list/all-enable/');
    const result = await firstValueFrom(source);
    return result;
  }
}
