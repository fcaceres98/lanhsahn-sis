import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { NavItem } from '@src/app/core/models/navItem';

@Component({
  selector: 'app-menu-item',
  imports: [
    CommonModule,

    MatListModule,
    MatIconModule
  ],
  templateUrl: './menu-item.html',
  styleUrl: './menu-item.scss',
  animations: [
    trigger('indicatorRotate', [
            state('collapsed', style({ transform: 'rotate(0deg)' })),
            state('expanded', style({ transform: 'rotate(180deg)' })),
            transition('collapsed <=> expanded', animate('200ms ease-out'))
        ]
    )
  ]
})
export class MenuItem {
    @Input() item!: NavItem;
    @Input() depth = 0;
    expanded = false;

    constructor(public router: Router) {
        if (this.depth === undefined) {
            this.depth = 0;
        }
    }

    onItemSelected(item: NavItem): void {
        if (!item.children || !item.children.length) {
            this.router.navigate([item.route]);
        }
        if (item.children && item.children.length) {
            this.expanded = !this.expanded;
        }
    }
}
