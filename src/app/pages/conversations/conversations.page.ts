import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { 
  IonContent, IonList, IonItem, IonLabel, IonHeader,
  IonToolbar, IonTitle, IonFab, IonFabButton, IonIcon,
  IonMenu, IonButtons, IonMenuButton, IonSearchbar, 
  IonChip, IonAvatar, IonBadge, IonButton, MenuController
} from '@ionic/angular/standalone';
import { ConversationsService } from '../../services/conversations.service';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.page.html',
  styleUrls: ['./conversations.page.scss'],
  standalone: true,
  imports: [
    CommonModule, RouterLink, 
    IonContent, IonList, IonItem, IonLabel, IonHeader, 
    IonToolbar, IonTitle, IonFab, IonFabButton, IonIcon,
    IonMenu, IonButtons, IonMenuButton, IonSearchbar, 
    IonChip, IonAvatar, IonBadge, IonButton
  ]
})
export class ConversationsPage implements OnInit {
  conversas: any[] = [];
  usuarioLogado: any = { nome: 'Carregando...', email: '', fotoUrl: '' };

  constructor(
    private convService: ConversationsService,
    private router: Router,
    private menuCtrl: MenuController
  ) {}

  ngOnInit() {
    this.carregarUsuario();
  }

  ionViewWillEnter() {
    this.carregarConversas();
  }

  carregarUsuario() {
    const userStr = localStorage.getItem('usuario_logado');
    if (userStr) {
      this.usuarioLogado = JSON.parse(userStr);
    }
  }

  getMeuIdLogado(): number {
    const userStr = localStorage.getItem('usuario_logado');
    if (userStr) {
      const user = JSON.parse(userStr);
      return user.id || 0; 
    }
    return 0;
  }

  carregarConversas() {
    this.convService.listarConversas().subscribe({
      next: (data) => {
        // Garante que o ID logado é um número
        const meuIdLogado = Number(this.getMeuIdLogado()); 

        this.conversas = data.map(c => {
          if (c.nome) {
            c.nomeExibicao = c.nome;
            c.foto = null; 
          } else if (c.participantes) {
            // Garante que a comparação seja Número com Número
            const outro = c.participantes.find((p: any) => Number(p.id) !== meuIdLogado);
            
            c.nomeExibicao = outro ? outro.nome : 'Desconhecido';
            c.foto = outro ? (outro.fotoUrl || outro.foto) : null;
          }
          
          c.ultimaMensagem = c.ultimaMensagem || 'Toque para abrir a conversa...'; 
          c.tempo = c.atualizadaEm ? new Date(c.atualizadaEm).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : '';
          c.naoLidas = c.mensagensNaoLidas || 0;

          return c;
        });

        console.log('Conversas prontas para a tela:', this.conversas);
      },
      error: (err) => console.error('Erro ao buscar conversas', err)
    });
  }
  abrirChat(id: number) {
    this.router.navigate(['/chat', id]);
  }

  irParaPerfil() {
    this.menuCtrl.close(); // Fecha a gaveta lateral
    this.router.navigateByUrl('/perfil');
  }
}