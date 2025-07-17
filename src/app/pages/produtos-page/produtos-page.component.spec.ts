import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProdutosPageComponent } from './produtos-page.component';
import { FakeStoreProductsService } from '../../services/fake-store-products.service';
import { Product } from '../../models/product.model';
import { of } from 'rxjs';

describe('ProdutosPageComponent', () => {
  let component: ProdutosPageComponent;
  let fixture: ComponentFixture<ProdutosPageComponent>;
  let mockProductsService: jasmine.SpyObj<FakeStoreProductsService>;

  const mockProducts: Product[] = [
    { id: 1, title: 'Product 1', price: 10.99, description: 'Description 1', category: 'Category 1', image: 'image1.jpg', rating: { rate: 4.5, count: 100 } }
  ];

  beforeEach(async () => {
    // Criamos o objeto mock com o método 'getProducts'
    mockProductsService = jasmine.createSpyObj('FakeStoreProducts', ['getProducts']);
    // Configuramos o mock para retornar um Observable com nossos produtos mockados
    mockProductsService.getProducts.and.returnValue(of(mockProducts));

    await TestBed.configureTestingModule({
      imports: [ProdutosPageComponent],
      providers: [
        { provide: FakeStoreProductsService, useValue: mockProductsService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a title', () => { 
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')).toBeTruthy();
  });
});
