import { Component, Input } from "@angular/core";
import { Carrinho } from "../../models/Carrinho.model";
import { DecimalPipe } from "@angular/common";

@Component({
  selector: '[carrinhos-list-item-view]',
  imports: [DecimalPipe],
  templateUrl: './carrinhos-list-item-view.component.html'
})
export class CarrinhosListItemView {
  @Input()
  public carrinho?: Carrinho;

}