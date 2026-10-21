import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario = {
    id: 0,
    nome: '',
    email: '',
    fotoUrl: ''
  };

  constructor(private router: Router) {}

  ngOnInit() {
    this.carregarDadosLocais();
  }

  carregarDadosLocais() {
    const userStr = localStorage.getItem('usuario_logado');
    if (userStr) {
      const dados = JSON.parse(userStr);
      this.usuario.id = dados.id;
      this.usuario.nome = dados.nome || '';
      this.usuario.email = dados.email || '';
      this.usuario.fotoUrl = dados.fotoUrl || dados.foto || '';
    }
  }

  salvar() {
    // Por enquanto, apenas atualizamos o localStorage para refletir no chat
    localStorage.setItem('usuario_logado', JSON.stringify(this.usuario));
    
    console.log('Dados prontos para o Java (em breve):', this.usuario);
    
    // Regressa à lista de conversas
    this.router.navigateByUrl('/conversations');
  }

  voltar() {
    this.router.navigateByUrl('/conversations');
  }
}