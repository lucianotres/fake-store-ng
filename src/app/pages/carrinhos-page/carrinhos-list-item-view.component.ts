import { Component, Input } from "@angular/core";
import { Carrinho } from "../../models/Carrinho.model";
import { DecimalPipe } from "@angular/common";
import { Router } from "@angular/router";

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