import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '@src/app/core/environments/environment';

import { BranchData } from '@src/app/core/models/BranchData'
import { CAI } from '@src/app/core/models/cai'

@Injectable({
  providedIn: 'root'
})
export class CaiService {

  API_URL = environment.apiUrl;
  PREFIX = 'options/';

  constructor(private http: HttpClient) { }

  async getAll(searchColumn: string, searchQuery: string, page: number, size: number): Promise<BranchData> {
    const source = this.http.get<BranchData>(this.API_URL + this.PREFIX + 'cai/?' +
      'searchColumn=' + searchColumn +
      '&searchQuery=' + searchQuery +
      '&page=' + page +
      '&limit=' + size
    );
    const result = await firstValueFrom(source);
    return result;
  }

  async getAt(caiid: number): Promise<any> {
    const source = this.http.get<any>(this.API_URL + this.PREFIX + 'cai/' + caiid );
    const result = await firstValueFrom(source);
    return result;
  }

  async storeCAI(cai: CAI): Promise<any> {
    const source = this.http.post<any>(this.API_URL + this.PREFIX + 'cai/', cai );
    const result = await firstValueFrom(source);
    return result;
  }

  async updateBranch(cai: CAI): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'cai/' + cai.id, cai );
    const result = await firstValueFrom(source);
    return result;
  }

  async getLastBranchCAi(branchid: number): Promise<any> {
    const source = this.http.get<any>(this.API_URL + this.PREFIX + 'cai-list/latest-branch-cai/' + branchid );
    const result = await firstValueFrom(source);
    return result;
  }

}
