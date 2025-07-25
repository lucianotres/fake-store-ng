import { TestBed } from "@angular/core/testing";
import { FakeStoreProductsService } from "./fake-store-products.service";
import { FakeStoreCartService } from "./fake-store-carts.service";
import { LocalStorageDataService } from "./local-storage-data.service";
import { of } from "rxjs";
import { Product } from "../models/product.model";
import { AwesomeApiService } from "./awesome-api.service";

describe("LocalStorageDataService", () => {
  let localStorageDataService: LocalStorageDataService;
  let fakeStoreProductsService: jasmine.SpyObj<FakeStoreProductsService>;
  let fakeStoreCartService: jasmine.SpyObj<FakeStoreCartService>;
  let fakeAwesomeApiService: jasmine.SpyObj<AwesomeApiService>;

  const mockProducts: Product[] = [
    {
      "id": 2,
      "title": "Mens Casual Premium Slim Fit T-Shirts",
      "price": 22.3,
      "description": "Slim-fitting style...",
      "category": "men's clothing",
      "image": "",
      "rating": {
        "rate": 3.9,
        "count": 120
      }
    },
    {
      "id": 3,
      "title": "Mens Cotton Jacket",
      "price": 55.99,
      "description": "great outerwear jackets for Spring/Autumn/Winter...",
      "category": "men's clothing",
      "image": "",
      "rating": {
        "rate": 2.1,
        "count": 70
      }
    }
  ];

  const mockCarts = [
    {
      "id": 2,
      "userId": 1,
      "date": new Date().toISOString(),
      "products": [
        {
          "productId": 2,
          "quantity": 1
        },
        {
          "productId": 3,
          "quantity": 2
        } 
      ]
    }
  ];

  const mockCotacao = {
    "code": "USD",
    "codein": "BRL",
    "name": "Dólar Americano/Real Brasileiro",
    "high": 5.365,
    "low": 5.0,
    "varBid": -0.04,
    "pctChange": -4,
    "bid": 5.09,
    "ask": 5.13,
    "timestamp": new Date().toISOString(),
    "create_date": new Date().toISOString()
  }


  beforeEach(async () => {
    fakeStoreProductsService = jasmine.createSpyObj('FakeStoreProductsService', ['getProducts']);
    fakeStoreCartService = jasmine.createSpyObj('FakeStoreCartService', ['getCarts$']);
    fakeAwesomeApiService = jasmine.createSpyObj('AwesomeApiService', ['ultimaCotacao$']);

    fakeStoreProductsService.getProducts.and.returnValue(await Promise.resolve(of(mockProducts)));
    fakeStoreCartService.getCarts$.and.returnValue(await Promise.resolve(of(mockCarts)));
    fakeAwesomeApiService.ultimaCotacao$.and.returnValue(await Promise.resolve(of(mockCotacao)));

    TestBed.configureTestingModule({
      providers: [
        { provide: FakeStoreProductsService, useValue: fakeStoreProductsService },
        { provide: FakeStoreCartService, useValue: fakeStoreCartService },
        { provide: AwesomeApiService, useValue: fakeAwesomeApiService },
        LocalStorageDataService
      ]
    });

    localStorageDataService = TestBed.inject(LocalStorageDataService);
  });

  it("should be created", () => {
    expect(localStorageDataService).toBeTruthy();
  });

  it("should load products list", async ()=>  {
    await localStorageDataService.CarregaProdutos();
    expect(fakeStoreProductsService.getProducts).toHaveBeenCalled();
    localStorageDataService.produtos$().subscribe(products => {
      expect(products.length).toBe(2);
      expect(products[0].id).toBe(2);
      expect(products[1].id).toBe(3);
    });
  });

  it("should load products and carts", async () => {
    await localStorageDataService.CarregarCarrinhosProdutos();
    expect(fakeStoreProductsService.getProducts).toHaveBeenCalled();
    expect(fakeStoreCartService.getCarts$).toHaveBeenCalled();
  });

  it("should return carrinhos with products", async ()=> {
    await localStorageDataService.CarregarCarrinhosProdutos();
    
    const carrinhos = localStorageDataService.carrinhos();
        
    expect(carrinhos.length).toBe(1);
    expect(carrinhos[0].dados).toEqual(mockCarts[0]);

    const items = carrinhos[0].items();
    expect(items.length).toBe(2);
    expect(items[0].product()).toEqual(mockProducts[0]);
    expect(items[1].product()).toEqual(mockProducts[1]);  
  });

});