import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { AuthService } from "app/providers/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-painel-page",
  templateUrl: "./painel-page.component.html",
  styleUrls: ["./painel-page.component.css"]
})
export class PainelPageComponent implements OnInit {

  localUser = this.authService.getLocalUser();

  privado: boolean;


  constructor(
    private db: AngularFireDatabase,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getPrivacidade();
  }

  setPrivacidade(privacidade) {
    this.db.object("usuarios/" + this.localUser.user_uid + "/dados")
    .update({
      privado: privacidade
    }).then(r=>{
      this.privado = privacidade;
    })
  }

  getPrivacidade() {
    this.db.object("usuarios/" + this.localUser.user_uid + "/dados")
    .subscribe(r => {
      this.privado = r.privado;
    })
  }


  navigate(status) {
    this.router.navigate(["mymoovies"], {
      queryParams: { status: status }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["login"]);
  }

}
