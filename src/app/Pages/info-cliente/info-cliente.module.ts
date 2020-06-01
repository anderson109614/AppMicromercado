import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoClientePageRoutingModule } from './info-cliente-routing.module';

import { InfoClientePage } from './info-cliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoClientePageRoutingModule
  ],
  declarations: [InfoClientePage]
})
export class InfoClientePageModule {}
