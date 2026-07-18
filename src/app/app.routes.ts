import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'conversations',
    loadComponent: () => import('./pages/conversations/conversations.page').then(m => m.ConversationsPage),
  },
  {
    path: 'chat/:id',
    loadComponent: () => import('./pages/chat/chat.page').then(m => m.ChatPage),
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.page').then(m => m.SettingsPage),
  },
];
