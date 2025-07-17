import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ILogger, LOGGER_TOKEN } from '../ILogger';

@Injectable({
  providedIn: 'root'
})
export class FakeStoreProductsService {
  private baseUrl = 'https://fakestoreapi.com';

  constructor(
    private http: HttpClient, 
    @Inject(LOGGER_TOKEN)
    private log: ILogger) 
    { }

  getProducts(): Observable<Product[]> {
    this.log.logInformation("Buscando lista de produtos...");
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }

  getProduct(id: number): Observable<Product> {
    this.log.logInformation(`Buscando produto com ID ${id}...`);
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
  }
}
