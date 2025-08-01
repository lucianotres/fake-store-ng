import { Component, effect, OnInit, signal } from '@angular/core';
import { Carrinho, CarrinhoItem } from '../../models/Carrinho.model';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageDataService } from '../../services/local-storage-data.service';

@Component({
  selector: 'carrinho-page.component',
  imports: [CommonModule, FormsModule, DecimalPipe, DatePipe],
  templateUrl: './carrinho-page.component.html',
  styleUrl: './carrinho-page.component.css'
})
export class CarrinhoPageComponent implements OnInit {
  id: number | null = null;
  public carrinho: Carrinho | null = null;
  public itemAlteraQtde: CarrinhoItem | null = null;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private localStorageData: LocalStorageDataService
  ) { }

  ngOnInit(): void {
    const idParam = Number(this.route.snapshot.paramMap.get('id'));
    this.id = isNaN(idParam) ? null : idParam;

    this.carregaCarrinho();
  }

  async carregaCarrinho(): Promise<void>
  {
    if (this.id === null)
    {
      this.carrinho = null;
      return;
    }
    
    const carrinhoLocalizado = this.localStorageData.carrinhos().find(c => c.dados.id === this.id);
    if (carrinhoLocalizado !== undefined)
    {
      this.carrinho = carrinhoLocalizado;
      return;
    }

    this.carrinho = await this.localStorageData.CarregaCarrinhosProdutos(this.id);
  }

  private _originalQtde: number = 0;
  private _novaQtde: number = 0;
  public get novaQtde(): number {
    return this._novaQtde;
  }
  public set novaQtde(value: number) {
    this._novaQtde = value;
    this.definirQtdeItemSelecionado();
  }

  definirQtdeItemSelecionado(): void
  {
    if (this.itemAlteraQtde === null)
      return;

    this.itemAlteraQtde.alterarQuantidade(this._novaQtde);
  }

  public HandleAlterarQtde(carrinhoItem: CarrinhoItem): void
  {
    if (this.itemAlteraQtde === carrinhoItem)
    {
        this.novaQtde = this._originalQtde;
        this.itemAlteraQtde.alterarQuantidade(this._originalQtde);
        this.itemAlteraQtde = null;
        return;
    }

    this._novaQtde = carrinhoItem.item().quantity;
    this._originalQtde = this._novaQtde;
    this.itemAlteraQtde = carrinhoItem;
  }

  public HandleAlterarQtdeSalva(carrinhoItem: CarrinhoItem): void
  {
    if (this.carrinho === null)
      return;

    this.localStorageData.SalvarCarrinho(this.carrinho);
    this.itemAlteraQtde = null;
  }

  public HandleRemoverItem(carrinhoItem: CarrinhoItem): void
  {
    if (this.carrinho === null)
      return;

    const idRem = carrinhoItem.item().productId;
    this.carrinho.removerProduto(idRem);
  }

  public HandleAddProduto(): void
  {
    this.router.navigate(['/produtos'], { queryParams: { addToCart: this.id } });
  }

}
