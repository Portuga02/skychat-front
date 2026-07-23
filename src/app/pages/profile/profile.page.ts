import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ShellComponent } from '../../components/shell/shell.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, ShellComponent],
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  // TODO: carregar dados reais do usuário autenticado (API)
  name = 'Sávio Gomes da Silva';
  bio = 'Conectado às estrelas 🌙';
  email = 'savio@skychat.dev';
  editing = false;

  toggleEdit() {
    this.editing = !this.editing;
  }

  save() {
    // TODO: enviar alterações pro backend (PUT /users/me)
    this.editing = false;
  }
}
