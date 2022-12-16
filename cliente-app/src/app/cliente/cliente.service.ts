import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';
import { Cliente } from './interfaces/cliente.interface';
import { Region } from './interfaces/region.interface';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  urlBase:string="http://localhost:8087/api/clientes"

  constructor(private http:HttpClient, private servicioUsuario:UsuarioService) { }

  httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  agregarAuthorizationHeader():any{
    let token = this.servicioUsuario.token;
    if(token != null){
      return this.httpHeaders.append('Authorization','Bearer '+token)
    }
    return this.httpHeaders;
  }

  mostrarCliente():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.urlBase);
  }

  //metodo para enviar datos a api post
  guardarCliente(cliente:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.urlBase, cliente,{headers:this.agregarAuthorizationHeader()});
  }

  getCliente(id:Number):Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlBase}/${id}`,{headers:this.agregarAuthorizationHeader()});
  }

  update(cliente:Cliente):Observable<Cliente>{
    return this.http.put<Cliente>(`${this.urlBase}/${cliente.id}`,{headers:this.agregarAuthorizationHeader()});
  }

  delete(id:Number):Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlBase}/${id}`,{headers:this.agregarAuthorizationHeader()});
  }

  getRegiones():Observable<Region[]>{
    return this.http.get<Region[]>(`${this.urlBase}/regiones`,{headers:this.agregarAuthorizationHeader()});
  }

  subirImagen(archivo:File, id:any):Observable<HttpEvent<any>>{
    let formData = new FormData();
    formData.append("archivo",archivo);
    formData.append("id",id);
    let httpHeaders = new HttpHeaders();
    let token = this.servicioUsuario.token;
    if(token!= null){
      httpHeaders = httpHeaders.append('Authorization','Bearer '+token);
    }
    const req = new HttpRequest('POST',`${this.urlBase}/uploads` ,formData, {headers: httpHeaders});

    return this.http.request(req).pipe(
      resp => resp
    );
  }

}
