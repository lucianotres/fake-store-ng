import { Component, effect, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../models/product.model';
import { DecimalPipe } from '@angular/common';
import { Cotacao } from '../models/Cotacao.model';
import { calculaEmCotacao } from '../utils/funcoes-uteis';
import { CotacaoService } from '../services/cotacao.service';

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
    
    return calculaEmCotacao(this.product.price, this.cotacaoAtual.bid);
  }


  constructor(
    private cotacaoService: CotacaoService
  ) {
    effect(() => {
      this.cotacaoAtual = this.cotacaoService.getCotacao()();
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
