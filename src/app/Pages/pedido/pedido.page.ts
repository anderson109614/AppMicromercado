import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {
  @Input() Lista;
  constructor(public modalController: ModalController) { }
  ListaEliminar:any=[];
  btnDesactivado=true;
  accion=0;
  total=0;
  ngOnInit() {
   this.calcularToral();
  }
  calcularToral(){
    this.total=0;
    for(let j=0;j<this.Lista.length;j++){
      this.total+=parseFloat(this.Lista[j].Det.Precio)*parseFloat(this.Lista[j].Cantidad);
    
    }
  }
  regresarBTN() {
    if(this.accion==0){
      this.modalController.dismiss({
        can: this.accion
      });
    }else{
      this.modalController.dismiss({
        can: this.accion,
        newList:this.Lista
      });
    }
    

  }

  detalleChange(detail: boolean, index: number){
    if(detail){
      this.ListaEliminar.push(index);
    }else{
      for(let i=0;i<this.ListaEliminar.length;i++){
        if(this.ListaEliminar[i]==index){
          this.ListaEliminar.splice(i,1);
          //console.log('eliminado');
          break;
        }
      }
    }
    if(this.ListaEliminar.length==0){
      this.btnDesactivado=true;
    }else{
      this.btnDesactivado=false;
    }
   //console.log('lista eliminar',this.ListaEliminar);
  }
  clickEliminar(){
    for(let i=0;i<this.ListaEliminar.length;i++){
      for(let j=0;j<this.Lista.length;j++){
        if(this.ListaEliminar[i]==this.Lista[j].Det.Id){
          this.Lista.splice(j,1);
        }
      
      }
      
    }
    this.ListaEliminar=[];
    this.btnDesactivado=true;
    this.accion=1;
    this.calcularToral();
  }
  cilComprar(){
    this.modalController.dismiss({
      can: 2,
      newList:this.Lista,
      tot:this.total
    });
  }
}
