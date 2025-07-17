import { Component, OnInit } from '@angular/core';
import { FakeStoreProductsService } from '../../services/fake-store-products.service';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { ProdutoListViewComponent } from '../../shared/produto-list-view.component';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, ProdutoListViewComponent],
  templateUrl: './produtos-page.component.html',
  styleUrl: './produtos-page.component.css'
})
export class ProdutosPageComponent implements OnInit {
  public products$!: Observable<Product[]>;

  constructor(
    private productsService: FakeStoreProductsService
  ) { }

  ngOnInit(): void {
    this.products$ = this.productsService.getProducts();
  }

}
