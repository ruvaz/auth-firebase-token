import {Component, OnInit} from '@angular/core';
import {UsuarioModel} from "../../models/usuario.models";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;

  constructor() {
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
    console.log('Formulario enviado');
    console.log(form);
  }


}
