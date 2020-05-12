import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UsuarioModel} from "../models/usuario.models";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apikey = 'AIzaSyDl_yKcGBZ1bnDb_LGcO6nKM1iRVN-IHzw';

  userToken: string;

  constructor(private  http: HttpClient) {
    this.leerToken();
  }

  logout() {

  }

  doLogin(usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true
    };
    return this.http.post(
      `${this.url}signInWithPassword?key=${this.apikey}`, authData
    ).pipe(
      map(resp => {
        console.log('login, entro en el mapa del RXJS');
        this.guardarToken(resp['idToken']);
        return resp;
      })
    );

  }

  nuevoUsuario(usuario: UsuarioModel) {
    const authData = {
      // email:usuario.email,
      // pasword: usuario.password,
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}signUp?key=${this.apikey}`, authData
    ).pipe(
      map(resp => {
        console.log('Nuevo usuario, entro en el mapa del RXJS - Guardando Token');
        this.guardarToken(resp['idToken']);
        return resp;
      })
    );

  }

  private guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  leerToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
  }

}
