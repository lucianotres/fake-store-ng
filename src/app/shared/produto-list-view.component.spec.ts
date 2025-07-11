import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoListViewComponent } from './produto-list-view.component';

describe('ProdutoListViewComponent', () => {
  let component: ProdutoListViewComponent;
  let fixture: ComponentFixture<ProdutoListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutoListViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutoListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a card with product details', () => { 
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('div.card')).toBeTruthy();
    expect(compiled.querySelector('h5.card-title')).toBeTruthy();
    expect(compiled.querySelector('p.card-text')).toBeTruthy();
  });
});
