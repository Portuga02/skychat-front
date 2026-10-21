import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  private apiUrl = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) {}

  // Método auxiliar para pegar o token do navegador
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

  listarContatos(): Observable<any[]> {
    // ENVIANDO O HEADER COM O TOKEN EXPLICITAMENTE
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }
}