import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';

import { HeaderComponent } from '@src/app/shared/header/header.component';
import { MenuComponent } from '@src/app/shared/menu/menu.component';
import { FooterComponent } from '@src/app/shared/footer/footer.component';

@Component({
    selector: 'app-layout',
    imports: [
    RouterOutlet,
    
    MatSidenavModule,
    
    HeaderComponent,
    MenuComponent,
    FooterComponent,
],
    templateUrl: './layout.html',
    styleUrl: './layout.scss',
})
export class Layout {
    sideBarOpen = true;
    isDark = true;
    theme = 'LightMode';

    sideBarToogler($event: any): void {
        this.sideBarOpen = !this.sideBarOpen;
    }

    closeSideBar(): void {
        this.sideBarOpen = false;
    }

    switchTheme(thememMode: any): void {
        this.isDark = thememMode;
        this.theme = ( this.isDark ) ? 'DarkMode' : 'LightMode';
    }
}
