import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Cliente} from './Modelos/Cliente';
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
      url: '/folder/1',
      icon: 'enter'
    },
    {
      title: 'Registrar',
      url: '/folder/3',
      icon: 'people-circle'
    }
  ];
  public appPagesLogAux1 = [
    {
      title: 'Iniciar Secion',
      url: '/folder/1',
      icon: 'enter'
    },
    {
      title: 'Registrar',
      url: '/folder/3',
      icon: 'people-circle'
    }
  ];
  public appPagesLogAux2 = [
    {
      title: 'Cerrar Secion',
      url: '/folder/2',
      icon: 'arrow-back'
    }
  ];
  
  loginBol=false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
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
  
  Login(){
   /*
    if(this.loginBol){
      //Accion de Cerrar la secion
     this.appPagesLog=this.appPagesLogAux1;
     
    }else{
      //Accion Para abrir el Login
      this.appPagesLog=this.appPagesLogAux2;
    }
    */
    
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
