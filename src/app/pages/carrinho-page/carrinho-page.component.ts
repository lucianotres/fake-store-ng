import { Component, OnInit } from '@angular/core';
import { Carrinho, CarrinhoItem } from '../../models/Carrinho.model';
import { Observable, of } from 'rxjs';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageDataService } from '../../services/local-storage-data.service';

@Component({
  selector: 'carrinho-page.component',
  imports: [CommonModule, FormsModule, DecimalPipe, DatePipe],
  templateUrl: './carrinho-page.component.html',
  styleUrl: './carrinho-page.component.css'
})
export class CarrinhoPageComponent implements OnInit {
  public carrinho$: Observable<Carrinho | null> = of(null);
  public alteraQtde: CarrinhoItem | null = null;
  public alteraQtdeOriginal: number = 0;

  constructor(
    private router: Router,
    private localStorageData: LocalStorageDataService
  ) { }

  ngOnInit(): void {
    this.carrinho$ = of({
      dados: {
        id: 1,
        userId: 1,
        date: new Date().toISOString(),
        products: [{productId: 1, quantity: 2}]
      },
      items: [{
        productId: 1, 
        quantity: 2,
        total: 18,
        product: {
          id: 1,
          title: 'Product 1',
          price: 9,
          description: 'Description 1',
          category: 'Category 1',
          image: 'Image 1',
          rating: {
            rate: 1,
            count: 1
          }
        }
      }],
      total: 18,
      quantidadeTotal: 2
    } as Carrinho);
  }

  public HandleAlterarQtde(carrinhoItem: CarrinhoItem): void
  {
    if (this.alteraQtde === carrinhoItem)
    {
        carrinhoItem.quantity = this.alteraQtdeOriginal; //restaura a quantidade original
        this.alteraQtde = null; //se já estava selecionado, desmarca
        return;
    }

    this.alteraQtdeOriginal = carrinhoItem.quantity;
    this.alteraQtde = carrinhoItem;
  }

  public HandleAlterarQtdeSalva(carrinhoItem: CarrinhoItem): void
  {
    alert('a fazer');
  }

  public HandleRemoverItem(carrinhoItem: CarrinhoItem): void
  {
    alert('a fazer');
  }

  public HandleAddProduto(): void
  {
    this.router.navigate([`/produtos?addToCart=${1}`]);
  }

}
