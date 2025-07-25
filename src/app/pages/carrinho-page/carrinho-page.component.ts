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
    private router: Router
    //private localStorageData: LocalStorageDataService
  ) { }

  ngOnInit(): void {
    this.carrinho$ = of(null);
  }

  public HandleAlterarQtde(carrinhoItem: CarrinhoItem): void
  {
    if (this.alteraQtde === carrinhoItem)
    {
        carrinhoItem.item().quantity = this.alteraQtdeOriginal; //restaura a quantidade original
        this.alteraQtde = null; //se já estava selecionado, desmarca
        return;
    }

    this.alteraQtdeOriginal = carrinhoItem.item().quantity;
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
