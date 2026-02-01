import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '@src/app/core/environments/environment';

import { SystemSettings } from '@src/app/core/models/systemSettings';

@Injectable({
  providedIn: 'root'
})
export class SystemSettingsService {

  API_URL = environment.apiUrl;
  PREFIX = 'options/';

  constructor(private http: HttpClient) { }
  
  async getAll(systemsettingsid: number): Promise<any> {
    const source = this.http.get<any>(this.API_URL + this.PREFIX + 'system-settings/get-all/' + systemsettingsid );
    const result = await firstValueFrom(source);
    return result;
  }

  async getGeneralInformation(systemsettingsid: number): Promise<any> {
    const source = this.http.get<any>(this.API_URL + this.PREFIX + 'system-settings/get-general-information/' + systemsettingsid );
    const result = await firstValueFrom(source);
    return result;
  }

  async updateGeneralInformation(systemsettings: SystemSettings): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'system-settings/update-general-information/' + systemsettings.id, systemsettings );
    const result = await firstValueFrom(source);
    return result;
  }

  async getParameters(systemsettingsid: number): Promise<any> {
    const source = this.http.get<any>(this.API_URL + this.PREFIX + 'system-settings/get-parameters/' + systemsettingsid );
    const result = await firstValueFrom(source);
    return result;
  }

  async updateParameters(systemsettings: SystemSettings): Promise<any> {
    const source = this.http.put<any>(this.API_URL + this.PREFIX + 'system-settings/update-parameters/' + systemsettings.id, systemsettings );
    const result = await firstValueFrom(source);
    return result;
  }

}
