import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProdutosPageComponent } from './produtos-page.component';
import { CotacaoService } from '../../services/cotacao.service';
import { signal } from '@angular/core';
import { Cotacao } from '../../models/Cotacao.model';

describe('ProdutosPageComponent', () => {
  let component: ProdutosPageComponent;
  let fixture: ComponentFixture<ProdutosPageComponent>;
  let mockCotacaoService: jasmine.SpyObj<CotacaoService>;
  
  beforeEach(async () => {
    mockCotacaoService = jasmine.createSpyObj('CotacaoService', ['getCotacao']);
    mockCotacaoService.getCotacao.and.returnValue(signal<Cotacao | null>(null));

    await TestBed.configureTestingModule({
      imports: [ProdutosPageComponent],
      providers: [
    
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
