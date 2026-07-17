import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  pinned?: boolean;
  avatarInitials: string;
  avatarColor: string;
}

@Component({
  selector: 'app-conversations',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule,IonicModule],
  templateUrl: './conversations.page.html',
  styleUrls: ['./conversations.page.scss'],
})
export class ConversationsPage {
  searchTerm = '';

  // TODO: substituir por dados reais vindos do WebSocket/STOMP + API
  conversations: Conversation[] = [
    { id: '1', name: 'Luna', lastMessage: 'Oi! Tudo bem? Vamos conversar...', time: '09:41', unread: 2, online: true, avatarInitials: 'L', avatarColor: '#e786c9' },
    { id: '2', name: 'Família', lastMessage: 'Mãe: O almoço está pronto!', time: '08:15', unread: 5, online: false, avatarInitials: 'F', avatarColor: '#f2c879' },
    { id: '3', name: 'Lucas', lastMessage: 'Enviou uma foto', time: 'Ontem', unread: 0, online: false, avatarInitials: 'LC', avatarColor: '#4ade80' },
    { id: '4', name: 'Estudos', lastMessage: 'Você: Obrigado!', time: 'Ontem', unread: 0, online: false, pinned: true, avatarInitials: 'ES', avatarColor: '#6c5ce7' },
    { id: '5', name: 'Trabalho', lastMessage: 'Carlos: Reunião às 15h', time: 'Seg', unread: 0, online: false, avatarInitials: 'T', avatarColor: '#38bdf8' },
  ];

  get filtered(): Conversation[] {
    if (!this.searchTerm.trim()) return this.conversations;
    const term = this.searchTerm.toLowerCase();
    return this.conversations.filter(c => c.name.toLowerCase().includes(term));
  }

  constructor(private router: Router) {}

  openChat(conversation: Conversation) {
    this.router.navigate(['/chat', conversation.id]);
  }
}
