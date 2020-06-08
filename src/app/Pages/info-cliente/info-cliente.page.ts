import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { SerConeccionService } from 'src/app/Servicios/ser-coneccion.service';
import { SerApiService } from 'src/app/Servicios/ser-api.service';
@Component({
  selector: 'app-info-cliente',
  templateUrl: './info-cliente.page.html',
  styleUrls: ['./info-cliente.page.scss'],
})
export class InfoClientePage implements OnInit {
  isConnected = false;
  listaCanfiguraciones:any=[];
  constructor(public toastController2: ToastController,
    public loadingCtrl: LoadingController,
    private api: SerApiService,
    private networkService: SerConeccionService) { }

  ngOnInit() {
    this.networkService.getNetworkStatus().subscribe((connected: boolean) => {
      this.isConnected = connected;
    });
    this.traerConfiguracion();
  }
  async presentToast2(msj: string) {
    console.log('toast');
    const toasti = await this.toastController2.create({
      message: msj,
      duration: 5000
    });
    toasti.present();
  }
  async traerConfiguracion(){
    if (!this.isConnected) {
      console.log('Por favor enciende tu conexión a Internet');
      //Sin coneccio 
      this.presentToast2('Sin coneccion a internet');

    } else {
      const loadingDB = await this.loadingCtrl.create({
        message: 'MICROMERCADO'
      });
      loadingDB.present();
      
      this.api.getConfiguraciones().subscribe(
        res => {
          
          this.listaCanfiguraciones=res;
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
