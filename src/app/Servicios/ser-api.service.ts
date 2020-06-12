import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../Modelos/Cliente';
import { Pedido } from '../Modelos/Pedido';
import { PedidoPage } from '../Pages/pedido/pedido.page';
import { Detalle } from '../Modelos/Detalle';
import { DetalleCompra } from '../Modelos/DetaleCompra';
@Injectable({
  providedIn: 'root'
})
export class SerApiService {
   urlP:string='https://serviciosand.000webhostapp.com/API-Micromercado/'; 
  //urlP: string = 'http://localhost/AppMicromercado/API-Micromercado/';
  //urlP:string='http://micromercadoand.atwebpages.com/API-Micromercado/'; 
  constructor(private http: HttpClient) { }

  loginSer(cli: Cliente) {
    return this.http.post<Cliente>(this.urlP + 'Usuario/Usuario.php', cli)
  }
  guardarCliente(cli: Cliente) {
    return this.http.post<Cliente>(this.urlP + 'Usuario/Cliente.php', cli)
  }
  GetClientesMail(mail: String) {
    return this.http.get(this.urlP + 'Usuario/Cliente.php?mail=' + mail)
  }
  GetProductos() {
    return this.http.get(this.urlP + 'Producto/Producto.php');
  }
  AñadirImg(img) {
    let en = { imgen: img }
    return this.http.post(this.urlP + 'Producto/Producto.php', en);
  }
  GetCategorias() {
    return this.http.get(this.urlP + 'Producto/Categoria.php');
  }
  GetDetalleProducto(Id: String) {
    return this.http.get(this.urlP + 'Producto/Detalle.php?Id=' + Id);
  }
  guardarPedido(ped: Pedido) {
    return this.http.post<Pedido>(this.urlP + 'Pedido/Pedido.php', ped);
  }

  guardarDetallePedido(ped: DetalleCompra,idPed) {
    let det={
      id:'0',
      Id_Det_Prod:ped.Det.Id,
      Id_Pedido:idPed,
      Cantidad :ped.Cantidad
    }
    return this.http.post(this.urlP + 'Pedido/Detalle.php', det);
  }
  getPedidorUsuario(id:String){
    return this.http.get(this.urlP + 'Pedido/Detalle.php?Id='+id);
  }
  getConfiguraciones(){
    return this.http.get(this.urlP + 'Configuracion/Configuracion.php');
  }
}
