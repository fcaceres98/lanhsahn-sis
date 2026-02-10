import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SpinnerOverlay } from '@src/app/shared/spinner-overlay/spinner-overlay';
import { SimpleNotificationsModule } from 'angular2-notifications';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, SpinnerOverlay, SimpleNotificationsModule],
    templateUrl: './app.html',
    styleUrl: './app.scss'
})
export class App {
}
