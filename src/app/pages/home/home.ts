import { Component, OnInit, signal } from '@angular/core';

import { FlexLayoutModule } from 'ngx-flexible-layout';
import { NotificationsService, NotificationType } from 'angular2-notifications';

import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

import { AuthService, LocalAuth } from '@src/app/core/services/auth.service';
import { UsersService } from '@src/app/core/services/users.service';
import { User } from '@src/app/core/models/user';

@Component({
    selector: 'app-home',
    imports: [
        FlexLayoutModule,

        MatCardModule,
        MatListModule
    ],
    templateUrl: './home.html',
    styleUrl: './home.scss',
})
export class Home implements OnInit {

    localAuth!: LocalAuth;
    user = signal<User>({
        name: '',
        email: '',
        branch: {
            name: ''
        }
    });

    constructor(
        private authService: AuthService,
        private usersService: UsersService,
        private notifications: NotificationsService
    ) { }

    async ngOnInit(): Promise<void> {
        await this.authService.verifyLogin();

        this.localAuth = this.authService.getLocalAuth();
        await this.getUser();
    }
    
    async getUser(): Promise<void> {
        await this.usersService.getAt(Number(this.localAuth.idU || '-1')).then(
            res => {
                this.user.set(res);
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
