import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConversationsService {
  private apiUrl = 'http://localhost:8080/api/conversas';

  constructor(private http: HttpClient) { }

  // Método auxiliar para criar os headers com o Token JWT atual
  private getHeaders(): HttpHeaders {
    const tokenStr = localStorage.getItem('token');
    let token = '';
    if (tokenStr) {
      token = tokenStr.startsWith('{') ? JSON.parse(tokenStr).token : tokenStr;
    }

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  listarConversas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  iniciarNovaConversa(usuarioDestinoId: number): Observable<any> {
    const payload = {
      participantesIds: [usuarioDestinoId]
    };
    return this.http.post<any>(this.apiUrl, payload, { headers: this.getHeaders() });
  }

  buscarConversaPorId(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  buscarMensagens(conversaId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${conversaId}/mensagens`, { headers: this.getHeaders() });
  }

  enviarMensagem(conversaId: string, texto: string): Observable<any> {
    const payload = {
      conversaId: Number(conversaId),
      conteudo: texto
    };
    return this.http.post<any>(`${this.apiUrl}/${conversaId}/mensagens`, payload, { headers: this.getHeaders() });
  }
}