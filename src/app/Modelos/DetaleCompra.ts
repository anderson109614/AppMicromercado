import { Detalle } from './Detalle';
import {Producto} from './Producto';
export interface DetalleCompra{
    Det:Detalle,
    Pro:Producto
    Cantidad:string,
    SubTotal?:string
  }