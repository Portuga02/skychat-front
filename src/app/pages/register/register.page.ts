import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  loading = false;
  error = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onRegister() {
    this.error = '';

    if (!this.name || !this.email || !this.password) {
      this.error = 'Preencha todos os campos.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error = 'As senhas não coincidem.';
      return;
    }

    this.loading = true;

    const payload = {
      nome: this.name,
      email: this.email,
      senha: this.password
    };

    this.authService.register(payload).subscribe({
      next: (res) => {
        this.loading = false;

        // Se o backend já retornar o token no cadastro, armazena para manter a sessão
        if (res && res.token) {
          localStorage.setItem('token', res.token);
          this.router.navigateByUrl('/conversations');
        } else {
          this.router.navigateByUrl('/login');
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message || 'Erro ao realizar cadastro. Tente novamente.';
        console.error('Erro no registro:', err);
      }
    });
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }
}