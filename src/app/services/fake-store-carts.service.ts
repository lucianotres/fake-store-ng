import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { ILogger, LOGGER_TOKEN } from "../ILogger";
import { Observable } from "rxjs";
import { CartDTO } from "../models/Cart.model";

@Injectable({
  providedIn: 'root'
})
export class FakeStoreCartService {
  private baseUrl = 'https://fakestoreapi.com';

  constructor(
    private http: HttpClient, 
    @Inject(LOGGER_TOKEN)
    private log: ILogger) 
    { }

    getCarts$(): Observable<CartDTO[]> {
      this.log.logInformation("Buscando lista de carrinhos...");
      return this.http.get<CartDTO[]>(`${this.baseUrl}/carts`);
    }

    getCart$(id: number): Observable<CartDTO | null> {
      this.log.logInformation(`Busca carrinho id ${id}...`);
      return this.http.get<CartDTO | null>(`${this.baseUrl}/carts/${id}`);
    }

    postCart$(cart: CartDTO): Observable<CartDTO | null> {
      this.log.logInformation(`Inclui novo carrinho...`);
      return this.http.post<CartDTO | null>(`${this.baseUrl}/carts`, cart);
    }

    putCart$(cart: CartDTO): Observable<CartDTO> {
      this.log.logInformation(`Atualizando carrinho id ${cart.id}...`);
      return this.http.put<CartDTO>(`${this.baseUrl}/carts/${cart.id}`, cart);
    }

    deleteCart$(id: number): Observable<void> {
      this.log.logInformation(`Excluindo carrinho id ${id}...`);
      return this.http.delete<void>(`${this.baseUrl}/carts/${id}`);
    }

}