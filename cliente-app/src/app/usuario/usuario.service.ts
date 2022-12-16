import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './login/clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private _usuario!:Usuario;
  private _token!:string;


  constructor( private http:HttpClient) { }

  //devuelve datos de usuario guardado
  public get usuario():Usuario{

    if(this._usuario != null){
      return this._usuario;
    }else if(this._usuario == null && sessionStorage.getItem('usuario') != null){
      this._usuario = JSON.parse(sessionStorage.getItem('usuario') || '{}') as Usuario;
    }

    return new Usuario();
  }

  //devuelve el token guardado
  public get token():string{

    if(this._token != null){
      return this._token;
    }else if(this._token == null && sessionStorage.getItem('token') != null){
      this._token = sessionStorage.getItem('token') || '{}'
      return this._token
    }
    return "";

  }




  login(usuario:Usuario):Observable<any>{
    const urlEndpoint = 'http://localhost:8087/oauth/token';
    const credenciales = btoa('angularapp'+':'+'admin123');

    //objeto de tipo cabecera
    const httpHeaders = new HttpHeaders({
      'Content-Type':'application/x-www-form-urlencoded',
      'Authorization': 'Basic '+credenciales
    });

    let params = new URLSearchParams();
    params.set('grant_type','password');
    params.set('username',usuario.username);
    params.set('password',usuario.password);

    console.log("login parametros pasados:",params.toString());

    return this.http.post<any>(urlEndpoint, params.toString(),{headers: httpHeaders} );
  }
  //guardar usuario recibido desde token payload
  guardarUsuario(accessToken:string):void{
    let payload = this.obtenerDatosToken(accessToken);
    this._usuario = new Usuario();
    this._usuario.nombre = payload.nombre;
    this._usuario.apellido = payload.apellido;
    this._usuario.email = payload.email;
    this._usuario.username = payload.user_name;
    this._usuario.roles= payload.authorities;
    sessionStorage.setItem('usuario',JSON.stringify(this._usuario))
  }

  //metodo para guardar token
  guardarToken(accessToken:string):void{
    this._token = accessToken;
    sessionStorage.setItem('token',accessToken);
  }

  obtenerDatosToken(accessToken:string):any{
    if(accessToken != null){
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  //saber si esta autenticado
  isAuthenticated():boolean{
    let payload = this.obtenerDatosToken(this.token)

    if (payload != null && payload.username && payload.username.length >0){
      return true;
    }

    return false;
  }

  //cerrar login
  logout():void{
    this._token='';
    this._usuario = new Usuario();
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
  }




}

