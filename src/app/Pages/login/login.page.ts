import { Component, OnInit } from '@angular/core';
import {SerConeccionService} from '../../Servicios/ser-coneccion.service';
import { ModalController, ToastController } from '@ionic/angular';
import {SerApiService} from '../../Servicios/ser-api.service';
import {Cliente} from '../../Modelos/Cliente';
import {Md5} from 'ts-md5/dist/md5';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isConnected = false;
  constructor( private networkService: SerConeccionService,public modalController: ModalController
    ,public toastController: ToastController, private api:SerApiService) { }

  ngOnInit() {
    this.networkService.getNetworkStatus().subscribe((connected: boolean) => {
      this.isConnected = connected;
    });
  }
  regresarBTN() {
    
    this.modalController.dismiss({
      log: 0
    });
  }
  clickLogin(){

    if (!this.isConnected) {
      console.log('Por favor enciende tu conexión a Internet');
      //Sin coneccio 
      

    } else {
      this.loginConectado();
    }
      


  }
  loginConectado(){
    var txtUsuario = (<HTMLInputElement>document.getElementById("txtUsuario")).value;
    var txtContraseña =Md5.hashStr((<HTMLInputElement>document.getElementById("txtContraseña")).value).toString();
    //var txtContraseña =(<HTMLInputElement>document.getElementById("txtContraseña")).value;
    let usr:Cliente={
      Contrasena:txtContraseña,
      Email:txtUsuario
    
    }
    
    this.api.loginSer(usr).subscribe(
      res => {
        try {
          if(res[0].Email==txtUsuario){
            console.log('Entro');
            this.modalController.dismiss({
              log: 1,
              clie:res[0]
            });
            //programar procedimiento para guardar el localdb
          }
        } catch (error) {
          console.log('Error');
          this.presentToast('Usuario o Contraeña icorrectos');
        }
        
      },
      err => {
        console.log(err);
        //this.presentToast('Error Tiempo:'+err.message);
      }
    );
  }
  async presentToast(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 5000
    });
    toast.present();
  }


}
