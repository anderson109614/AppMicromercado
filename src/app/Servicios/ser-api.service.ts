import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Cliente} from '../Modelos/Cliente';
@Injectable({
  providedIn: 'root'
})
export class SerApiService {
 // urlP:string='https://serviciosand.000webhostapp.com/Servicios/'; 
 urlP:string='http://localhost/AppMicromercado/API-Micromercado/'; 
 constructor(private http:HttpClient) { }

  loginSer(cli:Cliente){
    return this.http.post<Cliente>(this.urlP + 'Usuario/Usuario.php',cli)
  }
  guardarCliente(cli:Cliente){
    return this.http.post<Cliente>(this.urlP + 'Usuario/Cliente.php',cli)
  }
  GetClientesMail(mail:String){
    return this.http.get(this.urlP + 'Usuario/Cliente.php?mail='+mail)
  }
  GetProductos(){
    return this.http.get(this.urlP + 'Producto/Producto.php');
  }
  AñadirImg(img){
    let en={imgen:img}
    return this.http.post(this.urlP + 'Producto/Producto.php',en);
  }
  GetCategorias(){
    return this.http.get(this.urlP + 'Producto/Categoria.php');
  }
}
