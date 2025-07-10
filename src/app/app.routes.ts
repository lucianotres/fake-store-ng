import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', 
    loadComponent: () => import('./pages/home/home.component')
      .then(m => m.HomeComponent),
    title: 'Fake Store - Início'
  },
  {
    path: 'produtos',
    loadComponent: () => import('./pages/produtos-page/produtos-page.component')
      .then(m => m.ProdutosPageComponent),
    title: 'Fake Store - Produtos'
  },
  {
    path: 'usuarios',
    loadComponent: () => import('./pages/usuarios-page/usuarios-page.component')
      .then(m => m.UsuariosPageComponent),
    title: 'Fake Store - Usuários'
  },
  {
    path: 'carrinhos',
    loadComponent: () => import('./pages/carrinhos-page/carrinhos-page.component')
      .then(m => m.CarrinhosPageComponent),
    title: 'Fake Store - Carrinhos'
  }
];
