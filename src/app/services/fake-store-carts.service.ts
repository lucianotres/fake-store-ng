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
}