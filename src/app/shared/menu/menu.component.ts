import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatListModule } from '@angular/material/list';

import { MenuItem } from '@src/app/shared/menu-item/menu-item';

import { NavItem } from '@src/app/core/models/navItem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [
        CommonModule,
        MatListModule,

        MenuItem
    ],
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {

    navItems: NavItem[] = [];

    ngOnInit(): void {
        this.getProfile();
    }

    getProfile(): void {
        this.navItems = [
            {
                id: "home",
                displayName: "Inicio",
                iconName: "home",
                route: "control-panel/home",
                enabled: true
            }, {
                id: "dashboard",
                displayName: "Tablero",
                iconName: "dashboard",
                route: "control-panel/dashboard",
                enabled: true
            }, {
                id: "settings",
                displayName: "Opciones",
                iconName: "settings",
                route: "control-panel/options",
                enabled: true,
                children: [
                    {
                        id: "settings-branches",
                        displayName: "Sucursales",
                        iconName: "keyboard_arrow_right",
                        route: "control-panel/options/branches",
                        enabled: true
                    }, {
                        id: "settings-groups",
                        displayName: "Grupos",
                        iconName: "keyboard_arrow_right",
                        route: "control-panel/options/groups",
                        enabled: true
                    }, {
                        id: "settings-cai",
                        displayName: "CAI",
                        iconName: "keyboard_arrow_right",
                        route: "control-panel/options/cai",
                        enabled: true
                    }, {
                        id: "settings-users",
                        displayName: "Usuarios",
                        iconName: "keyboard_arrow_right",
                        route: "control-panel/options/users",
                        enabled: true
                    }, {
                        id: "settings-destinations",
                        displayName: "Destinos de Vuelo",
                        iconName: "keyboard_arrow_right",
                        route: "control-panel/options/destinations",
                        enabled: true,
                        children: [
                            {
                                id: "settings-destinations-flights",
                                displayName: "Destinos",
                                iconName: "keyboard_arrow_right",
                                route: "control-panel/options/destinations-flights",
                                enabled: true
                            }, {
                                id: "settings-destinations-flights-charters",
                                displayName: "Destinos Charter",
                                iconName: "keyboard_arrow_right",
                                route: "control-panel/options/destinations-flights-charters",
                                enabled: true
                            }
                        ]
                    }, {
                        id: "settings-parcels",
                        displayName: "Encomiendas",
                        iconName: "keyboard_arrow_right",
                        route: "control-panel/options/parcels",
                        enabled: true,
                        children: [
                            {
                                id: "settings-parcels-prices-fixed",
                                displayName: "Precios Fijos",
                                iconName: "keyboard_arrow_right",
                                route: "control-panel/options/parcels-prices-fixed",
                                enabled: true
                            }, {
                                id: "settings-parcels-prices-pound",
                                displayName: "Peso por Libra",
                                iconName: "keyboard_arrow_right",
                                route: "control-panel/options/parcels-prices-pound",
                                enabled: true
                            }
                        ]
                    }, {
                        id: "settings-clients",
                        displayName: "Clientes",
                        iconName: "keyboard_arrow_right",
                        route: "control-panel/options/clients",
                        enabled: true
                    }, {
                        id: "settings-travel-agency",
                        displayName: "Agencias de Viaje",
                        iconName: "keyboard_arrow_right",
                        route: "control-panel/options/travel-agency",
                        enabled: true
                    }, {
                        id: "settings-configuration",
                        displayName: "Configuración",
                        iconName: "keyboard_arrow_right",
                        route: "control-panel/options/settings",
                        enabled: true
                    }
                ]
            }
        ];
    }

    onImageError(event: Event): void {
        const img = event.target as HTMLImageElement;
        img.src = '/assets/images/user-profile/108.jpg'; // or any default image
    }

}
