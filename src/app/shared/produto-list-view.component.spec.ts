import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProdutoListViewComponent } from './produto-list-view.component';
import { Cotacao } from '../models/Cotacao.model';
import { Product } from '../models/product.model';
import { CotacaoService } from '../services/cotacao.service';
import { signal } from '@angular/core';

describe('ProdutoListViewComponent', () => {
  let component: ProdutoListViewComponent;
  let fixture: ComponentFixture<ProdutoListViewComponent>;
  let mockCotacaoService: jasmine.SpyObj<CotacaoService>;

  beforeEach(async () => {
    mockCotacaoService = jasmine.createSpyObj('CotacaoService', ['getCotacao']);
    mockCotacaoService.getCotacao.and.returnValue(signal<Cotacao | null>(null));

    await TestBed.configureTestingModule({
      imports: [ProdutoListViewComponent],
      providers: [
        { provide: CotacaoService, useValue: mockCotacaoService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutoListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a card with product details', () => { 
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('div.card')).toBeTruthy();
    expect(compiled.querySelector('h5.card-title')).toBeTruthy();
    expect(compiled.querySelector('p.card-text')).toBeTruthy();
  });

  it('should emit onEditar event when handleEditar is called', () => {
    spyOn(component.onEditar, 'emit');
    component.handleEditar();
    expect(component.onEditar.emit).toHaveBeenCalled();
  });

  it('should emit onExcluir event when handleExcluir is called', () => {
    spyOn(component.onExcluir, 'emit');
    component.handleExcluir();
    expect(component.onExcluir.emit).toHaveBeenCalled();
  });

  it('should emit onSelecionar event when handleSelecionar is called', () => {
    spyOn(component.onSelecionar, 'emit');
    component.handleSelecionar();
    expect(component.onSelecionar.emit).toHaveBeenCalled();
  });

  it('should display the product value converted to selected exchange rate', () => {
    let mockCotacao = { 
      name: "test",
      code: "BRL",
      codein: "USD",
      bid: 5 
    } as Cotacao;

    let mockProduct = {
      id: 1,
      title: "test",
      price: 100,
    } as Product;
    
    component.product = mockProduct;
    component.cotacaoAtual = mockCotacao;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('span.cotacao')).toBeTruthy();
    expect(compiled.querySelector('span.cotacao')?.textContent).toContain('500.00');
  });
});
