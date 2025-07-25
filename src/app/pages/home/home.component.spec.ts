import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { signal } from '@angular/core';
import { Cotacao } from '../../models/Cotacao.model';
import { CotacaoService } from '../../services/cotacao.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockCotacaoService: jasmine.SpyObj<CotacaoService>;


  beforeEach(async () => {
    mockCotacaoService = jasmine.createSpyObj('CotacaoService', ['getCotacao']);
    mockCotacaoService.getCotacao.and.returnValue(signal<Cotacao | null>(null));
        
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: CotacaoService, useValue: mockCotacaoService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should render the title in an h1 tag', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Loja Fake');
  });
});
