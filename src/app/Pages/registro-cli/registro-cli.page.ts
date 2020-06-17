import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import {Cliente} from '../../Modelos/Cliente';
import {SerApiService} from '../../Servicios/ser-api.service';
import {SerConeccionService} from '../../Servicios/ser-coneccion.service';
import {Md5} from 'ts-md5/dist/md5';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
@Component({
  selector: 'app-registro-cli',
  templateUrl: './registro-cli.page.html',
  styleUrls: ['./registro-cli.page.scss'],
})
export class RegistroCliPage implements OnInit {
  isConnected = false;
  foto: string = '';
  listaMails:any=[];
  constructor(public modalController: ModalController,
    public toastController: ToastController,
    private api:SerApiService,
    private networkService: SerConeccionService,
    private camera: Camera,) { }
  cedula:string='';
  ngOnInit() {
    this.networkService.getNetworkStatus().subscribe((connected: boolean) => {
      this.isConnected = connected;
    });
    this.CargarMails();
  }
  regresarBTN() {
    this.modalController.dismiss({
      log: 0
    });

  }
  CargarMails(){
    this.api.GetClientesMail('Anderson').subscribe(
      res => {
        this.listaMails=res;
        
      },
      err => {
        console.log(err);
        
      }
    );
  }
  hacerFoto() {
    const options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      saveToPhotoAlbum:true
    }
    this.camera.getPicture(options).then((imageData) => {
      let fotoAux = 'data:image/jpeg;base64,' + imageData;
      
        this.foto = fotoAux;
      


      console.log('Tamaño Foto: ' + this.foto.length);
    }, (err) => {
      console.log(err);
    });
  }
  SelecFoto() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }
    this.camera.getPicture(options).then((imageData) => {
      let fotoAux = 'data:image/jpeg;base64,' + imageData;
      
        this.foto = fotoAux;
       


      console.log('Tamaño Foto: ' + this.foto.length);
    }, (err) => {
      console.log(err);
    });
  }
  async presentToast(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 5000
    });
    toast.present();
  }
  checkCedula($event: KeyboardEvent){
    let value = (<HTMLInputElement>event.target).value;
    //console.log(value);
    if(value.length>10){
      (<HTMLInputElement>event.target).value=this.cedula;
    }else{
      this.cedula=value;
    }
  }
  GuardarCliente(){
    let cli:Cliente={
      Cedula: this.cedula,
      Nombre: (<HTMLInputElement>document.getElementById("txtNombre")).value,
      Apellido: (<HTMLInputElement>document.getElementById("txtApellido")).value,
      Telefono: (<HTMLInputElement>document.getElementById("txtTelefono")).value,
      Celular: (<HTMLInputElement>document.getElementById("txtCelular")).value,
      Direccion: (<HTMLInputElement>document.getElementById("txtDireccion")).value,
      Email: (<HTMLInputElement>document.getElementById("txtEmail")).value.toLowerCase(),
      Contrasena:Md5.hashStr((<HTMLInputElement>document.getElementById("txtContraseña")).value).toString(),
      Ubicacion:'',
      Foto:this.foto
    }
    if(this.verificacionInformacio(cli)){
      if (!this.isConnected) {
        console.log('Por favor enciende tu conexión a Internet');
        //Sin coneccio 
        
  
      } else {
        this.enviarInformacion(cli);

      }
        

    }



  }
  enviarInformacion(cli:Cliente){
    this.api.guardarCliente(cli).subscribe(
      res => {
        this.presentToast('Cliente registrado');
        this.modalController.dismiss({
          log: 1,
          clie:cli
        });
      },
      err => {
        console.log(err);
        //this.presentToast('Error Tiempo:'+err.message);
      }
    );
  }
  verificacionInformacio(cli:Cliente){
    //console.log(cli);
    
    let con:string=Md5.hashStr((<HTMLInputElement>document.getElementById("txtContraseñaCon")).value).toString();
    //console.log(con);
    if(cli.Cedula.length!=10){
      this.presentToast('Añada cedula');
      return false;
    }
    if(cli.Nombre.length<=0){
      this.presentToast('Añada Nombre');
      return false;
    }
    if(cli.Apellido.length<=0){
      this.presentToast('Añada Apellido');
      return false;
    }
    if(cli.Celular.length!=10){
      this.presentToast('Añada Celular');
      return false;
    }
    if(cli.Direccion.length<=0){
      this.presentToast('Añada Direccion');
      return false;
    }
    if(!this.verificarEmail(cli.Email)){
      this.presentToast('Añada Email valido');
      return false;
    }
    if(this.mailEsxistencia(cli.Email)){
      console.log('mail',cli.Email);
      this.presentToast('El Email ya de encuentra registrado');
      return false;
    }
    if(cli.Contrasena.length<=0){
      this.presentToast('Añada Contraseña');
      return false;
    }
    if(cli.Contrasena!=con){
      this.presentToast('Las contraseñas no coinciden');
      return false;
    }

    return true
  }
  mailEsxistencia(mail:String){
    for(let i=0;i<this.listaMails.length;i++){
      if(this.listaMails[i].Email==mail){
        return true;
      }
    }
    return false;
  }
  verificarEmail(mail:String){
    let sep=mail.split('@');
    if(sep.length!=2){
      return false;
    }
    let pun=sep[1].split('.');
    if(pun.length!=2){
      return false;
    }
    return true;
  }
}
