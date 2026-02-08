import { Routes } from '@angular/router';
import { NotFound } from './shared/not-found/not-found';
import { NotFoundRoot } from './shared/not-found-root/not-found-root';

import { UserLogin } from './pages/login/user-login/user-login';

import { Layout } from './pages/layout/layout';
import { Home } from './pages/home/home';
import { Dashboard } from './pages/dashboard/dashboard';

import { ListBranches } from './pages/options/branches/list-branches/list-branches';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }, {
        path: 'login',
        component: UserLogin,
    }, {
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
            }, {
                path: 'options',
                children: [
                    {
                        path: '',
                        component: NotFound
                    }, {
                        path: 'branches',
                        component: ListBranches
                    }
                ]
            }, {
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