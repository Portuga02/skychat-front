import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';

export type ShellTab = 'conversations' | 'calls' | 'contacts' | 'files' | 'settings';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink],
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent {
  @Input() activeTab: ShellTab = 'conversations';
  @Input() userName = 'Sávio';
  @Input() userOnline = true;
  @Input() unreadConversations = 3;

  darkMode = true;

  // TODO: ligar no mesmo serviço de tema usado em settings.page.ts, hoje são independentes
  setTheme(dark: boolean) {
    this.darkMode = dark;
  }
}
