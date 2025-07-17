import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { provideHttpClient } from "@angular/common/http";
import { LOGGER_TOKEN, MockLogger } from "../ILogger";
import { FakeStoreProductsService } from "./fake-store-products.service";

describe("FakeStoreProductsService", () => {
  let fakeStoreProductsService: FakeStoreProductsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LOGGER_TOKEN, useClass: MockLogger },
        provideHttpClient(),
        provideHttpClientTesting(),
        FakeStoreProductsService
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    fakeStoreProductsService = TestBed.inject(FakeStoreProductsService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    expect(fakeStoreProductsService).toBeTruthy();
  });

  it("should getProducts return a list of products", () => {
    fakeStoreProductsService.getProducts().subscribe(products => {
      expect(products.length).toBe(1);
      expect(products[0].id).toBe(2);
      expect(products[0].title).toBe("Mens Casual Premium Slim Fit T-Shirts");
    });

    const req = httpMock.expectOne("https://fakestoreapi.com/products");
    expect(req.request.method).toBe("GET");
    req.flush([
      {
        "id": 2,
        "title": "Mens Casual Premium Slim Fit T-Shirts",
        "price": 22.3,
        "description": "Slim-fitting style...",
        "category": "men's clothing"
      }]);
  });

})