import { TestBed } from '@angular/core/testing';

import { CotacaoService } from './cotacao.service';

describe('CotacaoService', () => {
  let service: CotacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CotacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get a cotação', () => {
    const cotacao = {
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
    };
    service.setCotacao(cotacao);
    expect(service.getCotacao()).toEqual(cotacao);
  });

  it('should set a null cotação', () => {
    service.setCotacao(null);
    expect(service.getCotacao()).toBeNull();
  });
});
