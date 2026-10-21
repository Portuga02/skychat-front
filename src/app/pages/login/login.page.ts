import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../services/auth.service'; // <--- 1. Importe o serviço

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterLink],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email = '';
  password = '';
  loading = false;

  // 2. Injete o AuthService aqui no construtor junto com o Router
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

onLogin() {
    if (!this.email || !this.password) return;
    this.loading = true;

    this.authService.login({ email: this.email, senha: this.password }).subscribe({
      next: (resposta) => {
        console.log('Login bem-sucedido!', resposta);
        this.loading = false;

        // 1. SALVA O TOKEN ISOLADO (Essencial para não dar erro 403)
        localStorage.setItem('token', resposta.token);

        // 2. SALVA OS DADOS DO USUÁRIO (Essencial para parar o eco do chat)
        localStorage.setItem('usuario_logado', JSON.stringify(resposta));

        // Redireciona para as conversas
        this.router.navigateByUrl('/conversations');
      },
      error: (erro) => {
        console.error('E-mail ou senha inválidos', erro);
        this.loading = false;
      }
    });
  }

  onGuest() {
    this.router.navigateByUrl('/conversations');
  }
}
