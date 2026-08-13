import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ConversationsService } from '../../services/conversations.service';
import { WebsocketService } from '../../services/websocket.service'; // 1. IMPORTAR SERVIÇO
import { Subscription } from 'rxjs';

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
export class ChatPage implements OnInit, OnDestroy {
  contactName = 'Carregando...';
  contactOnline = true;
  draft = '';
  messages: Message[] = [];
  private wsSubscription?: Subscription; // Para controlar a escuta

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private convService: ConversationsService,
    private wsService: WebsocketService // 2. INJETAR SERVIÇO
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carregarDadosDaConversa(id);
      this.carregarMensagens(id);

      // 3. CONECTAR E ESCUTAR O WEBSOCKET EM TEMPO REAL
      this.wsService.conectar(id);
      
      this.wsSubscription = this.wsService.escutarMensagens().subscribe(novaMensagem => {
        const meuIdLogado = this.getMeuIdLogado();
        const remetenteId = novaMensagem.remetenteId || (novaMensagem.remetente && novaMensagem.remetente.id);

        // Evita duplicar a mensagem caso tenha sido você mesmo quem enviou (já tratamos no send)
        if (remetenteId !== meuIdLogado) {
          this.messages.push({
            id: novaMensagem.id.toString(),
            text: novaMensagem.conteudo,
            time: new Date(novaMensagem.enviadaEm || new Date()).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            fromMe: false
          });
        }
      });
    }
  }

  ngOnDestroy() {
    // 4. Desconecta ou limpa a inscrição quando fecha o chat
    if (this.wsSubscription) {
      this.wsSubscription.unsubscribe();
    }
    this.wsService.desconectar();
  }

  getMeuIdLogado(): number {
    const userStr = localStorage.getItem('usuario_logado');
    if (userStr) {
      const user = JSON.parse(userStr);
      return user.id || 0; 
    }
    return 0;
  }

  carregarDadosDaConversa(id: string) {
    this.convService.buscarConversaPorId(id).subscribe({
      next: (conversa) => {
        if (conversa.nome) {
          this.contactName = conversa.nome;
        } else if (conversa.participantes && conversa.participantes.length > 0) {
          const meuIdLogado = this.getMeuIdLogado();
          const outroParticipante = conversa.participantes.find((p: any) => p.id !== meuIdLogado);
          this.contactName = outroParticipante ? outroParticipante.nome : 'Desconhecido';
        }
      },
      error: (err) => console.error('Erro ao carregar conversa:', err)
    });
  }

  carregarMensagens(id: string) {
    this.convService.buscarMensagens(id).subscribe({
      next: (mensagensDoBanco) => {
        const meuIdLogado = this.getMeuIdLogado();
        this.messages = mensagensDoBanco.map(m => {
          const remId = m.remetenteId || (m.remetente && m.remetente.id);
          return {
            id: m.id.toString(),
            text: m.conteudo, 
            time: new Date(m.enviadaEm).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            fromMe: remId === meuIdLogado
          };
        });
      },
      error: (err) => console.error('Erro ao carregar mensagens:', err)
    });
  }

send() {
    const text = this.draft.trim();
    if (!text) return;

    const idConversa = this.route.snapshot.paramMap.get('id');
    if (!idConversa) return;

    // 🔍 ADICIONE ESTE LOG AQUI PARA VER O QUE ESTÁ SENDO ENVIADO:
    console.log('Enviando para o back-end:', { conversaId: Number(idConversa), conteudo: text });

    this.convService.enviarMensagem(idConversa, text).subscribe({
      next: (novaMensagem) => {
        this.messages.push({
          id: novaMensagem.id.toString(),
          text: novaMensagem.conteudo,
          time: new Date(novaMensagem.enviadaEm || new Date()).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          fromMe: true
        });
        this.draft = '';
      },
      error: (err) => console.error('Erro ao enviar a mensagem:', err)
    });
  }

  goBack() {
    this.router.navigateByUrl('/conversations');
  }
}