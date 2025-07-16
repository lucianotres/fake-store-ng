import { CartProductDTO } from "./CartProduct.model";

export interface CartDTO {
  id: number;
  userId: number;
  date: string;
  products: CartProductDTO[];
}
