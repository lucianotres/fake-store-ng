import { Component, effect, Input } from "@angular/core";
import { Carrinho } from "../../models/Carrinho.model";
import { DecimalPipe } from "@angular/common";
import { Router } from "@angular/router";
import { LocalStorageDataService } from "../../services/local-storage-data.service";
import { calculaEmCotacao } from "../../utils/funcoes-uteis";
import { Cotacao } from "../../models/Cotacao.model";

@Component({
  selector: '[carrinhos-list-item-view]',
  imports: [DecimalPipe],
  templateUrl: './carrinhos-list-item-view.component.html'
})
export class CarrinhosListItemView {
  @Input()
  public carrinho?: Carrinho;

  constructor(
    private router: Router
  ) { }

  handleVer(): void {
    if (this.carrinho?.dados.id === undefined)
      return;
    
    this.router.navigate(["/carrinho", this.carrinho.dados.id]);
  }

  handleRemover(): void {
    if (this.carrinho?.dados.id === undefined)
      return;

    alert("Não implementado ainda!");
  }
}