import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarrinhosListItemView } from './carrinhos-list-item-view.component';
import { Router } from '@angular/router';
import { CotacaoService } from '../../services/cotacao.service';
import { Carrinho } from '../../models/Carrinho.model';
import { Cotacao } from '../../models/Cotacao.model';

describe('CarrinhosListItemView', () => {
  let component: CarrinhosListItemView;
  let fixture: ComponentFixture<CarrinhosListItemView>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockCotacaoService: CotacaoService;
  
  beforeEach(async () => {
    mockCotacaoService = new CotacaoService();
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockRouter.navigate.and.returnValue(Promise.resolve(true));
   
    await TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrinhosListItemView);
    component = fixture.componentInstance;

    component.carrinho = new Carrinho(mockCotacaoService, {
      id: 2,
      userId: 3,
      date: new Date().toISOString(),
      products: [{
        productId: 1,
        quantity: 10,
      }]
    });
    component.carrinho.items()[0].product.set({
      id: 1,
      title: "title",
      price: 1.09,
      description: "description",
      category: "category",
      image: "image",
      rating: {
        rate: 0,
        count: 0
      }
    });
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a ID column', () => { 
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('td:nth-child(1)')?.innerHTML?.trim()).toBe('2');
  });

  it('should render a item count column', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('td:nth-child(2)')?.innerHTML).toBe('1');
  });

  it('should render a item count column with "sem" when quantity is 0', () => {
    if (component.carrinho === undefined)
    {
      fail("carrinho is undefined!");
      return;
    }

    component.carrinho = new Carrinho(mockCotacaoService, {
      id: 3,
      userId: 3,
      date: new Date().toISOString(),
      products: []
    });

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    expect(compiled.querySelector('td:nth-child(2)')?.innerHTML).toBe('Sem');
  });

  it('should render a total quantity column', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('td:nth-child(3)')?.innerHTML).toBe('10');
  });

  it('should render a total value column', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('td:nth-child(4)')?.innerHTML).toBe('10.90');
  });

  it('should render a "-" in total when exchange is null', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('td:nth-child(5)')?.innerHTML).toBe('-');
  });

  it('should render a correct total value when exchange is set', () => {
    mockCotacaoService.setCotacao({ bid: 5 } as Cotacao);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('td:nth-child(5)')?.innerHTML).toBe('54.50');
  });

  it('should handle ver button click', () => {
    component.handleVer();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/carrinho', 2]);
  });

  it('should handle remover button click', () => {
    spyOn(window, 'alert');
    component.handleRemover();
    expect(window.alert).toHaveBeenCalledWith('Não implementado ainda!');
  });
});
