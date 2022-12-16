import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';
import { Producto } from './interfaces/producto.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  urlBase:string ="http://localhost:8087/api/productos"

  constructor(private http:HttpClient, private servicioUsuario:UsuarioService) { }

  httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  addAuthorizationHeader():any{
    let token = this.servicioUsuario.token;
    if(token != null){
      return this.httpHeaders.append('Authorization','Bearer '+token)
    }
    return this.httpHeaders;
  }

  mostrarProductos():Observable<Producto[]>{
    return this.http.get<Producto[]>(this.urlBase);
  }

    //metodo para enviar datos a api post
    guardarProducto(producto:Producto):Observable<Producto>{
      return this.http.post<Producto>(this.urlBase, producto,{headers:this.addAuthorizationHeader()});
    }

    getproducto(id:Number):Observable<Producto>{
      return this.http.get<Producto>(`${this.urlBase}/${id}`,{headers:this.addAuthorizationHeader()});
    }

    update(producto:Producto):Observable<Producto>{
      return this.http.put<Producto>(`${this.urlBase}/${producto.id}`, producto,{headers:this.addAuthorizationHeader()});
    }

    delete(id:Number):Observable<Producto>{
      return this.http.delete<Producto>(`${this.urlBase}/${id}`,{headers:this.addAuthorizationHeader()});
    }
}
