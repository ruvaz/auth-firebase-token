import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {UsuarioModel} from "../../models/usuario.models";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();

  constructor() {
  }

  ngOnInit() {
  }

  login(form: NgForm) {
    // if (form.invalid) {
    //   return;
    // }
    console.log(' Login form');
    console.log(form);
  }

}
