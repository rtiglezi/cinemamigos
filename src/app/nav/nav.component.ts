import { AuthService } from "./../providers/auth.service";
import { Component, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { MooviesService } from "app/providers/moovies.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"],
  providers: [MooviesService]
})
export class NavComponent {

  public usuario;

  public arrayMoovies = [];

  @ViewChild('srchNav') domSearchNav: ElementRef;
  @ViewChild('srchIconNav') domSearchIconNav: ElementRef;


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

  go(pg) {
    this.router.navigate([pg]);
  }

  setFocus() {
    setTimeout(() => {
      this.domSearchNav.nativeElement.focus();
    },1000)
  }

  searchMoovies(query) {

    this.domSearchIconNav.nativeElement.innerHTML =
    "<img src='../assets/loader-grey.gif' style='width:25px;'/>";
    this.domSearchIconNav.nativeElement.className = "form-control-feedback";


    this.moviesService.getMovies(query).subscribe(data => {
      const response = data as any;
      const objeto_retorno = JSON.parse(response._body);
      this.arrayMoovies = objeto_retorno.results;

      if (this.arrayMoovies.length > 10) {
        this.arrayMoovies.splice(11, this.arrayMoovies.length);
      }
      console.log(this.arrayMoovies.length);

      this.domSearchIconNav.nativeElement.innerHTML =
      "<i id='i_search' class='glyphicon glyphicon-search form-control-feedback'></i>";

    });

    if (this.domSearchNav.nativeElement.value=="") {
      this.domSearchIconNav.nativeElement.innerHTML =
      "<i id='i_search' class='glyphicon glyphicon-search form-control-feedback'></i>";
    }

  }

  selectMoovie(id) {
    this.router.navigate(["moovie"], { queryParams: { id: id } });
  }


}
