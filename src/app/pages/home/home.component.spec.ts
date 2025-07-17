import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { LocalStorageDataService } from '../../services/local-storage-data.service';
import { signal } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockLocalStorageDataService: jasmine.SpyObj<LocalStorageDataService>;

  beforeEach(async () => {
    mockLocalStorageDataService = jasmine.createSpyObj('LocalStorageDataService', ['getCotacaoSelecionada']);
    mockLocalStorageDataService.getCotacaoSelecionada.and.returnValue(signal(null));

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: LocalStorageDataService, useValue: mockLocalStorageDataService }
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
