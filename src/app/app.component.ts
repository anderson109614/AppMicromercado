import { Component, OnInit } from '@angular/core';

import { Platform, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Cliente} from './Modelos/Cliente';
import { LoginPage } from './Pages/login/login.page';
import { RegistroCliPage } from './Pages/registro-cli/registro-cli.page';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  cliente:Cliente={Contrasena:'',
  Email:'mail@micromercado.com',
  Nombre:'Usuario',
  Apellido:'',
  Foto:'../assets/user.png'};
  public appPages = [
    {
      title: 'Home',
      url: '/folder/Home',
      icon: 'home'
    },
    {
      title: 'Perfil',
      url: '/info-cliente',
      icon: 'body'
    },
    {
      title: 'Compras',
      url: '/compras',
      icon: 'cash'
    
    }
  ];
  public appPagesLog = [
    {
      title: 'Iniciar Secion',
      url: '1',
      icon: 'enter'
    },
    {
      title: 'Registrar',
      url: '3',
      icon: 'people-circle'
    }
  ];
  public appPagesLogAux1 = [
    {
      title: 'Iniciar Secion',
      url: '1',
      icon: 'enter'
    },
    {
      title: 'Registrar',
      url: '3',
      icon: 'people-circle'
    }
  ];
  public appPagesLogAux2 = [
    {
      title: 'Cerrar Secion',
      url: '2',
      icon: 'arrow-back'
    }
  ];
  
  loginBol=false;
  public clienteUso:Cliente;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public modalController: ModalController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    /*
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
*/
  }
  
  Login(ac:string){
    
    try {
      let llegada = ac;
      console.log(llegada);
      if (llegada == '1') {
        this.AbrirLogin();
      } else if (llegada == '2') {
        //cerrar secion
        this.clienteUso={Contrasena:'',Email:'mail@micromercado.com',Nombre:'Usuario',Apellido:'',Foto:'../assets/user.png'};;
        this.mostarInfoCliente(this.clienteUso);
      } else if (llegada == '3') {
        this.AbrirRegistroCli();
      }
    } catch (error) {
      console.log('error');
    }
    
  }
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
        this.mostarInfoCliente(data.clie);
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
        this.mostarInfoCliente(data.clie);
        this.clienteUso=data.clie;
      }
    } catch (error) {

    }
  }
  mostarInfoCliente(cli:Cliente){
    this.cliente=cli;
    this.loginBol=!this.loginBol;
    if(this.loginBol){
      //Accion de Cerrar la secion
     this.appPagesLog=this.appPagesLogAux2;
     
    }else{
      //Accion Para abrir el Login
      this.appPagesLog=this.appPagesLogAux1;
    }
  }
  test(){
    console.log('test');
  }
}
