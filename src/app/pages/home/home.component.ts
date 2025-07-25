import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cotacao } from '../../models/Cotacao.model';
import { CotacaoService } from '../../services/cotacao.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public cotacao: Cotacao | null = null;

  constructor(
    private cotacaoService: CotacaoService
  ) {
    effect(() => {
      this.cotacao = this.cotacaoService.getCotacao()();
    });
  }
  
}