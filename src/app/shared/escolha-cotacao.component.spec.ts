import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EscolhaCotacaoComponent } from './escolha-cotacao.component';
import { LocalStorageDataService } from '../services/local-storage-data.service';
import { signal } from '@angular/core';

describe('EscolhaCotacaoComponent', () => {
  let component: EscolhaCotacaoComponent;
  let fixture: ComponentFixture<EscolhaCotacaoComponent>;
  let localStorageDataServiceSpy: jasmine.SpyObj<LocalStorageDataService>;

  beforeEach(async () => {
    localStorageDataServiceSpy = jasmine.createSpyObj('LocalStorageDataService', ['getCotacaoSelecionada', 'setCotacaoSelecionada']);
    localStorageDataServiceSpy.getCotacaoSelecionada.and.returnValue(signal(null));

    await TestBed.configureTestingModule({
      imports: [EscolhaCotacaoComponent],
      providers: [
        { provide: LocalStorageDataService, useValue: localStorageDataServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EscolhaCotacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of cotações', () => {
    expect(component.listaCotacoes.length).toBeGreaterThan(0);
  });

  it('should have a select tag with options', () => {
    const selectElement = fixture.nativeElement.querySelector('select');
    expect(selectElement).toBeTruthy();
    expect(selectElement.options.length).toBeGreaterThan(0);
  });

});