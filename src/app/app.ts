import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SimpleNotificationsModule } from 'angular2-notifications';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, SimpleNotificationsModule],
    templateUrl: './app.html',
    styleUrl: './app.scss'
})
export class App {
}
