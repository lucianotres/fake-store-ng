import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrinhosPageComponent } from './carrinhos-page.component';
import { LocalStorageDataService } from '../../services/local-storage-data.service';
import { Subject, of } from 'rxjs';
import { Carrinho } from '../../models/Carrinho.model';
import { Cotacao } from '../../models/Cotacao.model';
import { signal } from '@angular/core';

const mockCarrinhos: Carrinho[] = [
  {
    dados: { 
      id: 1,
      userId: 1,
      date: new Date().toISOString(),
      products: []
    }, 
    items: [],
    total: 0,
    quantidadeTotal: 0
  } 
];

describe('CarrinhosPageComponent', () => {
  let component: CarrinhosPageComponent;
  let fixture: ComponentFixture<CarrinhosPageComponent>;
  let mockLocalStorageDataService: jasmine.SpyObj<LocalStorageDataService>;
  const mockCotacaoSignal = signal<Cotacao | null>(null);
  const mockTotalEmCotacao = new Subject<number | null>();

  beforeEach(async () => {
    mockCotacaoSignal.set(null);
    mockTotalEmCotacao.next(null);

    mockLocalStorageDataService = jasmine.createSpyObj('LocalStorageDataService', 
      ['CarregarCarrinhosProdutos', 'carrinhosComProdutos$', 'carrinhosTotal$', 'getCotacao', 'carrinhosTotalPorCotacao$']);
    mockLocalStorageDataService.CarregarCarrinhosProdutos.and.returnValue(Promise.resolve());
    mockLocalStorageDataService.carrinhosComProdutos$.and.returnValue(of(mockCarrinhos));
    mockLocalStorageDataService.carrinhosTotal$.and.returnValue(of(10.09));
    mockLocalStorageDataService.carrinhosTotalPorCotacao$.and.returnValue(mockTotalEmCotacao);
    mockLocalStorageDataService.getCotacao.and.returnValue(mockCotacaoSignal);

    await TestBed.configureTestingModule({
      imports: [CarrinhosPageComponent],
      providers: [
        { provide: LocalStorageDataService, useValue: mockLocalStorageDataService }
      ]      
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrinhosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a title', () => { 
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')).toBeTruthy();
  });

  it('should render a list of carrinhos', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('tr[carrinhos-list-item-view]').length).toBe(1)
  });

  it('should render a total', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('tfoot tr td:nth-child(2)')?.innerHTML).toBe('10.09');
  });

  it('should render a total in exchange when exchange is set', () => {
    mockTotalEmCotacao.next(50.45);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('tfoot tr td:nth-child(3)')?.innerHTML).toBe('50.45');
  });

  it('should render a "-" in total when exchange is null', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('thead tr th:nth-child(5)')?.innerHTML).toBe('Valor Total ( - )');
  });

  it('should render the currency identifier in total when exchange is set', () => {
    mockCotacaoSignal.set({ codein: "BRL" } as Cotacao);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('thead tr th:nth-child(5)')?.innerHTML).toBe('Valor Total (BRL$)');
  });
});
