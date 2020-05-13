import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';

import {UsuarioModel} from "../../models/usuario.models";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recordar = false;

  constructor(private  auth: AuthService,
              private route: Router) {
  }

  ngOnInit() {
    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recordar=true;
    }
  }

  login(form: NgForm) {
    //valida informacion valida
    if (form.invalid) {
      return;
    }

    Swal.fire('Espere por favor...',
      'Cargando..',
      'info'
    );
    Swal.showLoading();

    this.auth.doLogin(this.usuario)
      .subscribe(resp => {
        // login valido
        if (this.recordar) {
          localStorage.setItem('email', this.usuario.email);
        }
        Swal.close();
        this.route.navigateByUrl('/home');
      }, (err) => {
        //Login Invalido
        console.log(err.error.error.message);
        let error = err.error.error.message;
        Swal.fire(
          'Error al autenticar',
          error,
          'error'
        );
      });
  }

}
