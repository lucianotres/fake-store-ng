import { computed, Injectable, signal, Signal } from '@angular/core';
import { BehaviorSubject, lastValueFrom, Observable, of } from 'rxjs';
import { CartDTO } from '../models/Cart.model';
import { Product } from '../models/product.model';
import { Carrinho, CarrinhoItem } from '../models/Carrinho.model';
import { FakeStoreProductsService } from './fake-store-products.service';
import { FakeStoreCartService } from './fake-store-carts.service';
import { MinhaCotacao } from '../models/MinhaCotacao.model';
import { AwesomeApiService } from './awesome-api.service';
import { CotacaoService } from './cotacao.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageDataService {

  private readonly _carts = new BehaviorSubject<CartDTO[]>([]);
  private readonly _products = new BehaviorSubject<Product[]>([]);
  
  readonly products$: Observable<Product[]> = this._products.asObservable();
  readonly carts$: Observable<CartDTO[]> = this._carts.asObservable();

  private cotacaoSelecionada = signal<MinhaCotacao | null>(null);

  readonly carrinhos = signal<Carrinho[]>([]);
  readonly carrinhosTotal: Signal<number>;
  readonly carrinhosTotalPorCotacao: Signal<number | null>;

  constructor(
    private cotacao: CotacaoService,
    private _productService: FakeStoreProductsService,
    private _cartService: FakeStoreCartService,
    private _awesomeApiService: AwesomeApiService
  ) { 
    this.carrinhosTotal = computed(() => this.carrinhos().reduce((acc, c) => acc + c.total(), 0));
    this.carrinhosTotalPorCotacao = computed(() => {
      const carrinhosLocal = this.carrinhos();
      return (
        carrinhosLocal.reduce((acc, c) => acc && (c.totalCotado() === null), true) ?
        null :
        this.carrinhos().reduce((acc, c) => acc + (c.totalCotado() ?? 0), 0));
    });
  }

  public async CarregaProdutos(): Promise<void> {
    this._products.next(await lastValueFrom(this._productService.getProducts()));
  }

  public produtos$(): Observable<Product[]> {
    return this.products$;
  }

  public async CarregarCarrinhosProdutos(): Promise<void> {
    await this.CarregaProdutos();

    let carts = await lastValueFrom(this._cartService.getCarts$());
    this._carts.next(carts);

    this.carrinhos.set(carts.map(cart => {
      const carrinho = new Carrinho(this.cotacao, cart);
      carrinho.items().forEach(i => i.product.set(this._products.value.find(p => p.id === i.item().productId) ?? null));
      return carrinho;
    }));
  }

  public async CarregaCarrinhosProdutos(id: number): Promise<Carrinho | null> {
    await this.CarregaProdutos();

    const cart = await lastValueFrom(this._cartService.getCart$(id));    
    if (cart === null) 
      return null;

    const carrinho = new Carrinho(this.cotacao, cart);
    carrinho.items().forEach(i => i.product.set(this._products.value.find(p => p.id === i.item().productId) ?? null));

    let carrinhosAtual = this.carrinhos();
    carrinhosAtual.splice(
      carrinhosAtual.findIndex(c => c.dados.id === cart.id), 1,
      carrinho      
    );
    this.carrinhos.set(carrinhosAtual);

    return carrinho;
  }

  public getCotacaoSelecionada(): Signal<MinhaCotacao | null> {
    return this.cotacaoSelecionada;
  }

  public async setCotacaoSelecionada(cotacao: MinhaCotacao | null): Promise<void> {
    this.cotacaoSelecionada.set(cotacao);

    if (cotacao !== null && cotacao.de !== null && cotacao.para !== null)
    {
      let ultimaCotacao$ = this._awesomeApiService.ultimaCotacao$(cotacao.de, cotacao.para);
      this.cotacao.setCotacao(await lastValueFrom(ultimaCotacao$));
    }
    else
    {
      this.cotacao.setCotacao(null);
    }
  }
  
}
