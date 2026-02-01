import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '@src/app/core/environments/environment';

import { BranchData } from '@src/app/core/models/BranchData'
import { User } from '@src/app/core/models/user'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  API_URL = environment.apiUrl;
  PREFIX = 'options/';

  constructor(private http: HttpClient) { }

  async getAll(searchColumn: string, searchQuery: string, page: number, size: number): Promise<BranchData> {
    const source = this.http.get<BranchData>(this.API_URL + this.PREFIX + 'user/?' +
      'searchColumn=' + searchColumn +
      '&searchQuery=' + searchQuery +
      '&page=' + page +
      '&limit=' + size
    );
    const result = await firstValueFrom(source);
    return result;
  }

  async getAt(id: number): Promise<User> {
    const source = this.http.get<User>(this.API_URL + this.PREFIX + 'user/' + id);
    const result = await firstValueFrom(source);
    return result;
  }

  async storeUser(user: User): Promise<any> {
    const source = this.http.post<any>(this.API_URL + this.PREFIX + 'user/', user );
    const result = await firstValueFrom(source);
    return result;
  }

  async updateUser(user: User): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'user/' + user.id, user );
    const result = await firstValueFrom(source);
    return result;
  }

  async passwordReset(user: User): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'user/password-reset/' + user.id, user );
    const result = await firstValueFrom(source);
    return result;
  }

  async disableUser(user: User): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'user/disable/' + user.id, {status: 'NO'} );
    const result = await firstValueFrom(source);
    return result;
  }

  async enableUser(user: User): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'user/enable/' + user.id, {status: 'SI'} );
    const result = await firstValueFrom(source);
    return result;
  }

  async updateTheme(id: number, themeMode: string): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'user/update-theme/' + id, {theme: themeMode});
    const result = await firstValueFrom(source);
    return result;
  }

  async verifyUserFolioEmail(user: string, folio: string, email: string): Promise<any> {
    const source = this.http.get<any>(this.API_URL + this.PREFIX + 'user-list/verify-user-folio-email/?' +
      'user=' + user +
      '&folio=' + folio +
      '&email=' + email
    );
    const result = await firstValueFrom(source);
    return result;
  }

  async getAllEnable(): Promise<User[]> {
    const source = this.http.get<User[]>(this.API_URL + this.PREFIX + 'user-list/all-enable/');
    const result = await firstValueFrom(source);
    return result;
  }

  async getAllEnableAgencies(): Promise<User[]> {
    const source = this.http.get<User[]>(this.API_URL + this.PREFIX + 'user-list/all-enable-agencies/');
    const result = await firstValueFrom(source);
    return result;
  }

  async updateUserGeneralInformation(user: User): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'user/update-general-information/' + user.id, user );
    const result = await firstValueFrom(source);
    return result;
  }

  async updateUserPassword(newPassword: any, user: User): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'user/update-password/' + user.id, newPassword );
    const result = await firstValueFrom(source);
    return result;
  }

  async verifyUserPassword(user_id: number, currentPassword: string): Promise<any> {
    const source = this.http.get<any>(this.API_URL + this.PREFIX + 'user-list/verify-password/' + user_id + '/' + currentPassword);
    const result = await firstValueFrom(source);
    return result;
  }
}
