import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: 'register',
        loadComponent: () => import('./components/register.component').then(m => m.RegisterComponent)
    },{
        path: 'login',
        loadComponent: () => import('./components/login.component').then(m => m.LoginComponent)
    },{
        path: 'feed',
        loadComponent: () => import('./components/social/feed.component').then(m => m.FeedComponent)
    },{
        path: 'profile',
        loadComponent: () => import('./components/profile.component').then(m => m.ProfileComponent)
    },{
        path: 'tasks',
        loadComponent: () => import('./components/tasks/tasks.component').then(m => m.TasksComponent)
    },{
        path: '**',
        redirectTo: 'feed'
    }
];
