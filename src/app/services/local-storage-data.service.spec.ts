import { TestBed } from "@angular/core/testing";
import { FakeStoreProductsService } from "./fake-store-products.service";
import { FakeStoreCartService } from "./fake-store-carts.service";
import { LocalStorageDataService } from "./local-storage-data.service";
import { of } from "rxjs";
import { Product } from "../models/product.model";

describe("LocalStorageDataService", () => {
  let localStorageDataService: LocalStorageDataService;
  let fakeStoreProductsService: jasmine.SpyObj<FakeStoreProductsService>;
  let fakeStoreCartService: jasmine.SpyObj<FakeStoreCartService>;
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


  beforeEach(async () => {
    fakeStoreProductsService = jasmine.createSpyObj('FakeStoreProductsService', ['getProducts']);
    fakeStoreCartService = jasmine.createSpyObj('FakeStoreCartService', ['getCarts$']);

    fakeStoreProductsService.getProducts.and.returnValue(await Promise.resolve(of(mockProducts)));
    fakeStoreCartService.getCarts$.and.returnValue(await Promise.resolve(of(mockCarts)));

    TestBed.configureTestingModule({
      providers: [
        { provide: FakeStoreProductsService, useValue: fakeStoreProductsService },
        { provide: FakeStoreCartService, useValue: fakeStoreCartService },
        LocalStorageDataService
      ]
    });

    localStorageDataService = TestBed.inject(LocalStorageDataService);
  });

  it("should be created", () => {
    expect(localStorageDataService).toBeTruthy();
  });

  it("should load products and carts", async () => {
    await localStorageDataService.CarregarCarrinhosProdutos();
    expect(fakeStoreProductsService.getProducts).toHaveBeenCalled();
    expect(fakeStoreCartService.getCarts$).toHaveBeenCalled();
  });

  it("should return carrinhos with products", async ()=> {
    await localStorageDataService.CarregarCarrinhosProdutos();
    localStorageDataService.carrinhosComProdutos$().subscribe(carrinhos => {
      expect(carrinhos.length).toBe(1);
      expect(carrinhos[0].dados).toEqual(mockCarts[0]);
      expect(carrinhos[0].items.length).toBe(2);
      expect(carrinhos[0].items[0].product).toEqual(mockProducts[0]);
      expect(carrinhos[0].items[1].product).toEqual(mockProducts[1]);
    });
  });

});