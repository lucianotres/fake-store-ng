import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinhaCotacao } from '../../models/MinhaCotacao.model';
import { LocalStorageDataService } from '../../services/local-storage-data.service';
import { Cotacao } from '../../models/Cotacao.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public cotacaoEscolhida: MinhaCotacao | null = null;
  public cotacao: Cotacao | null = null;

  constructor(
    private localStorageDataService: LocalStorageDataService
  ) {
    effect(() => {
      this.cotacaoEscolhida = this.localStorageDataService.getCotacaoSelecionada()();
      this.cotacao = this.localStorageDataService.getCotacao()();
    });
  }
  
}