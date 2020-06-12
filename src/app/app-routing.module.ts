import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'folder',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  

  /*

  {
    path: 'login',
    loadChildren: () => import('./Pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro-cli',
    loadChildren: () => import('./Pages/registro-cli/registro-cli.module').then( m => m.RegistroCliPageModule)
  },
  {
    path: 'detalle-producto',
    loadChildren: () => import('./Pages/detalle-producto/detalle-producto.module').then( m => m.DetalleProductoPageModule)
  },
  {
    path: 'pedido',
    loadChildren: () => import('./Pages/pedido/pedido.module').then( m => m.PedidoPageModule)
  },*/
  {
    path: 'compras',
    loadChildren: () => import('./Pages/compras/compras.module').then( m => m.ComprasPageModule)
  },
  {
    path: 'info-cliente',
    loadChildren: () => import('./Pages/info-cliente/info-cliente.module').then( m => m.InfoClientePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
