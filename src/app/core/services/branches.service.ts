import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '@src/app/core/environments/environment';

import { BranchData } from '@src/app/core/models/BranchData'
import { Branch } from '@src/app/core/models/branch'

@Injectable({
  providedIn: 'root'
})
export class BranchesService {

  API_URL = environment.apiUrl;
  PREFIX = 'options/';

  constructor(private http: HttpClient) { }

  async getAll(searchColumn: string, searchQuery: string, page: number, size: number): Promise<BranchData> {
    const source = this.http.get<BranchData>(this.API_URL + this.PREFIX + 'branches/?' +
      'searchColumn=' + searchColumn +
      '&searchQuery=' + searchQuery +
      '&page=' + page +
      '&limit=' + size
    );
    const result = await firstValueFrom(source);
    return result;
  }

  async getAt(branchid: number): Promise<any> {
    const source = this.http.get<any>(this.API_URL + this.PREFIX + 'branches/' + branchid );
    const result = await firstValueFrom(source);
    return result;
  }

  async storeBranch(branch: Branch): Promise<any> {
    const source = this.http.post<any>(this.API_URL + this.PREFIX + 'branches/', branch );
    const result = await firstValueFrom(source);
    return result;
  }

  async updateBranch(branch: Branch): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'branches/' + branch.id, branch );
    const result = await firstValueFrom(source);
    return result;
  }

  async disableBranch(branch: Branch): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'branches/disable/' + branch.id, {status: 'NO'} );
    const result = await firstValueFrom(source);
    return result;
  }

  async enableBranch(branch: Branch): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'branches/enable/' + branch.id, {status: 'SI'} );
    const result = await firstValueFrom(source);
    return result;
  }

  async getAllEnable(): Promise<Branch[]> {
    const source = this.http.get<Branch[]>(this.API_URL + this.PREFIX + 'branches-list/all-enable/');
    const result = await firstValueFrom(source);
    return result;
  }
}
