import { Component, OnInit } from '@angular/core';
import { LocalStorageDataService } from '../../services/local-storage-data.service';
import { Observable, of } from 'rxjs';
import { Carrinho } from '../../models/Carrinho.model';
import { CommonModule } from '@angular/common';
import { CarrinhosListItemView } from "./carrinhos-list-item-view.component";

@Component({
  selector: 'app-carrinhos-page.component',
  imports: [CommonModule, CarrinhosListItemView],
  templateUrl: './carrinhos-page.component.html',
  styleUrl: './carrinhos-page.component.css'
})
export class CarrinhosPageComponent implements OnInit {
  carrinhos$: Observable<Carrinho[]> = of([]);
  total$: Observable<number> = of(0);

  constructor(
    private localStorageDataService: LocalStorageDataService
  ) { 
    this.carrinhos$ = this.localStorageDataService.carrinhosComProdutos$();
    this.total$ = this.localStorageDataService.carrinhosTotal$();
  }

  async ngOnInit(): Promise<void> {
    await this.localStorageDataService.CarregarCarrinhosProdutos();
  }

}
