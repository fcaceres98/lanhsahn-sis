import { Routes } from '@angular/router';
import { Layout } from './pages/layout/layout';
import { Home } from './pages/home/home';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/control-panel',
        pathMatch: 'full'
    },
    {
        path: 'control-panel',
        component: Layout,
        children: [
            {
                path: '',
                component: Home
            }
        ]
    }
];