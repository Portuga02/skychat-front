import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private stompClient: Client | null = null;
  private mensagemSubject = new Subject<any>();

  constructor() {}

  conectar(conversaId: string) {
    // Se já estiver conectado, não faz nada
    if (this.stompClient && this.stompClient.active) {
      return;
    }

    // Pega o token JWT que está salvo no localStorage para passar na segurança
    const tokenStr = localStorage.getItem('token');
    let token = '';
    if (tokenStr) {
      // Se o token estiver salvo como string pura ou dentro de um JSON, tratamos aqui:
      token = tokenStr.startsWith('{') ? JSON.parse(tokenStr).token : tokenStr;
    }

    // Configura o cliente STOMP usando SockJS
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      connectHeaders: {
        Authorization: `Bearer ${token}`
      },
      debug: (str) => {
        console.log('STOMP Debug:', str);
      },
      reconnectDelay: 5000, // Tenta reconectar em 5 segundos se cair
    });

    this.stompClient.onConnect = (frame) => {
      console.log('Conectado ao WebSocket com sucesso!');

      // Se inscreve no canal específico desta conversa
      this.stompClient?.subscribe(`/topic/conversas/${conversaId}`, (sdkEvent: IMessage) => {
        const mensagemRecebida = JSON.parse(sdkEvent.body);
        // Avisa quem estiver ouvindo que chegou mensagem nova
        this.mensagemSubject.next(mensagemRecebida);
      });
    };

    this.stompClient.onStompError = (frame) => {
      console.error('Erro no STOMP:', frame.headers['message']);
    };

    // Ativa a conexão
    this.stompClient.activate();
  }

  // Retorna um Observable para a página de chat escutar as mensagens em tempo real
  escutarMensagens(): Observable<any> {
    return this.mensagemSubject.asObservable();
  }

  desconectar() {
    if (this.stompClient) {
      this.stompClient.deactivate();
      console.log('Desconectado do WebSocket');
    }
  }
}