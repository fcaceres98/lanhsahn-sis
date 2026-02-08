import { Component, OnInit, signal } from '@angular/core';

import { FlexLayoutModule } from 'ngx-flexible-layout';
import { SimpleNotificationsModule, NotificationsService, NotificationType } from 'angular2-notifications';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AuthService } from '@src/app/core/services/auth.service';

@Component({
    selector: 'app-user-login',
    imports: [
        FlexLayoutModule,
        SimpleNotificationsModule,
        ReactiveFormsModule,

        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './user-login.html',
    styleUrl: './user-login.scss',
})
export class UserLogin implements OnInit {

    loginForm: FormGroup;
    hidePassword = true;
    isLoading = signal(false);

    constructor(
        private authService: AuthService,
        private fb: FormBuilder,
        private router: Router,
        private notifications: NotificationsService
    ) {
        this.loginForm = this.fb.group({
            user: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    async ngOnInit(): Promise<void> {
        await this.verifySession();
    }

    async onSubmit(): Promise<void> {
        if (this.loginForm.valid) {
            // console.log('Form data:', this.loginForm.value);
            this.isLoading.set(true);

            await this.authService.login(this.loginForm.value).then(
                res => {
                    if (res.res) {
                        this.notifications.create("Éxito", "Inicio de sesión exitoso", NotificationType.Success, {
                            timeOut: 3000,
                            showProgressBar: true,
                            clickToClose: true,
                        });

                        this.isLoading.set(false);
                        this.router.navigate(['/control-panel']);
                    } else {
                        this.isLoading.set(false);
                        this.notifications.create("Mensaje", JSON.stringify(res.message, null, 2), NotificationType.Warn, {
                            timeOut: 5000,
                            showProgressBar: true,
                            clickToClose: true,
                        });
                    }
                }, err => {
                    this.isLoading.set(false);
                    this.notifications.create("Error", JSON.stringify(err.message, null, 2), NotificationType.Error, {
                        timeOut: 5000,
                        showProgressBar: true,
                        clickToClose: true,
                    });
                }
            );
        }
    }

    getErrorMessage(field: string): string {
        const control = this.loginForm.get(field);

        if (control?.hasError('required')) {
            return 'Este campo es requerido';
        }

        if (control?.hasError('email')) {
            return 'Email inválido';
        }

        if (control?.hasError('minlength')) {
            return 'Mínimo 6 caracteres';
        }

        return '';
    }

    async verifySession(): Promise<void> {
        await this.authService.verifySession().then(
            res => {
                if (res.res) {
                    this.router.navigate(['/control-panel']);
                } else {
                    this.authService.destroyLocalAuth();
                    this.notifications.create("Mensaje", JSON.stringify(res.message, null, 2), NotificationType.Warn, {
                        timeOut: 5000,
                        showProgressBar: true,
                        clickToClose: true,
                    });
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
