import { Component, signal, OnInit } from '@angular/core';

import { FlexLayoutModule } from 'ngx-flexible-layout';
import { SimpleNotificationsModule, NotificationsService, NotificationType } from 'angular2-notifications';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { BranchData } from '@src/app/core/models/BranchData';
import { Branch } from '@src/app/core/models/branch';
import { BranchesService } from '@src/app/core/services/branches.service';
import { AuthService, LocalAuth } from '@src/app/core/services/auth.service';

@Component({
    selector: 'app-branches',
    imports: [
        FlexLayoutModule,
        SimpleNotificationsModule,
        FormsModule,
        ReactiveFormsModule,

        MatCardModule,
        MatDividerModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatMenuModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './branches.html',
    styleUrl: './branches.scss',
})
export class Branches implements OnInit {

    localAuth!: LocalAuth;
    columnDisplay = 'Nombre';
    column = 'name';
    query = '';

    isLoading = signal<boolean>(true);
    dataSource: BranchData = {
        current_page: 0,
        data: [],
        first_page_url: '',
        from: 0,
        last_page: 0,
        last_page_url: '',
        links: {
            url: '',
            label: '',
            active: false
        },
        next_page_url: '',
        path: '',
        per_page: 0,
        prev_page_url: '',
        to: 0,
        total: 0,
        page: 0,
        pageSize: 0
    };
    columnsToDisplay: string[] = ['id', 'name', 'direction', 'telephone', 'options'];
    pageEvent: PageEvent = new PageEvent();

    constructor(
        private branchesService: BranchesService,
        private notifications: NotificationsService,
        private authService: AuthService
    ) { }

    async ngOnInit(): Promise<void> {
        this.pageEvent.pageIndex = 0;
        this.pageEvent.pageSize = 10;
        this.columnDisplay = 'Nombre';

        await this.get();
    }
    
    async get(): Promise<void> {
        this.isLoading.set(true);

        await this.branchesService.getAll(this.column, this.query, this.pageEvent.pageIndex + 1, this.pageEvent.pageSize).then(
            res => {
                this.dataSource = res;

                this.isLoading.set(false);
            }, err => {
                this.notifications.create("Error", JSON.stringify(err.message, null, 2), NotificationType.Error, {
                    timeOut: 5000,
                    showProgressBar: true,
                    clickToClose: true,
                });

                this.isLoading.set(false);
            }
        );
    }

    applyFilter(event: Event): void {
        this.query = (event.target as HTMLInputElement).value;
        this.get();
    }

    async refresh(): Promise<void> {
        this.isLoading.set(true);

        await this.branchesService.getAll(this.column, this.query, this.pageEvent.pageIndex + 1, this.pageEvent.pageSize).then(
            res => {
                this.dataSource = res;

                this.notifications.create("Mensaje", "Se actualizo exitosamente.", NotificationType.Success, {
                    timeOut: 5000,
                    showProgressBar: true,
                    clickToClose: true,
                });

                this.isLoading.set(false);
            }, err => {
                this.notifications.create("Error", JSON.stringify(err.message, null, 2), NotificationType.Error, {
                    timeOut: 5000,
                    showProgressBar: true,
                    clickToClose: true,
                });

                this.isLoading.set(false);
            }
        );
    }

    async onPaginateChange(event: PageEvent): Promise<void> {
        this.isLoading.set(true);

        await this.branchesService.getAll(this.column, this.query, this.pageEvent.pageIndex + 1, this.pageEvent.pageSize).then(
            res => {
                this.dataSource = res;

                this.isLoading.set(false);
            }, err => {
                this.notifications.create("Error", JSON.stringify(err.message, null, 2), NotificationType.Error, {
                    timeOut: 5000,
                    showProgressBar: true,
                    clickToClose: true,
                });

                this.isLoading.set(false);
            }
        );
    }

    getColor(i: number, row: Branch): string {
    if (row.status === 0) {
            return 'disable-row';
        } else {
            if (i % 2 === 0) {
                return 'even-row';
            } else {
                return 'offset-row';
            }
        }
    }

    setColumnFilter(columnDisplay: string, column: string): void {
        this.columnDisplay = columnDisplay;
        this.column = column;
    }

    add(): void {
        console.log("Adding a new branch.");
    }

    show(element: Branch): void {
        console.log("Showing branch details:", element);
    }

    edit(element: Branch): void {
        console.log("Editing branch:", element);
    }

    disable(element: Branch): void {
        console.log("Disabling branch:", element);
    }

    enable(element: Branch): void {
        console.log("Enabling branch:", element);
    }

}
