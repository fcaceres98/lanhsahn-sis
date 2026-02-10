import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
    selector: 'app-not-found-root',
    imports: [
        RouterModule,
        MatButtonModule
    ],
    templateUrl: './not-found-root.html',
    styleUrl: './not-found-root.scss',
    animations: [
        trigger('fadeIn', [
            state('void', style({ opacity: 0 })),
            transition(':enter', [
                animate('1s ease-in', style({ opacity: 1 }))
            ])
        ]),
        trigger('slideUp', [
            state('void', style({ transform: 'translateY(30px)', opacity: 0 })),
            transition(':enter', [
                animate('0.8s 0.3s ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
            ])
        ])
    ]
})
export class NotFoundRoot {

}
