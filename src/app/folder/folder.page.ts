import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoginPage } from '../Pages/login/login.page';
import { RegistroCliPage } from '../Pages/registro-cli/registro-cli.page';
import { AppComponent } from '../app.component';
import { Cliente } from '../Modelos/Cliente';
import { SerApiService } from '../Servicios/ser-api.service';
import { ToastController, LoadingController } from '@ionic/angular';
import { SerConeccionService } from '../Servicios/ser-coneccion.service';
import { Producto } from '../Modelos/Producto';
import { DetalleProductoPage } from '../Pages/detalle-producto/detalle-producto.page';
import { PedidoPage } from '../Pages/pedido/pedido.page';
import { Pedido } from '../Modelos/Pedido';
import { Geolocation } from '@ionic-native/geolocation/ngx';
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string = "MICROMERCADO";
  listaProductos: any = [];
  listaProductosAux: any = [];
  listaCategorias: any = [];
  listaCategoriasAux: any = [];
  isConnected = false;
  clienteUso: Cliente;
  registrosUpt: number = 0;
  ListaDetalles: any = [];
  btnDesactivado = true;
  usuarioUso: Cliente;
  total = '';
  lat;
  lon;
  constructor(public modalController: ModalController,
    private activatedRoute: ActivatedRoute,
    private api: SerApiService,
    public ac: AppComponent,
    public toastController2: ToastController,
    public loadingCtrl: LoadingController,
    private networkService: SerConeccionService,
    private geolocation: Geolocation) { }

  ngOnInit() {
    this.networkService.getNetworkStatus().subscribe((connected: boolean) => {
      this.isConnected = connected;
    });

    this.cargarProductos();
    this.cargarCategorias();

  }
  EstadoSelected() {
    var est = (<HTMLSelectElement>document.getElementById("selEstado")).value;
    this.listaProductos = this.listaProductosAux;
    const result = this.listaProductos.filter(producto => producto.Categoria.search(est) == 0);
    this.listaProductos = result;
  }
  onCancel(ev: any) {
    this.listaProductos = this.listaProductosAux;
  }
  checkPaquete($event: KeyboardEvent) {

    this.listaProductos = this.listaProductosAux;

    let value = (<HTMLInputElement>event.target).value;
    if (value != "") {
      const result = this.listaProductos.filter(paquete => paquete.Categoria.toUpperCase().search(value.toUpperCase()) >= 0
        || paquete.Nombre.toUpperCase().search(value.toUpperCase()) >= 0
      );
      this.listaProductos = result;
    } else {
      this.listaProductos = this.listaProductosAux;
    }
    //codpaquete

  }
  cargarCategorias() {
    if (!this.isConnected) {
      console.log('Por favor enciende tu conexión a Internet');
      //Sin coneccio 
      this.presentToast2('Sin coneccion a internet');

    } else {

      this.api.GetCategorias().subscribe(
        res => {
          console.log('cat', res);
          this.listaCategorias = res;
          this.listaCategoriasAux = res;

        },
        err => {
          console.log(err);

          //this.presentToast('Error Tiempo:'+err.message);
        }
      );

    }
  }
  async presentToast2(msj: string) {
    console.log('toast');
    const toasti = await this.toastController2.create({
      message: msj,
      duration: 5000
    });
    toasti.present();
  }
  /*
  async AbrirLogin() {
    const modal = await this.modalController.create({
      component: LoginPage

    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    //conectado: con, conectado 1 desconectado 0
    //idUsuario:idu
    try {

      if (data.log == 1) {
        //Cuando Inicio Secion
        this.ac.mostarInfoCliente(data.clie);
        this.clienteUso=data.clie;
      } 
    } catch (error) {

    }

  }
 

  async AbrirRegistroCli() {
    const modal = await this.modalController.create({
      component: RegistroCliPage

    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    //conectado: con, conectado 1 desconectado 0
    //idUsuario:idu
    try {

      if (data.log == 1) {
        //Cuando el registro fue Correcto
        this.ac.mostarInfoCliente(data.clie);
        this.clienteUso=data.clie;
      }
    } catch (error) {

    }
  }
   */
  añadirUsuarioUso(cli: Cliente) {
    this.usuarioUso = cli;
    console.log('aña', cli);
    this.actDestCarroPedido();
  }
  async cargarProductos() {
    if (!this.isConnected) {
      console.log('Por favor enciende tu conexión a Internet');
      //Sin coneccio 
      this.presentToast2('Sin coneccion a internet');

    } else {
      const loadingDB = await this.loadingCtrl.create({
        message: 'MICROMERCADO'
      });
      loadingDB.present();
      this.api.GetProductos().subscribe(
        res => {
         // console.log('prod', res);
          this.listaProductos = res;
          this.listaProductosAux = res;
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

  base64textStringG = '';
  onUploadChange(evt: any) {
    const file = evt.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(e) {
    this.base64textStringG = 'data:image/png;base64,' + btoa(e.target.result);
    //console.log(this.base64textStringG);
  }
  GuardarImg() {
    this.api.AñadirImg(this.base64textStringG).subscribe(
      res => {
        console.log('ima', res);

      },
      err => {
        console.log(err);

        //this.presentToast('Error Tiempo:'+err.message);
      }
    );
  }
  async MostrarProducto(prod: Producto) {
   // console.log(prod);
    const modal = await this.modalController.create({
      component: DetalleProductoPage,
      componentProps: {
        Produ: prod
      }

    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    //conectado: con, conectado 1 desconectado 0
    //idUsuario:idu
    try {

      if (data.log == 1) {
        let sumo: boolean = false;

        for (let i = 0; i < this.ListaDetalles.length; i++) {

          if (this.ListaDetalles[i].Det.Id == data.dete.Det.Id) {
            this.ListaDetalles[i].Cantidad = (parseFloat(this.ListaDetalles[i].Cantidad) + parseFloat(data.dete.Cantidad)).toString();
            sumo = true;
            break;
          }

        }
       // console.log(sumo);
        if (!sumo || this.ListaDetalles.length == 0) {
          this.ListaDetalles.push(data.dete);
        }


        this.registrosUpt = this.ListaDetalles.length;
        this.actDestCarroPedido();
        //console.log('lista det com', this.ListaDetalles);
      }
    } catch (error) {

    }
  }
  async clickPredido() {
    const modal = await this.modalController.create({
      component: PedidoPage,
      componentProps: {
        Lista: this.ListaDetalles
      }

    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    //conectado: con, conectado 1 desconectado 0
    //idUsuario:idu
    try {
     // console.log(data.can);
      if (data.can == 1) {
        //Cambio en la lista
        this.ListaDetalles = data.newList;
        this.registrosUpt = this.ListaDetalles.length;
        this.actDestCarroPedido();
      }
      if (data.can == 2) {

        this.ListaDetalles = data.newList;
        this.registrosUpt = this.ListaDetalles.length;
        this.actDestCarroPedido();
        this.total = data.tot;
        this.guardarPedido();
      }
    } catch (error) {

    }

  }
  guardarPedido() {
 
      if (this.isConnected) {

        if (!this.btnDesactivado) {

          if (this.ac.clienteUso.Nombre != 'Usuario') {

            this.enviarInformacioPedido();
          } else {

            this.presentToast2('Inicia Sesion o Registrate');

          }
        } else {
          this.presentToast2('Añade minimo un producto');

        }


      } else {
        this.presentToast2('Coneccion no disponible');

      }
   


  }
  async enviarInformacioPedido() {
    const loadingDBen = await this.loadingCtrl.create({
      message: 'MICROMERCADO'
    });
    loadingDBen.present();
    
    this.CargarLocalisacion();
    let ped: Pedido = {
      Id: '0',
      Fecha: '',
      Id_Cliente: this.ac.clienteUso.Id.toString(),
      Id_Estado: '1',
      Total: this.total,
      Ubicacion: this.lat + ';' + this.lon,
      IVA:''


    };
    this.api.guardarPedido(ped).subscribe(
      res => {
        if (res.Id != '0') {
          for (let i = 0; i < this.ListaDetalles.length; i++) {
            this.api.guardarDetallePedido(this.ListaDetalles[i], res.Id).subscribe(
              res => {
                if (i == this.ListaDetalles.length - 1) {
                  this.ListaDetalles = [];
                  this.registrosUpt = this.ListaDetalles.length
                  this.btnDesactivado = true;
                  loadingDBen.dismiss();
                }
              },
              err => {
                console.log(err);
                loadingDBen.dismiss();
                //this.presentToast('Error Tiempo:'+err.message);
              }
            );
          }
        }

      },
      err => {
        console.log(err);
        loadingDBen.dismiss();
        //this.presentToast('Error Tiempo:'+err.message);
      }
    );

  }
  CargarLocalisacion() {

    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lon = resp.coords.longitude;


    }).catch((error) => {

    });

  }
  actDestCarroPedido() {
    if (this.ListaDetalles.length > 0) {

      this.btnDesactivado = false;


    } else {
      this.btnDesactivado = true;

    }


  }

}
