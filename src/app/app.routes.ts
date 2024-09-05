import { Routes } from '@angular/router';
import { LayoutComponent } from './modules/home/components/layout/layout.component';
import { LayoutComponent as MainLayoutComponent } from './modules/main/components/layout/layout.component';
import { LoginComponent } from './modules/login/login.component';
import { LayoutComponent as DoseLayoutComponent } from './modules/dose/layout/layout.component';
import { LayoutComponent as PatientLayoutComponent } from './modules/patient/components/layout/layout.component';
import { HelpDeskLayoutComponent } from './modules/help-desk/help-desk-layout/help-desk-layout.component';
import { LayoutAppChatComponent } from './modules/app-chat/layout-app-chat/layout-app-chat.component';

// Define the routes
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./modules/home/components/layout/layout.component').then(m => m.LayoutComponent),
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'app-chat',
    loadComponent: () => import('./modules/app-chat/layout-app-chat/layout-app-chat.component').then(m => m.LayoutAppChatComponent),
    loadChildren: () => import('./modules/app-chat/app-chat.module').then(m => m.AppChatModule)
  },
  {
    path: 'booking',
    loadComponent: () => import('./modules/patient/components/layout/layout.component').then(m => m.PatientLayoutComponent),
    loadChildren: () => import('./modules/patient/patient.module').then(m => m.PatientModule)
  },
  {
    path: 'management',
    loadComponent: () => import('./modules/main/components/layout/layout.component').then(m => m.MainLayoutComponent),
    loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule)
  },
  {
    path: 'auth',
    loadComponent: () => import('./modules/login/login.component').then(m => m.LoginComponent),
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'dose',
    loadComponent: () => import('./modules/dose/layout/layout.component').then(m => m.DoseLayoutComponent),
    loadChildren: () => import('./modules/dose/dose.module').then(m => m.DoseModule)
  },
  {
    path: 'help-desk',
    loadComponent: () => import('./modules/help-desk/help-desk-layout/help-desk-layout.component').then(m => m.HelpDeskLayoutComponent),
    loadChildren: () => import('./modules/help-desk/help-desk.module').then(m => m.HelpDeskModule)
  },
  {
    path: 'group-session',
    loadComponent: () => import('./modules/patient/components/layout/layout.component').then(m => m.PatientLayoutComponent),
    loadChildren: () => import('./modules/group-appt/group-appt.module').then(m => m.GroupApptModule)
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
