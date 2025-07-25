import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarrinhoPageComponent } from './carrinho-page.component';
import { LocalStorageDataService } from '../../services/local-storage-data.service';
import { provideRouter } from '@angular/router';
import { CotacaoService } from '../../services/cotacao.service';
import { Carrinho } from '../../models/Carrinho.model';

describe('CarrinhoPageComponent', () => {
  let component: CarrinhoPageComponent;
  let fixture: ComponentFixture<CarrinhoPageComponent>;
  let mockLocalStorageDataService: jasmine.SpyObj<LocalStorageDataService>;
  
  beforeEach(async () => {
    const mockCotacaoService = new CotacaoService();
    const carrinho = new Carrinho(mockCotacaoService, {
      id: 2,
      userId: 3,
      date: new Date().toISOString(),
      products: [{
        productId: 1,
        quantity: 10,
      }]
    });
    carrinho.items()[0].product.set({
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

    mockLocalStorageDataService = jasmine.createSpyObj('LocalStorageDataService', ['CarregaCarrinhosProdutos']);
    mockLocalStorageDataService.CarregaCarrinhosProdutos.withArgs(1).and.returnValue(Promise.resolve(carrinho));

    await TestBed.configureTestingModule({
      imports: [CarrinhoPageComponent],
      providers: [
        provideRouter([]),
        { provide: CotacaoService, useValue: mockCotacaoService },
        { provide: LocalStorageDataService, useValue: mockLocalStorageDataService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrinhoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const carregaCarrinhoPadrao = async (): Promise<void> =>
  {
    component.id = 1;
    await component.carregaCarrinho();
  }


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the cart data correctly', async () => {
    await carregaCarrinhoPadrao();
    
    expect(component.carrinho).toBeDefined();
    expect(component.carrinho?.items().length).toBeGreaterThan(0);
  });
  
  it('should allow users to update cart item quantity', async () => {
    await carregaCarrinhoPadrao();

    const itemSelected = component.carrinho?.items()[0];
    if (!itemSelected) {
      fail("Item não encontrado para testar!");
      return;
    }

    component.HandleAlterarQtde(itemSelected);
    component.novaQtde = 20;
    
    expect(component.carrinho?.items()[0].item().quantity).toEqual(20);
    expect(component.carrinho?.items()[0].total()).toEqual(21.8);
  });

  it('should allow users to remove items from the cart', () => {
    fail('Este teste ainda não foi implementado.');
  });

  it('should allow users to call a page to add products to the cart', () => {
    fail('Este teste ainda não foi implementado.');
  });

  it('should render the cart items correctly', async () => {
    await carregaCarrinhoPadrao();
    
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    var items = component.carrinho?.items();

    expect(items).toBeDefined();
    expect(items?.length).toBeGreaterThan(0);

    expect(compiled.querySelector("tbody tr:first-child")).toBeDefined();
    expect(compiled.querySelector("tbody tr:first-child td:nth-child(1)")?.innerHTML).toEqual("title");
    expect(compiled.querySelector("tbody tr:first-child td:nth-child(2)")?.innerHTML).toEqual("$ 1.09");
  });

});
