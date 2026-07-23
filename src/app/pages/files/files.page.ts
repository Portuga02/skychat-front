import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ShellComponent } from '../../components/shell/shell.component';

type FileKind = 'image' | 'document' | 'audio';

interface SharedFile {
  id: string;
  name: string;
  from: string;
  time: string;
  kind: FileKind;
  size: string;
}

@Component({
  selector: 'app-files',
  standalone: true,
  imports: [CommonModule, IonicModule, ShellComponent],
  templateUrl: './files.page.html',
  styleUrls: ['./files.page.scss'],
})
export class FilesPage {
  activeFilter: 'all' | FileKind = 'all';

  // TODO: substituir por arquivos reais anexados nas conversas (vindos da API)
  files: SharedFile[] = [
    { id: '1', name: 'praia-recife.jpg', from: 'Luna', time: 'Hoje, 09:40', kind: 'image', size: '2.1 MB' },
    { id: '2', name: 'relatorio-projeto.pdf', from: 'Trabalho', time: 'Seg, 14:20', kind: 'document', size: '540 KB' },
    { id: '3', name: 'audio-mensagem.mp3', from: 'Família', time: 'Ontem, 08:16', kind: 'audio', size: '890 KB' },
    { id: '4', name: 'lista-compras.jpg', from: 'Notas Pessoais', time: 'Dom, 11:02', kind: 'image', size: '1.4 MB' },
    { id: '5', name: 'apresentacao.pptx', from: 'Estudos', time: 'Qui, 16:45', kind: 'document', size: '3.8 MB' },
  ];

  get filtered(): SharedFile[] {
    if (this.activeFilter === 'all') return this.files;
    return this.files.filter(f => f.kind === this.activeFilter);
  }

  iconFor(kind: FileKind): string {
    return kind === 'image' ? 'image-outline' : kind === 'audio' ? 'musical-notes-outline' : 'document-text-outline';
  }

  setFilter(filter: 'all' | FileKind) {
    this.activeFilter = filter;
  }
}
