import { Component, effect, OnInit } from '@angular/core';
import { LocalStorageDataService } from '../../services/local-storage-data.service';
import { Carrinho } from '../../models/Carrinho.model';
import { CommonModule } from '@angular/common';
import { CarrinhosListItemView } from "./carrinhos-list-item-view.component";
import { Cotacao } from '../../models/Cotacao.model';
import { CotacaoService } from '../../services/cotacao.service';

@Component({
  selector: 'app-carrinhos-page.component',
  imports: [CommonModule, CarrinhosListItemView],
  templateUrl: './carrinhos-page.component.html',
  styleUrl: './carrinhos-page.component.css'
})
export class CarrinhosPageComponent implements OnInit {
  carrinhos: Carrinho[] = [];
  total: number = 0;
  totalEmCotacao: number | null = null;
  cotacao: Cotacao | null = null;
  
  constructor(
    private localStorageDataService: LocalStorageDataService,
    private cotacaoService: CotacaoService
  ) {    
    effect(() => {
      this.carrinhos = this.localStorageDataService.carrinhos();
    });

    effect(() => {
      this.total = this.localStorageDataService.carrinhosTotal();
      this.totalEmCotacao = this.localStorageDataService.carrinhosTotalPorCotacao();
    });

    effect(() => {
      this.cotacao = this.cotacaoService.getCotacao();
    });
  }

  async ngOnInit(): Promise<void> {
    await this.localStorageDataService.CarregarCarrinhosProdutos();
  }

  public async handleAtualizar(): Promise<void> {
    await this.localStorageDataService.CarregarCarrinhosProdutos();
  }

}
