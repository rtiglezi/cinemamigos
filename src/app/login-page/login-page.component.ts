import { AngularFireDatabase } from "angularfire2/database";

import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../providers/auth.service";
import { LocalUser } from "../models/local_user";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"]
})
export class LoginPageComponent {

  public now = new Date();

  constructor(
      public authService: AuthService,
      private router: Router,
      private db: AngularFireDatabase
      ) {}

  login() {
    this.authService.loginWithGoogle().then(data => {
      const user: LocalUser = {
        user_uid: data.auth.uid,
        user_displayName: data.auth.displayName,
        user_email: data.auth.email,
        user_photo: data.auth.photoURL
      };
      this.authService.setLocalUser(user);
      this.router.navigate([""]);
      this.registerLogin(user);
    });
  }

  loginTwitter() {
    this.authService.loginWithTwitter().then(data => {
      const user: LocalUser = {
        user_uid: data.auth.uid,
        user_displayName: data.auth.displayName,
        user_email: data.auth.email,
        user_photo: data.auth.photoURL
      };
      this.authService.setLocalUser(user);
      this.router.navigate([""]);
      this.registerLogin(user);
    });
  }

  dataAtualFormatadaUS(): string {
    var data = new Date(),
      dia = data.getDate().toString(),
      diaF = dia.length == 1 ? "0" + dia : dia,
      mes = (data.getMonth() + 1).toString(),
      mesF = mes.length == 1 ? "0" + mes : mes,
      anoF = data.getFullYear(),
      hora = data.getHours().toString(),
      horaF = hora.length == 1 ? "0" + hora : hora,
      minuto = data.getMinutes().toString(),
      minutoF = minuto.length == 1 ? "0" + minuto : minuto,
      segundo = data.getSeconds().toString(),
      segundoF = segundo.length == 1 ? "0" + segundo : segundo;
    return (
      anoF +
      "/" +
      mesF +
      "/" +
      diaF +
      " " +
      horaF +
      ":" +
      minutoF +
      ":" +
      segundoF
    );
  }


  registerLogin(user) {
    this.db
      .object("usuarios/" + user.user_uid + "/dados")
      .update({
        Id: user.user_uid,
        nome: user.user_displayName,
        email: user.user_email,
        foto: user.user_photo,
        ultimoAcesso: this.dataAtualFormatadaUS()
      })
      .then(r => { });
  }


}
