import { Component, OnInit } from '@angular/core';
import {AppComponent} from '../../app.component';
import { ToastController, LoadingController } from '@ionic/angular';
import { SerConeccionService } from 'src/app/Servicios/ser-coneccion.service';
import { SerApiService } from 'src/app/Servicios/ser-api.service';
@Component({
  selector: 'app-compras',
  templateUrl: './compras.page.html',
  styleUrls: ['./compras.page.scss'],
})
export class ComprasPage implements OnInit {

  constructor( public toastController2: ToastController,
    public ac:AppComponent,
    public loadingCtrl: LoadingController,
    private api: SerApiService,
    private networkService: SerConeccionService) { }
  isConnected = false;
  listaPedidos:any=[];
  ngOnInit() {
    this.networkService.getNetworkStatus().subscribe((connected: boolean) => {
      this.isConnected = connected;
    });
    this.cargarPedidos();
  }
  async presentToast2(msj: string) {
    console.log('toast');
    const toasti = await this.toastController2.create({
      message: msj,
      duration: 5000
    });
    toasti.present();
  }
 async cargarPedidos(){
    if (!this.isConnected) {
      console.log('Por favor enciende tu conexión a Internet');
      //Sin coneccio 
      this.presentToast2('Sin coneccion a internet');

    } else {
      const loadingDB = await this.loadingCtrl.create({
        message: 'MICROMERCADO'
      });
      loadingDB.present();
      console.log('uso',this.ac.clienteUso.Id);
      this.api.getPedidorUsuario(this.ac.clienteUso.Id).subscribe(
        res => {
          console.log('res con',res);
          this.listaPedidos=res;
          loadingDB.dismiss();
        },
        err => {
          console.log(err);
          loadingDB.dismiss();
          //this.presentToast('Error Tiempo:'+err.message);
        }
      );

    }

  }

}
