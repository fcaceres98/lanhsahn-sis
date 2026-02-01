import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { FlexLayoutModule } from 'ngx-flexible-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';

import { User } from '@src/app/core/models/user';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [FlexLayoutModule, MatIconModule, MatButtonModule, MatToolbarModule, MatMenuModule, MatSlideToggleModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
    @Output() toggleMenu = new EventEmitter<void>();
    isChecked = false;
    user: User = {
        user: 'FFERNANDEZ',
        name: 'FAUSTO FERNANDEZ',
    }
    
    constructor() { }

    ngOnInit(): void {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.isChecked = prefersDark;
        this.applyTheme(prefersDark);
    }

    toogleSideBar(): void {
        this.toggleMenu.emit();
    }

    openUserProfile(): void {
        alert('¡Perfil de usuario! Esta función estará disponible pronto.');
    }

    async changeThemeMode(event: MatSlideToggleChange): Promise<void> {
        this.isChecked = event.checked;
        this.applyTheme(this.isChecked);
    }
    private applyTheme(isDark: boolean): void {
        document.body.classList.toggle('dark-mode', isDark);
    }

    ayuda(): void {
        alert('¡Gracias por querer ayudar! Esta función estará disponible pronto.');
    }

    logout(): void {
        alert('¡Gracias por usar la aplicación! Esta función estará disponible pronto.');
    }
}
