import { Component, OnInit } from '@angular/core';
import { LocalStorageDataService } from '../../services/local-storage-data.service';
import { Observable, of } from 'rxjs';
import { Product } from '../../models/product.model';
import { CommonModule, Location } from '@angular/common';
import { ProdutoListViewComponent } from '../../shared/produto-list-view.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, ProdutoListViewComponent],
  templateUrl: './produtos-page.component.html',
  styleUrl: './produtos-page.component.css'
})
export class ProdutosPageComponent implements OnInit {
  public products$: Observable<Product[]> = of([]);
  addToCart: number | null = null;

  constructor(
    private localDataService: LocalStorageDataService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  async ngOnInit(): Promise<void> {
    const addToCartParam = Number(this.route.snapshot.queryParamMap.get('addToCart'));
    this.addToCart = isNaN(addToCartParam) ? null : addToCartParam;

    await this.localDataService.CarregaProdutos();
    this.products$ = this.localDataService.produtos$();
  }

  handleSelecionar(product: any) {   
    if (this.addToCart === null || product === null) {
      return;
    }

    const carrinho = this.localDataService.carrinhos().find(c => c.dados.id === this.addToCart);
    if (carrinho === undefined) {
      return;
    }

    carrinho.adicionarProduto(product);
    this.location.back();
  }
}
