import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ShellComponent } from '../../components/shell/shell.component';

type CallType = 'incoming' | 'outgoing' | 'missed';
type CallKind = 'voice' | 'video';

interface CallEntry {
  id: string;
  name: string;
  time: string;
  type: CallType;
  kind: CallKind;
  avatarInitials: string;
  avatarColor: string;
}

@Component({
  selector: 'app-calls',
  standalone: true,
  imports: [CommonModule, IonicModule, ShellComponent],
  templateUrl: './calls.page.html',
  styleUrls: ['./calls.page.scss'],
})
export class CallsPage {
  // TODO: substituir por histórico real vindo da API
  calls: CallEntry[] = [
    { id: '1', name: 'Luna', time: 'Hoje, 09:38', type: 'outgoing', kind: 'video', avatarInitials: 'L', avatarColor: '#e786c9' },
    { id: '2', name: 'Lucas Costa', time: 'Hoje, 08:02', type: 'missed', kind: 'voice', avatarInitials: 'LC', avatarColor: '#4ade80' },
    { id: '3', name: 'Maria Fernanda', time: 'Ontem, 19:45', type: 'incoming', kind: 'voice', avatarInitials: 'M', avatarColor: '#f2894e' },
    { id: '4', name: 'Carlos Eduardo', time: 'Ontem, 15:10', type: 'outgoing', kind: 'video', avatarInitials: 'C', avatarColor: '#f2c879' },
    { id: '5', name: 'Luna', time: 'Seg, 20:12', type: 'missed', kind: 'video', avatarInitials: 'L', avatarColor: '#e786c9' },
  ];

  iconFor(call: CallEntry): string {
    if (call.type === 'missed') return 'call-outline';
    return call.type === 'outgoing' ? 'arrow-up-outline' : 'arrow-down-outline';
  }

  redial(call: CallEntry) {
    // TODO: iniciar chamada real (voz ou vídeo) via WebRTC com esse contato
  }
}
