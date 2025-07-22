import { Component, effect, Input } from "@angular/core";
import { Carrinho } from "../../models/Carrinho.model";
import { DecimalPipe } from "@angular/common";
import { Router } from "@angular/router";
import { LocalStorageDataService } from "../../services/local-storage-data.service";
import { calculaEmCotacao } from "../../utils/funcoes-uteis";

@Component({
  selector: '[carrinhos-list-item-view]',
  imports: [DecimalPipe],
  templateUrl: './carrinhos-list-item-view.component.html'
})
export class CarrinhosListItemView {
  @Input()
  public carrinho?: Carrinho;

  private cotacao: number | null = null;
  public get totalEmCotacao(): number | null {
    if (this.carrinho === undefined || this.cotacao === null)
      return null;

    return calculaEmCotacao(this.carrinho.total, this.cotacao);
  }

  constructor(
    private router: Router,
    private localStorageDataService: LocalStorageDataService
  ) {
    effect(() => {
      let cotacaoAtual = this.localStorageDataService.getCotacao()();
      if (cotacaoAtual === null || cotacaoAtual.bid === undefined)
        this.cotacao = null;
      else
        this.cotacao = cotacaoAtual.bid;
    });
  }

  handleVer(): void {
    if (this.carrinho?.dados?.id === undefined)
      return;
    
    this.router.navigate(["/carrinho", this.carrinho.dados.id]);
  }

  handleRemover(): void {
    if (this.carrinho?.dados?.id === undefined)
      return;

    alert("Não implementado ainda!");
  }
}