import { Component } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

@Component({
    selector: 'app-home',
    imports: [MatCardModule, MatChipsModule],
    templateUrl: './home.html',
    styleUrl: './home.scss',
})
export class Home {
    longText = `The Chihuahua is a Mexican breed of toy dog. It is named for the
    Mexican state of Chihuahua and is among the smallest of all dog breeds. It is
    usually kept as a companion animal or for showing.`;
}
