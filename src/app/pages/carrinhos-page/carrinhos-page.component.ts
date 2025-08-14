import { Component, effect, OnInit } from '@angular/core';
import { LocalStorageDataService } from '../../services/local-storage-data.service';
import { Carrinho } from '../../models/Carrinho.model';
import { CommonModule } from '@angular/common';
import { CarrinhosListItemView } from "./carrinhos-list-item-view.component";
import { Cotacao } from '../../models/Cotacao.model';
import { CotacaoService } from '../../services/cotacao.service';
import { Router } from '@angular/router';

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
    private cotacaoService: CotacaoService,
    private router: Router
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

  public async handleNovoCarrinho(): Promise<void> {
    const novoCarrinho = new Carrinho(this.cotacaoService, {
      id: this.localStorageDataService.carrinhos().reduce((acc, c) => Math.max(acc, c.dados.id ?? 0), 0) + 1,
      userId: 0,
      date: new Date().toISOString(),
      products: []
    });

    const retornado = await this.localStorageDataService.IncluirCarrinho(novoCarrinho);
    
    if (retornado !== null) {
      this.router.navigate(['/carrinho', retornado.dados.id]);
    }
  }

}
