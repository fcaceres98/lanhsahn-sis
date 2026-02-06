import { Routes } from '@angular/router';
import { NotFound } from './shared/not-found/not-found';
import { NotFoundRoot } from './shared/not-found-root/not-found-root';
import { Layout } from './pages/layout/layout';
import { Home } from './pages/home/home';
import { Dashboard } from './pages/dashboard/dashboard';

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
            }, {
                path: 'home',
                component: Home
            }, {
                path: 'dashboard',
                component: Dashboard
            },{
                path: '404',
                component: NotFound
            }, {
                path: '**',
                redirectTo: '404'
            }
        ]
    }, {
        path: '404',
        component: NotFoundRoot
    },{
        path: '**',
        redirectTo: '404'
    }
];