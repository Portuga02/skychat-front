import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { 
  IonContent, IonList, IonItem, IonLabel, IonHeader,
  IonToolbar, IonTitle, IonFab, IonFabButton, IonIcon
} from '@ionic/angular/standalone';
import { ConversationsService } from '../../services/conversations.service';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.page.html',
  styleUrls: ['./conversations.page.scss'],
  standalone: true,
  imports: [
    CommonModule, RouterLink, IonContent, IonList, IonItem, 
    IonLabel, IonHeader, IonToolbar, IonTitle, IonFab, IonFabButton, IonIcon
  ]
})


export class ConversationsPage implements OnInit {
  conversas: any[] = [];

  constructor(private convService: ConversationsService) {}

  ngOnInit() {
    // Pode deixar o ngOnInit vazio ou carregar aqui também,
    // mas o verdadeiro herói será o método abaixo.
  }

  // 🔴 ADICIONE ESTE MÉTODO AQUI:
  // Ele roda TODA VEZ que o usuário entra nessa tela.
  ionViewWillEnter() {
    this.carregarConversas();
  }
// Adicione esta função auxiliar em algum lugar da classe (antes ou depois do carregarConversas)
  getMeuIdLogado(): number {
    const userStr = localStorage.getItem('usuario_logado');
    if (userStr) {
      const user = JSON.parse(userStr);
      // Se o seu backend mandou o id solto no JSON, acessamos com user.id
      // (Se o id estiver dentro de outro objeto, como user.usuario.id, ajustaremos depois)
      return user.id || 0; 
    }
    return 0;
  }

  // Agora atualize o seu método carregarConversas:
  carregarConversas() {
    this.convService.listarConversas().subscribe({
      next: (data) => {
        // PEGANDO O ID DINAMICAMENTE AGORA! 🚀
        const meuIdLogado = this.getMeuIdLogado(); 

        this.conversas = data.map(c => {
          if (c.nome) {
            c.nomeExibicao = c.nome;
          } else if (c.participantes) {
            const outro = c.participantes.find((p: any) => p.id !== meuIdLogado);
            c.nomeExibicao = outro ? outro.nome : 'Desconhecido';
          }
          return c;
        });

        console.log('Conversas processadas:', this.conversas);
      },
      error: (err) => console.error('Erro ao buscar conversas', err)
    });
  }
  
}