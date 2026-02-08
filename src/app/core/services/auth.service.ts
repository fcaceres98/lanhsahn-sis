import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { environment } from '@src/app/core/environments/environment';

import { MatSnackBar } from '@angular/material/snack-bar';

export interface LocalAuth {
  res?: boolean;
  token?: string;
  token_type?: String;
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

  private STORAGE_KEY = '**LANHSA@JWT**';
  API_URL = environment.apiUrl;
  PREFIX = 'auth/';

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) { }

  getLocalAuth(): LocalAuth {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
  }

  setLocalAuth(localauth: LocalAuth): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(localauth));
  }

  destroyLocalAuth(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  async isLogged(): Promise<LocalAuth> {
    const source = this.http.get<LocalAuth>(this.API_URL + this.PREFIX + 'islogged/');
    const result = await firstValueFrom(source);
    return result;
  }
  
  async login(data: any): Promise<LocalAuth> {
    const source = this.http.post<LocalAuth>(this.API_URL + this.PREFIX + 'login/', data);
    const result = await firstValueFrom(source);
    return result;
  }

  async logout(): Promise<LocalAuth> {
    const source = this.http.get<LocalAuth>(this.API_URL + this.PREFIX + 'logout/');
    const result = await firstValueFrom(source);
    return result;
  }

  async verifySession(): Promise<void> {
    await this.isLogged().then(
      res => {
        if (res.message === 'Unauthenticated') {
          this.goToLogin();
        } else {
          if (!res.res) {
            this.goToLogin();
          }
        }
      }, err => {
        const snackBarRef = this.snackBar.open('Ocurrio un problema. ' + err.message, 'Cerrar', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
          panelClass: ['error-snackbar'],
        });
        snackBarRef.afterDismissed().subscribe(() => {
          setTimeout(() => {
          }, 0);
        });
        snackBarRef.onAction().subscribe(() => {
        });

        this.goToLogin();
      }
    )
  }

  goToLogin(): void {
    this.router.navigate( ['/'] );
  }
}
