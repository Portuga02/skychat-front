import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email = '';
  password = '';
  loading = false;

  constructor(private router: Router) {}

  // TODO: substituir por chamada real ao SkyChat API (Spring Security + JWT)
  onLogin() {
    if (!this.email || !this.password) return;
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.router.navigateByUrl('/conversations');
    }, 600);
  }

  onGuest() {
    this.router.navigateByUrl('/conversations');
  }
}
