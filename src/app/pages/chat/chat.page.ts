import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

interface Message {
  id: string;
  text: string;
  time: string;
  fromMe: boolean;
  seen?: boolean;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  contactName = 'Luna';
  contactOnline = true;
  draft = '';

  // TODO: substituir por histórico real via REST + stream ao vivo via WebSocket/STOMP
  messages: Message[] = [
    { id: '1', text: 'Oi Sávio! 🌙', time: '09:36', fromMe: false },
    { id: '2', text: 'Oi Luna! Tudo bem?', time: '09:36', fromMe: true, seen: true },
    { id: '3', text: 'Tudo bem sim! E você?', time: '09:37', fromMe: false },
    { id: '4', text: 'Estou ótimo! Que bom falar com você 💜', time: '09:37', fromMe: true, seen: true },
    { id: '5', text: 'Vamos fazer uma chamada de vídeo?', time: '09:38', fromMe: true, seen: true },
    { id: '6', text: 'Vamos sim! 😍', time: '09:38', fromMe: false },
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    // TODO: carregar contato/histórico real usando o id da rota
  }

  send() {
    const text = this.draft.trim();
    if (!text) return;
    this.messages.push({
      id: Date.now().toString(),
      text,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      fromMe: true,
    });
    this.draft = '';
  }

  goBack() {
    this.router.navigateByUrl('/conversations');
  }
}
