import { Component, effect, OnInit } from '@angular/core';
import { LocalStorageDataService } from '../../services/local-storage-data.service';
import { Observable, of } from 'rxjs';
import { Carrinho } from '../../models/Carrinho.model';
import { CommonModule } from '@angular/common';
import { CarrinhosListItemView } from "./carrinhos-list-item-view.component";
import { Cotacao } from '../../models/Cotacao.model';

@Component({
  selector: 'app-carrinhos-page.component',
  imports: [CommonModule, CarrinhosListItemView],
  templateUrl: './carrinhos-page.component.html',
  styleUrl: './carrinhos-page.component.css'
})
export class CarrinhosPageComponent implements OnInit {
  carrinhos$: Observable<Carrinho[]> = of([]);
  total$: Observable<number> = of(0);
  totalEmCotacao$: Observable<number | null> = of(null);
  cotacao: Cotacao | null = null;

  constructor(
    private localStorageDataService: LocalStorageDataService
  ) { 
    this.carrinhos$ = this.localStorageDataService.carrinhosComProdutos$();
    this.total$ = this.localStorageDataService.carrinhosTotal$();

    effect(() => {
      this.cotacao = this.localStorageDataService.getCotacao()();
      this.totalEmCotacao$ = this.localStorageDataService.carrinhosTotalPorCotacao$();
    });
  }

  async ngOnInit(): Promise<void> {
    await this.localStorageDataService.CarregarCarrinhosProdutos();
  }

}
