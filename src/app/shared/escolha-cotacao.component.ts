import { Component, effect, signal } from '@angular/core';
import { MinhaCotacao, MinhaCotacaoSet } from '../models/MinhaCotacao.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocalStorageDataService } from '../services/local-storage-data.service';

@Component({
  selector: 'escolha-cotacao',
  imports: [CommonModule, FormsModule],
  templateUrl: './escolha-cotacao.component.html',
  styleUrl: './escolha-cotacao.component.css'
})
export class EscolhaCotacaoComponent {
  public cotacaoEscolhida = signal<string | null>(null);
  public listaCotacoes: MinhaCotacao[] = MinhaCotacaoSet;
  private ignoreServiceUpdate = false;

  constructor(
    private localStorageDataService: LocalStorageDataService
  ) {
    effect(() => {
      const sigla = this.cotacaoEscolhida();
      const cotacaoCompleta = this.listaCotacoes.find(c => c.para === sigla) ?? null;
      this.localStorageDataService.setCotacaoSelecionada(cotacaoCompleta);
      this.ignoreServiceUpdate = true;
    });

    effect(() => {
      if (this.ignoreServiceUpdate)
        return;

      const appCotacao = this.localStorageDataService.getCotacaoSelecionada()();
      const minhaCotacao = this.cotacaoEscolhida(); 

      if (appCotacao?.para !== minhaCotacao) {
        this.ignoreServiceUpdate = true;
        this.cotacaoEscolhida.set(appCotacao?.para ?? null);
      }
    })
  }  
}
