import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProdutosPageComponent } from './produtos-page.component';
import { LocalStorageDataService } from '../../services/local-storage-data.service';

describe('ProdutosPageComponent', () => {
  let component: ProdutosPageComponent;
  let fixture: ComponentFixture<ProdutosPageComponent>;
  let mockLocalStorageDataService: jasmine.SpyObj<LocalStorageDataService>;
  
  beforeEach(async () => {
    mockLocalStorageDataService = jasmine.createSpyObj('LocalStorageDataService', ['CarregaProdutos']);
    mockLocalStorageDataService.CarregaProdutos.and.returnValue(Promise.resolve());

    await TestBed.configureTestingModule({
      imports: [ProdutosPageComponent],
      providers: [
        { provide: LocalStorageDataService, useValue: mockLocalStorageDataService }
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
