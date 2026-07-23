import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

interface Contact {
  id: string;
  name: string;
  online: boolean;
  avatarInitials: string;
  avatarColor: string;
}

@Component({
  selector: 'app-new-conversation',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './new-conversation.page.html',
  styleUrls: ['./new-conversation.page.scss'],
})
export class NewConversationPage {
  searchTerm = '';

  // TODO: substituir por contatos reais vindos da API
  contacts: Contact[] = [
    { id: '1', name: 'Luna', online: true, avatarInitials: 'L', avatarColor: '#e786c9' },
    { id: '2', name: 'Lucas Costa', online: false, avatarInitials: 'LC', avatarColor: '#4ade80' },
    { id: '4', name: 'Maria Fernanda', online: true, avatarInitials: 'M', avatarColor: '#f2894e' },
    { id: '6', name: 'Carlos Eduardo', online: false, avatarInitials: 'C', avatarColor: '#f2c879' },
  ];

  get filtered(): Contact[] {
    if (!this.searchTerm.trim()) return this.contacts;
    const term = this.searchTerm.toLowerCase();
    return this.contacts.filter(c => c.name.toLowerCase().includes(term));
  }

  constructor(private router: Router) {}

  startChat(contact: Contact) {
    // TODO: criar a conversa de verdade via API antes de navegar, se ainda não existir
    this.router.navigate(['/chat', contact.id]);
  }

  close() {
    this.router.navigateByUrl('/conversations');
  }
}
