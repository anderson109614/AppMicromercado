import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { SerConeccionService } from '../../Servicios/ser-coneccion.service';
import { SerApiService } from '../../Servicios/ser-api.service';
import {Detalle} from '../../Modelos/Detalle';
import {DetalleCompra} from '../../Modelos/DetaleCompra';
@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.page.html',
  styleUrls: ['./detalle-producto.page.scss'],
})
export class DetalleProductoPage implements OnInit {
  @Input() Produ;
  DetalleSelec:Detalle={Id:'0',Nombre:'0',Precio:'0'};
  cantidadSel:number=1;
  Total:number=0;
  constructor(public modalController: ModalController,
    private networkService: SerConeccionService,
    public loadingCtrl: LoadingController,
    public toastController: ToastController,
    private api:SerApiService) { }
  ListaDetalle:any=[];
  ListaCantidad:any=[];
  isConnected = false;
  ngOnInit() {
    this.networkService.getNetworkStatus().subscribe((connected: boolean) => {
      this.isConnected = connected;
    });
    this.CargarDetalle();
    this.cargarCantidades();
  }
  cargarCantidades(){
    for(let i=1;i<=50;i++){
      this.ListaCantidad.push(i);
    }
  }
  async presentToast(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 5000
    });
    toast.present();
  }
  async CargarDetalle(){
    if (!this.isConnected) {
      console.log('Por favor enciende tu conexión a Internet');
      //Sin coneccio 
      this.presentToast('Coneccion no disponible');
      this.regresarBTN();

    } else {
      const loadingDB = await this.loadingCtrl.create({
        message: 'MICROMERCADO'
      });
      loadingDB.present();
      this.api.GetDetalleProducto(this.Produ.Id).subscribe(
        res => {
          console.log('pre',res);
         this.ListaDetalle=res;
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
  DetalleSelected() {
    var est = (<HTMLSelectElement>document.getElementById("GorupDetalle")).value;
    const result = this.ListaDetalle.filter(producto => producto.Id == est);
    this.DetalleSelec=result[0];
    this.Total= parseFloat(this.DetalleSelec.Precio)*this.cantidadSel;
    
  }
  CantidadSelected() {
    var est = (<HTMLSelectElement>document.getElementById("CantidaSel")).value;
    //const result = this.listaProductos.filter(producto => producto.Categoria.search(est) == 0);
    this.cantidadSel=parseFloat(est);
    this.Total= parseFloat(this.DetalleSelec.Precio)*this.cantidadSel;
  }
  regresarBTN() {
    this.modalController.dismiss({
      log: 0
    });

  }
  cilAnadir(){
    let det:DetalleCompra={
      Det:this.DetalleSelec,
      Cantidad:this.cantidadSel.toString()
    };
    if(this.verificarAñadir(det)){
      this.modalController.dismiss({
        log: 1,
        dete:det
      });
    }
    
  }
  verificarAñadir(det:DetalleCompra){
    if(det.Det.Nombre=='0'){
      this.presentToast('Seleccione un tipo de producto');
      return false;
    }
   

    return true;
  }

}
