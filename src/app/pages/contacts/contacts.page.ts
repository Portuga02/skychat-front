import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ShellComponent } from '../../components/shell/shell.component';

interface Contact {
  id: string;
  name: string;
  status: string;
  online: boolean;
  avatarInitials: string;
  avatarColor: string;
  favorite?: boolean;
}

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, ShellComponent],
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage {
  searchTerm = '';

  // TODO: substituir por lista real vinda da API (endpoint de contatos/amigos)
  contacts: Contact[] = [
    { id: '1', name: 'Luna', status: 'Disponível para conversar', online: true, avatarInitials: 'L', avatarColor: '#e786c9', favorite: true },
    { id: '2', name: 'Lucas Costa', status: 'Ocupado', online: false, avatarInitials: 'LC', avatarColor: '#4ade80' },
    { id: '3', name: 'Estudos (grupo)', status: '12 participantes', online: false, avatarInitials: 'ES', avatarColor: '#6c5ce7' },
    { id: '4', name: 'Maria Fernanda', status: 'Online', online: true, avatarInitials: 'M', avatarColor: '#f2894e' },
    { id: '5', name: 'Trabalho (grupo)', status: '5 participantes', online: false, avatarInitials: 'T', avatarColor: '#38bdf8' },
    { id: '6', name: 'Carlos Eduardo', status: 'Visto por último às 08:20', online: false, avatarInitials: 'C', avatarColor: '#f2c879' },
  ];

  get filtered(): Contact[] {
    if (!this.searchTerm.trim()) return this.contacts;
    const term = this.searchTerm.toLowerCase();
    return this.contacts.filter(c => c.name.toLowerCase().includes(term));
  }

  constructor(private router: Router) {}

  openConversation(contact: Contact) {
    // TODO: se não existir conversa com esse contato, criar uma nova antes de navegar
    this.router.navigate(['/chat', contact.id]);
  }
}
