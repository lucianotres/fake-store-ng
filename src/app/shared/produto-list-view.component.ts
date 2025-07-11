import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../models/product.model';
import { DecimalPipe } from '@angular/common';

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
