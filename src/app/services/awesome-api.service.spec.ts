import { TestBed } from '@angular/core/testing';
import { LOGGER_TOKEN, MockLogger } from '../ILogger';
import { AwesomeApiService } from './awesome-api.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('AwesomeApiService', () => {
  let mockHttp: HttpTestingController
  let service: AwesomeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LOGGER_TOKEN, useClass: MockLogger },
        provideHttpClient(),
        provideHttpClientTesting(),
        AwesomeApiService
      ]
    });

    mockHttp = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AwesomeApiService);
  });
  
  afterEach(() => {
    mockHttp.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an awesome api response when correct params are passed', () => {
    service.ultimaCotacao$('USD', 'BRL').subscribe(response => {
      expect(response).toBeTruthy();
      expect(response?.code).toBe('USD');
      expect(response?.codein).toBe('BRL');
      expect(response?.high).toBe(5.365);
      expect(response?.low).toBe(5.0);
      expect(response?.bid).toBe(5.09);
    });

    const req = mockHttp.expectOne('https://economia.awesomeapi.com.br/json/last/USD-BRL');
    expect(req.request.method).toBe('GET');
    req.flush({
      "USDBRL": {
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
    });
  });

  it('should return null when an error occurs', () => {
    service.ultimaCotacao$('USD', 'III').subscribe(response => {
      expect(response).toBeNull();
    });

    const req = mockHttp.expectOne('https://economia.awesomeapi.com.br/json/last/USD-III');
    expect(req.request.method).toBe('GET');
    req.flush(null, {
      status: 404,
      statusText: 'Not Found'
    });
  });

});
