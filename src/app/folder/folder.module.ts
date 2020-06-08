import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import {LoginPage} from '../Pages/login/login.page';
import {LoginPageModule} from '../Pages/login/login.module';
import {RegistroCliPage} from '../Pages/registro-cli/registro-cli.page';
import {RegistroCliPageModule} from '../Pages/registro-cli/registro-cli.module';
import {DetalleProductoPage} from '../Pages/detalle-producto/detalle-producto.page';
import {DetalleProductoPageModule} from '../Pages/detalle-producto/detalle-producto.module';
import {PedidoPageModule} from '../Pages/pedido/pedido.module';
import {PedidoPage} from '../Pages/pedido/pedido.page';
@NgModule({
  entryComponents:[LoginPage,RegistroCliPage,DetalleProductoPage,PedidoPage],
  imports: [
    CommonModule,
    LoginPageModule,
    FormsModule,
    PedidoPageModule,
    DetalleProductoPageModule,
    RegistroCliPageModule,
    IonicModule,
    FolderPageRoutingModule
  ],
  declarations: [FolderPage]
})
export class FolderPageModule {}
