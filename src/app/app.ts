import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavMenuComponent } from "./shared/nav-menu.component";
import { EscolhaCotacaoComponent } from "./shared/escolha-cotacao.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavMenuComponent, EscolhaCotacaoComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}
