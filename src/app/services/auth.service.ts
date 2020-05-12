import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UsuarioModel} from "../models/usuario.models";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apikey = 'AIzaSyDl_yKcGBZ1bnDb_LGcO6nKM1iRVN-IHzw';
  userToken: string;

  constructor(private  http: HttpClient) {
  }

  logout() {

  }

  login(usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true
    };
    return this.http.post(
      `${this.url}signInWithPassword?key=${this.apikey}`, authData
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
