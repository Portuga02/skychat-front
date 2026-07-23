import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage),
  },
  {
    path: 'conversations',
    loadComponent: () => import('./pages/conversations/conversations.page').then(m => m.ConversationsPage),
  },
  {
    path: 'new-conversation',
    loadComponent: () => import('./pages/new-conversation/new-conversation.page').then(m => m.NewConversationPage),
  },
  {
    path: 'chat/:id',
    loadComponent: () => import('./pages/chat/chat.page').then(m => m.ChatPage),
  },
  {
    path: 'calls',
    loadComponent: () => import('./pages/calls/calls.page').then(m => m.CallsPage),
  },
  {
    path: 'contacts',
    loadComponent: () => import('./pages/contacts/contacts.page').then(m => m.ContactsPage),
  },
  {
    path: 'files',
    loadComponent: () => import('./pages/files/files.page').then(m => m.FilesPage),
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.page').then(m => m.SettingsPage),
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then(m => m.ProfilePage),
  },
];
