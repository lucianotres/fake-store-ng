import { Component, effect, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../models/product.model';
import { DecimalPipe } from '@angular/common';
import { LocalStorageDataService } from '../services/local-storage-data.service';
import { Cotacao } from '../models/Cotacao.model';

@Component({
  selector: 'produto-list-view',
  imports: [DecimalPipe],
  templateUrl: './produto-list-view.component.html',
  styleUrl: './produto-list-view.component.css'
})
export class ProdutoListViewComponent {
  @Input()
  product: Product = { } as Product;

  @Output()
  onEditar = new EventEmitter<Product>();

  @Output()
  onExcluir = new EventEmitter<Product>();

  @Output()
  onSelecionar = new EventEmitter<Product>();

  public cotacaoAtual: Cotacao | null = null;

  public get valorConvertido(): number {
    if (this.cotacaoAtual === null || this.cotacaoAtual.bid === undefined) {
      return this.product.price;
    }
    
    return this.product.price * this.cotacaoAtual.bid;
  }


  constructor(
    private localStorageDataService: LocalStorageDataService
  ) {
    effect(() => {
      this.cotacaoAtual = this.localStorageDataService.getCotacao()();
    });
  }
  
  handleEditar() {
    this.onEditar.emit(this.product);
  }

  handleExcluir() {
    this.onExcluir.emit(this.product);
  }
  
  handleSelecionar() {
    this.onSelecionar.emit(this.product);
  }
}
