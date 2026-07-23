import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

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

  constructor(private router: Router) {}

  // TODO: substituir por chamada real ao endpoint de registro (Spring Security + JWT)
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
    setTimeout(() => {
      this.loading = false;
      this.router.navigateByUrl('/conversations');
    }, 600);
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }
}
