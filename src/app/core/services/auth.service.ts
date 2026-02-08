import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { environment } from '@src/app/core/environments/environment';

import { NotificationsService, NotificationType } from 'angular2-notifications';

export interface LocalAuth {
    res?: boolean;
    token?: string;
    token_type?: String;
    expires_at?: string;
    idU?: string;
    idG?: string;
    idS?: string;
    lang?: string;
    theme?: string;
    message: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private STORAGE_KEY = '**LANHSA@BT**';
    API_URL = environment.apiUrl;
    PREFIX = 'auth/';

    constructor(
        private http: HttpClient,
        private router: Router,
        private notifications: NotificationsService
    ) { }

    getLocalAuth(): LocalAuth {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || JSON.stringify({res: false, token: 'undefined', message: 'No local auth found'}) );
    }

    setLocalAuth(localauth: LocalAuth): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(localauth));
    }

    destroyLocalAuth(): void {
        localStorage.removeItem(this.STORAGE_KEY);
    }

    async isLogged(): Promise<LocalAuth> {
        const source = this.http.get<LocalAuth>(this.API_URL + this.PREFIX + 'is-logged/');
        const result = await firstValueFrom(source);
        return result;
    }

    async login(data: any): Promise<LocalAuth> {
        const source = this.http.post<LocalAuth>(this.API_URL + this.PREFIX + 'login/', data);
        const result = await firstValueFrom(source);
        this.setLocalAuth(result);
        return result;
    }

    async logout(): Promise<LocalAuth> {
        const source = this.http.get<LocalAuth>(this.API_URL + this.PREFIX + 'logout/');
        const result = await firstValueFrom(source);
        return result;
    }

    async verifySession(): Promise<LocalAuth> {
        const auth = this.getLocalAuth();
        if (!auth.token) {
            return { res: false, message: 'No token found' };
        }
        const source = this.http.get<LocalAuth>(this.API_URL + this.PREFIX + 'verify-session/?token=' + auth.token);
        const result = await firstValueFrom(source);
        return result;
    }

    goToLogin(): void {
        this.router.navigate( ['/'] );
    }

    async verifyLogin(): Promise<void> {
        await this.verifySession().then(
            res => {
                if (!res.res) {
                    this.destroyLocalAuth();
                    this.goToLogin();
                }
            }, err => {
                this.notifications.create("Error", JSON.stringify(err.message, null, 2), NotificationType.Error, {
                    timeOut: 5000,
                    showProgressBar: true,
                    clickToClose: true,
                });
            }
        );
    }
}
