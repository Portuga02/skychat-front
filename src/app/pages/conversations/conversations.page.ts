import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { VideoCallComponent } from '../../components/video-call/video-call.component';
import { VoiceCallComponent } from '../../components/voice-call/voice-call.component';
import { ShellComponent } from '../../components/shell/shell.component';

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

interface Message {
  id: string;
  text: string;
  time: string;
  fromMe: boolean;
  seen?: boolean;
}

const DESKTOP_BREAKPOINT = 961;

@Component({
  selector: 'app-conversations',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, VideoCallComponent, VoiceCallComponent, ShellComponent, RouterLink],
  templateUrl: './conversations.page.html',
  styleUrls: ['./conversations.page.scss'],
})
export class ConversationsPage {
  searchTerm = '';
  selected: Conversation | null = null;
  draft = '';
  showVideoCall = false;
  showVoiceCall = false;

  // TODO: substituir por dados reais vindos do WebSocket/STOMP + API
  conversations: Conversation[] = [
    { id: '1', name: 'Luna', lastMessage: 'Oi! Tudo bem? Vamos conversar...', time: '09:41', unread: 2, online: true, avatarInitials: 'L', avatarColor: '#e786c9' },
    { id: '2', name: 'Família', lastMessage: 'Mãe: O almoço está pronto!', time: '08:15', unread: 5, online: false, avatarInitials: 'F', avatarColor: '#f2c879' },
    { id: '3', name: 'Lucas', lastMessage: 'Enviou uma foto', time: 'Ontem', unread: 0, online: false, avatarInitials: 'LC', avatarColor: '#4ade80' },
    { id: '4', name: 'Estudos', lastMessage: 'Você: Obrigado!', time: 'Ontem', unread: 0, online: false, pinned: true, avatarInitials: 'ES', avatarColor: '#6c5ce7' },
    { id: '5', name: 'Trabalho', lastMessage: 'Carlos: Reunião às 15h', time: 'Seg', unread: 0, online: false, avatarInitials: 'T', avatarColor: '#38bdf8' },
  ];

  // TODO: carregar histórico real por conversa via REST + STOMP
  messagesByConversation: Record<string, Message[]> = {
    '1': [
      { id: '1', text: 'Oi Sávio! 🌙', time: '09:36', fromMe: false },
      { id: '2', text: 'Oi Luna! Tudo bem?', time: '09:36', fromMe: true, seen: true },
      { id: '3', text: 'Tudo bem sim! E você?', time: '09:37', fromMe: false },
      { id: '4', text: 'Estou ótimo! Que bom falar com você 💜', time: '09:37', fromMe: true, seen: true },
      { id: '5', text: 'Vamos fazer uma chamada de vídeo?', time: '09:38', fromMe: true, seen: true },
      { id: '6', text: 'Vamos sim! 😍', time: '09:38', fromMe: false },
    ],
  };

  get filtered(): Conversation[] {
    if (!this.searchTerm.trim()) return this.conversations;
    const term = this.searchTerm.toLowerCase();
    return this.conversations.filter(c => c.name.toLowerCase().includes(term));
  }

  get activeMessages(): Message[] {
    return this.selected ? (this.messagesByConversation[this.selected.id] || []) : [];
  }

  constructor(private router: Router) {}

  isDesktop(): boolean {
    return window.innerWidth >= DESKTOP_BREAKPOINT;
  }

  openChat(conversation: Conversation) {
    if (this.isDesktop()) {
      this.selected = conversation;
    } else {
      this.router.navigate(['/chat', conversation.id]);
    }
  }

  send() {
    const text = this.draft.trim();
    if (!text || !this.selected) return;
    const list = this.messagesByConversation[this.selected.id] || [];
    list.push({
      id: Date.now().toString(),
      text,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      fromMe: true,
    });
    this.messagesByConversation[this.selected.id] = list;
    this.draft = '';
  }

  startVideoCall() {
    this.showVideoCall = true;
  }

  endVideoCall() {
    this.showVideoCall = false;
  }

  startVoiceCall() {
    this.showVoiceCall = true;
  }

  endVoiceCall() {
    this.showVoiceCall = false;
  }
  sair() {
    // Remove os dados do usuário salvos no login
    localStorage.removeItem('usuario_logado');

    // Redireciona de volta para a tela de login
    this.router.navigateByUrl('/login');
  }
}
