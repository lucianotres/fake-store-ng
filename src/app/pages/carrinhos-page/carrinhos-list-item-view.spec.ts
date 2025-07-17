import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarrinhosListItemView } from './carrinhos-list-item-view.component';
import { Router } from '@angular/router';

describe('CarrinhosListItemView', () => {
  let component: CarrinhosListItemView;
  let fixture: ComponentFixture<CarrinhosListItemView>;
  let mockRouter: jasmine.SpyObj<Router>;
  
  beforeEach(async () => {
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
    component.carrinho = {
      dados: {
        id: 2,
        userId: 3,
        date: new Date().toISOString(),
        products: []
      },
      items: [
        {
          productId: 1,
          quantity: 9,
          product: undefined,
          total: 10.09
        }
      ],
      total: 10.09,
      quantidadeTotal: 10
    }
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

    component.carrinho = {
      ...component.carrinho,
      items: [],
      total: 0,
      quantidadeTotal: 0
    };
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
    expect(compiled.querySelector('td:nth-child(4)')?.innerHTML).toBe('10.09');
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
