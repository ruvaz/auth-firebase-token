import {Component, OnInit} from '@angular/core';
import {UsuarioModel} from "../../models/usuario.models";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

import {AuthService} from "../../services/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;

  constructor(private auth: AuthService,
              private route:Router) {
  }


  ngOnInit() {
    this.usuario = new UsuarioModel();
    this.usuario.email = 'ruvaz@me.com';
    this.usuario.nombre = "Ruben Vazquez"
  }


  onSubmit(form: NgForm) {
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

    // console.log('Formulario enviado');
    // console.log(form);
    this.auth.nuevoUsuario(this.usuario).subscribe(resp => {
      console.log('nuevo usuario registrado');
      console.log(resp);
      Swal.close();

      this.route.navigateByUrl('/home');

    }, (err) => {
      console.log('Error de usuario');
      console.log(err.error.error.message);
      Swal.fire({
        icon: 'error',
        type: 'error',
        title: 'Error al registrar',
        text: err.error.error.message
      });
    });

  }


}
