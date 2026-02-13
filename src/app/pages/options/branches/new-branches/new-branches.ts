import { Component, signal, OnInit, inject } from '@angular/core';

import { FlexLayoutModule } from 'ngx-flexible-layout';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators  } from '@angular/forms';

import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SpinnerOverlay } from '@src/app/shared/spinner-overlay/spinner-overlay';

import { Branch } from '@src/app/core/models/branch';
import { BranchesService } from '@src/app/core/services/branches.service';
import { SpinnerService } from '@src/app/core/services/spinner.service';

@Component({
    selector: 'app-new-branches',
    imports: [
        FlexLayoutModule,
        ReactiveFormsModule,

        MatDialogModule,
        MatCardModule,
        MatDividerModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,

        SpinnerOverlay
    ],
    templateUrl: './new-branches.html',
    styleUrl: './new-branches.scss',
})
export class NewBranches implements OnInit {
    private spinnerRef = inject(SpinnerService);

    isLoading = signal<boolean>(false);
    branch: Branch = {
        status: 1
    };
    form: FormGroup;

    constructor(
        private dialogRef: MatDialogRef<NewBranches>,
        private fb: FormBuilder,
        private notifications: NotificationsService,
        private branchesService: BranchesService,
    ) {
        this.form = this.fb.group({
            name: ['', Validators.required],
            direction: ['', Validators.required],
            telephone: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        //this.spinnerRef.show();
    }

    async onSubmit(): Promise<void> {
        if (this.form.valid) {
            this.isLoading.set(true);

            this.branch = {
                name: this.form.value.name,
                direction: this.form.value.direction,
                telephone: this.form.value.telephone,
                status: 1
            };
            await this.branchesService.storeBranch(this.branch).then(
                res => {
                    this.notifications.create("Éxito", "Sucursal creada correctamente.", NotificationType.Success, {
                        timeOut: 5000,
                        showProgressBar: true,
                        clickToClose: true,
                    });
                    
                    this.dialogRef.close(true);
                }, err => {
                    this.notifications.create("Error", JSON.stringify(err.message, null, 2), NotificationType.Error, {
                        timeOut: 5000,
                        showProgressBar: true,
                        clickToClose: true,
                    });
                }
            );

            this.isLoading.set(false);
        } else {
            this.notifications.create("Mensaje", "Por favor, complete todos los campos requeridos.", NotificationType.Warn, {
                timeOut: 5000,
                showProgressBar: true,
                clickToClose: true,
            });
        }
    }

    getErrorMessage(field: string): string {
        const control = this.form.get(field);

        if (control?.hasError('required')) {
            return 'Este campo es requerido';
        }

        return '';
    }

    close(refresh: boolean = true): void {
        this.dialogRef.close(refresh);
    }
}
