import { Component, OnInit } from '@angular/core';
import { LocalStorageDataService } from '../../services/local-storage-data.service';
import { Observable, of } from 'rxjs';
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
  public products$: Observable<Product[]> = of([]);

  constructor(
    private localDataService: LocalStorageDataService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.localDataService.CarregaProdutos();
    this.products$ = this.localDataService.produtos$();
  }

}
