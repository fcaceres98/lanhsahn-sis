import { Component, inject } from '@angular/core';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SpinnerService } from '@src/app/core/services/spinner.service';

@Component({
    selector: 'app-spinner-overlay',
    imports: [
        MatProgressSpinnerModule
    ],
    templateUrl: './spinner-overlay.html',
    styleUrl: './spinner-overlay.scss',
})
export class SpinnerOverlay {

    spinnerService = inject(SpinnerService);
}
