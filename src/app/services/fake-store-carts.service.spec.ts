import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { FakeStoreCartService } from "./fake-store-carts.service";
import { provideHttpClient } from "@angular/common/http";
import { LOGGER_TOKEN, MockLogger } from "../ILogger";

describe("FakeStoreCartService", () => {
  let fakeStoreCartService: FakeStoreCartService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LOGGER_TOKEN, useClass: MockLogger },
        provideHttpClient(),
        provideHttpClientTesting(),
        FakeStoreCartService
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    fakeStoreCartService = TestBed.inject(FakeStoreCartService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    expect(fakeStoreCartService).toBeTruthy();
  });

  it("should getCarts return a list of carts", () => {
    fakeStoreCartService.getCarts$().subscribe(carts => {
      expect(carts.length).toBe(1);
      expect(carts[0].id).toBe(2);
    });

    const req = httpMock.expectOne("https://fakestoreapi.com/carts");
    expect(req.request.method).toBe("GET");
    req.flush([
      {
        "id": 2,
        "userId": 1,
        "date": new Date().toISOString(),
        "products": []
      }
    ]);
  });

})