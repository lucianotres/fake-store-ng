import { Injectable, signal, Signal } from '@angular/core';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { map, reduce } from 'rxjs/operators';
import { CartDTO } from '../models/Cart.model';
import { Product } from '../models/product.model';
import { Carrinho, CarrinhoItem } from '../models/Carrinho.model';
import { FakeStoreProductsService } from './fake-store-products.service';
import { FakeStoreCartService } from './fake-store-carts.service';
import { MinhaCotacao } from '../models/MinhaCotacao.model';
import { AwesomeApiService } from './awesome-api.service';
import { Cotacao } from '../models/Cotacao.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageDataService {

  private readonly _carts = new BehaviorSubject<CartDTO[]>([]);
  private readonly _products = new BehaviorSubject<Product[]>([]);

  readonly carrinhos$: Observable<CartDTO[]> = this._carts.asObservable();

  private cotacaoSelecionada = signal<MinhaCotacao | null>(null);
  private cotacao = signal<Cotacao | null>(null);
  

  constructor(
    private _productService: FakeStoreProductsService,
    private _cartService: FakeStoreCartService,
    private _awesomeApiService: AwesomeApiService
  ) { }

  public async CarregarCarrinhosProdutos(): Promise<void>
  {
    this._products.next(await lastValueFrom(this._productService.getProducts()));
    this._carts.next(await lastValueFrom(this._cartService.getCarts$()));
  }
  
  public carrinhosComProdutos$(): Observable<Carrinho[]> {
    return this.carrinhos$.pipe(
      map(carts => carts.map(cart => {
        const carrinho = new Carrinho();
        carrinho.dados = cart;
        carrinho.items = cart.products.map(p => {
          const item = new CarrinhoItem();
          item.productId = p.productId;
          item.quantity = p.quantity;
          item.product = this._products.value.find(product => product.id === p.productId);
          return item;
        });
        return carrinho;
      }))
    );
  }

  public carrinhosTotal$(): Observable<number> {
    return this.carrinhosComProdutos$().pipe(
      map(carts => carts.reduce((acc, c) => acc + c.total, 0))
    );
  }

  public getCotacaoSelecionada(): Signal<MinhaCotacao | null> {
    return this.cotacaoSelecionada;
  }

  public async setCotacaoSelecionada(cotacao: MinhaCotacao | null): Promise<void> {
    this.cotacaoSelecionada.set(cotacao);

    let ultimaCotacao$ = this._awesomeApiService.ultimaCotacao$(cotacao?.de ?? 'USD', cotacao?.para ?? 'BRL');
    this.cotacao.set(await lastValueFrom(ultimaCotacao$));
  }

  public getCotacao(): Signal<Cotacao | null> {
    return this.cotacao;
  }

}
