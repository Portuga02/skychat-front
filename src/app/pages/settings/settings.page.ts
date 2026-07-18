import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ShellComponent } from '../../components/shell/shell.component';

type StatusKey = 'online' | 'away' | 'busy' | 'invisible';

interface StatusOption {
  key: StatusKey;
  label: string;
  description: string;
  color: string;
}

interface AccentColor {
  name: string;
  hex: string;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, IonicModule, ShellComponent],
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  selectedStatus: StatusKey = 'online';
  selectedAccent = '#6c5ce7';
  darkMode = true;

  statusOptions: StatusOption[] = [
    { key: 'online', label: 'Online', description: 'Disponível para conversar', color: '#4ade80' },
    { key: 'away', label: 'Ausente', description: 'Volto em breve', color: '#f2c879' },
    { key: 'busy', label: 'Ocupado', description: 'Não quero ser interrompido', color: '#ef4444' },
    { key: 'invisible', label: 'Invisível', description: 'Aparecer offline', color: '#6b729c' },
  ];

  accentColors: AccentColor[] = [
    { name: 'Roxo', hex: '#6c5ce7' },
    { name: 'Azul', hex: '#38bdf8' },
    { name: 'Verde', hex: '#4ade80' },
    { name: 'Rosa', hex: '#e786c9' },
    { name: 'Laranja', hex: '#f2894e' },
  ];

  // TODO: persistir escolha (localStorage do app / preferências do usuário na API)
  setStatus(status: StatusKey) {
    this.selectedStatus = status;
  }

  setAccent(hex: string) {
    this.selectedAccent = hex;
    document.documentElement.style.setProperty('--sky-purple', hex);
    document.documentElement.style.setProperty('--ion-color-primary', hex);
  }

  setTheme(dark: boolean) {
    this.darkMode = dark;
    // TODO: alternar classe de tema claro/escuro real no documentElement
  }
}
