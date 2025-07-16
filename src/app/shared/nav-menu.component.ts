import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'nav-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.css'
})
export class NavMenuComponent {
  collapseNavMenu = false;
  
  toggleNavMenu() {
    this.collapseNavMenu = !this.collapseNavMenu;
  }
}
