import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // O router vem pra cá!
import { IonicModule } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { ConversationsService } from '../../services/conversations.service'; // Injeta o serviço de conversas aqui!

@Component({
  selector: 'app-contatos',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './contatos.page.html',
  styleUrls: ['./contatos.page.scss'],
})
export class ContatosPage implements OnInit {
  contatos: any[] = [];
  loading = true;
  error = '';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private convService: ConversationsService // INJETADO AQUI
  ) {}

  ngOnInit() {
    this.carregarContatos();
  }

  carregarContatos() {
    this.loading = true;
    this.usuarioService.listarContatos().subscribe({
      next: (dados) => {
        this.contatos = dados;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Erro ao carregar contatos.';
        console.error(err);
      }
    });
  }

  // O MÉTODO QUE DISPARA QUANDO VOCÊ CLICA NO "JOÃO TESTE"
  iniciarConversa(usuarioDestinoId: number) {
    this.convService.iniciarNovaConversa(usuarioDestinoId).subscribe({
      next: (conversa) => {
        console.log('Deu certo! Conversa id:', conversa.id);
        // Redireciona para a tela do chat passando o ID da conversa!
        this.router.navigate(['/chat', conversa.id]);
      },
      error: (err) => {
        console.error('Erro ao iniciar conversa:', err);
      }
    });
  }
  
}