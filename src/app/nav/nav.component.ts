import { AuthService } from "./../providers/auth.service";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { MooviesService } from "app/providers/moovies.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"],
  providers: [MooviesService]
})
export class NavComponent {
  arrayMoovies = [];

  public usuario;

  constructor(
    public authService: AuthService,
    private router: Router,
    public moviesService: MooviesService
  ) {
    this.usuario = this.authService.getLocalUser().user_displayName;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["login"]);
  }

  searchMoovies(query) {
    this.moviesService.getMovies(query).subscribe(data => {
      const response = data as any;
      const objeto_retorno = JSON.parse(response._body);
      console.log(objeto_retorno.results);
      this.arrayMoovies = objeto_retorno.results;
    });
  }

  selectMoovie(id) {
    this.router.navigate(["moovie"], { queryParams: { id: id } });
  }

  go(pg) {
    this.router.navigate([pg]);
  }
}
