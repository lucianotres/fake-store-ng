import { computed, effect, Signal, signal } from "@angular/core";
import { CartDTO } from "./Cart.model";
import { CartProductDTO } from "./CartProduct.model";
import { Product } from "./product.model";
import { CotacaoService } from "../services/cotacao.service";
import { calculaEmCotacao } from "../utils/funcoes-uteis";

export class CarrinhoItem {
  readonly item = signal<CartProductDTO>({
    productId: 0,
    quantity: 0
  });
  readonly product = signal<Product | null>(null);
  readonly total: Signal<number>;
  readonly totalCotado: Signal<number | null>;

  constructor(
    private cotacaoService: CotacaoService
  )
  {
    this.total = computed(() => {
      const product = this.product();
      const item = this.item();
      return product === null ? 0 : product.price * item.quantity;
    });

    this.totalCotado = computed(() => {
      const cotacao = this.cotacaoService.getCotacao();   
      return cotacao === null ? null : calculaEmCotacao(this.total(), cotacao.bid ?? 0);
    });
  }
}

export class Carrinho {
  readonly items = signal<CarrinhoItem[]>([]);
  readonly total: Signal<number>;
  readonly quantidadeTotal: Signal<number>; 
  readonly totalCotado: Signal<number | null>;

  constructor(
    private cotacaoService: CotacaoService,
    readonly dados: CartDTO
  ) {
    this.items.set(this.dados.products.map(item => {
      const carrinhoItem = new CarrinhoItem(this.cotacaoService);
      carrinhoItem.item.set(item);
      return carrinhoItem;
    }));

    this.total = computed(() => {
      return this.items().reduce((total, item) => total + item.total(), 0);
    });

    this.quantidadeTotal = computed(() => {
      return this.items().reduce((total, item) => total + item.item().quantity, 0);
    });

    this.totalCotado = computed(() => {
      if (this.items().reduce((agg, item) => agg && item.totalCotado() === null, true))
        return null;
      else
        return this.items().reduce((total, item) => total + (item.totalCotado() ?? 0), 0);
    });
  }

}