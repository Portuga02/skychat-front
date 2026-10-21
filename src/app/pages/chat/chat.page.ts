import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonContent } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ConversationsService } from '../../services/conversations.service';
import { WebsocketService } from '../../services/websocket.service';
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

  @ViewChild(IonContent, { static: false }) content!: IonContent;

  contactName = 'Carregando...';
  contactOnline = true;
  draft = '';
  mostrarEmojis = false;
  listaEmojis = ['😀', '😂', '😍', '🙏', '👍', '🔥', '❤️', '🎉', '😢', '😎', '🤔', '🙌', '👀', '✨', '💯'];
  messages: Message[] = [];
  private wsSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private convService: ConversationsService,
    private wsService: WebsocketService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.carregarDadosDaConversa(id);
      this.carregarMensagens(id);

      this.wsService.conectar(id);

      this.wsSubscription = this.wsService.escutarMensagens().subscribe(novaMensagem => {
        const novaMensagemId = novaMensagem.id ? novaMensagem.id.toString() : null;
        const mensagemJaExiste = this.messages.find(m => m.id === novaMensagemId);

        if (mensagemJaExiste) {
          return; 
        }

        const meuIdLogado = Number(this.getMeuIdLogado());
        let remetenteId = 0;
        
        if (novaMensagem.remetenteId) {
          remetenteId = Number(novaMensagem.remetenteId);
        } else if (novaMensagem.remetente && novaMensagem.remetente.id) {
          remetenteId = Number(novaMensagem.remetente.id);
        }

        console.log(`[WebSocket] Mensagem recebida. Remetente: ${remetenteId} | Meu ID logado: ${meuIdLogado}`);

        if (remetenteId !== meuIdLogado && remetenteId !== 0) {
          this.messages.push({
            id: novaMensagemId || new Date().getTime().toString(),
            text: novaMensagem.conteudo,
            time: new Date(novaMensagem.enviadaEm || new Date()).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            fromMe: false
          });
          
          this.scrollToBottom();
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.wsSubscription) {
      this.wsSubscription.unsubscribe();
    }
    this.wsService.desconectar();
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.content) {
        this.content.scrollToBottom(300);
      }
    }, 100);
  }

  toggleEmojis() {
    this.mostrarEmojis = !this.mostrarEmojis;
  }

  addEmoji(emoji: string) {
    this.draft += emoji;
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
        
        this.scrollToBottom(); 
      },
      error: (err) => console.error('Erro ao carregar mensagens:', err)
    });
  }

  send() {
    const text = this.draft.trim();
    if (!text) return;

    const idConversa = this.route.snapshot.paramMap.get('id');
    if (!idConversa) return;

    this.convService.enviarMensagem(idConversa, text).subscribe({
      next: (novaMensagem) => {
        this.messages.push({
          id: novaMensagem.id.toString(),
          text: novaMensagem.conteudo,
          time: new Date(novaMensagem.enviadaEm || new Date()).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          fromMe: true
        });
        this.draft = '';
        
        this.scrollToBottom();
      },
      error: (err) => console.error('Erro ao enviar a mensagem:', err)
    });
  }

  goBack() {
    this.router.navigateByUrl('/conversations');
  }
}