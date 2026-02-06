import { Component } from '@angular/core';

import { FlexLayoutModule } from 'ngx-flexible-layout';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
    selector: 'app-home',
    imports: [FlexLayoutModule, MatCardModule, MatListModule],
    templateUrl: './home.html',
    styleUrl: './home.scss',
})
export class Home {
}
