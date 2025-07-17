import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter } from '@angular/router';
import { LocalStorageDataService } from './services/local-storage-data.service';
import { signal } from '@angular/core';

describe('App', () => {
  let mockLocalStorageDataService: jasmine.SpyObj<LocalStorageDataService>;

  beforeEach(async () => {
    mockLocalStorageDataService = jasmine.createSpyObj('LocalStorageDataService', ['getCotacaoSelecionada', 'setCotacaoSelecionada']);
    mockLocalStorageDataService.getCotacaoSelecionada.and.returnValue(signal(null));
    
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        { provide: LocalStorageDataService, useValue: mockLocalStorageDataService }
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the default structure', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    let div_page = compiled.querySelector('div.page');
    expect(div_page).toBeTruthy();   
    expect(div_page?.querySelector('div.sidebar')).toBeTruthy();
    expect(div_page?.querySelector('main')).toBeTruthy();
    expect(div_page?.querySelector('article.content')).toBeTruthy();
  });
});
