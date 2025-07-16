import { CartDTO } from "./Cart.model";
import { CartProductDTO } from "./CartProduct.model";
import { Product } from "./product.model";

export class CarrinhoItem implements CartProductDTO {
  productId: number = 0;
  quantity: number = 0;
  
  product?: Product;

  get total(): number {
    return this.product ? this.product.price * this.quantity : 0;
  }    
}

export class Carrinho {
  dados: CartDTO = { } as CartDTO;
  items: CarrinhoItem[] = [];

  get total(): number {
    return this.items.reduce((total, item) => total + item.total, 0);
  }

  get quantidadeTotal(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }
}