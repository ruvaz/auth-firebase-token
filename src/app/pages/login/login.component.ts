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

  constructor(private  auth: AuthService,
              private route: Router) {
  }

  ngOnInit() {
  }

  login(form: NgForm) {
    //valida informacion valida
    if (form.invalid) {
      return;
    }

    Swal.fire({
      icon: 'info',
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.auth.doLogin(this.usuario)
      .subscribe(resp => {
        // login valido
        console.log(resp);
        Swal.close();
        this.route.navigateByUrl('/home');
      }, (err) => {
        //Login Invalido
        console.log(err.error.error.message);
        Swal.fire({
          icon: 'error',
          type: 'error',
          title: 'Error al autenticar',
          text: err.error.error.message
        });
      });
  }

}
