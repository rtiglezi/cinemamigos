import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MooviesService } from "app/providers/moovies.service";

@Component({
  selector: "app-sugestoes-page",
  templateUrl: "./sugestoes-page.component.html",
  styleUrls: ["./sugestoes-page.component.css"],
  providers: [MooviesService]
})
export class SugestoesPageComponent implements OnInit {

  arrayMoovies = [];
  selectedValue = null;

  private sub: any;

  public searchParam: String;

  btn1Class;
  btn2Class;
  btn3Class;

  public lista_filmes = new Array<any>();
  public search: String;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public moviesService: MooviesService
  ) {
  }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(qp => {
      this.getLastMoovies(qp["searchParam"]);
    });
  }

  getLastMoovies(searchParam="popular") {
    if (searchParam == "top_rated") {
      this.search = "Filmes melhor avaliados até agora";
      this.btn1Class = "btn btn-sm btn-danger";
      this.btn2Class = "btn btn-dark btn-sm";
      this.btn3Class = "btn btn-dark btn-sm";
    } else if (searchParam == "upcoming") {
      this.search = "Filmes em estreia";
      this.btn1Class = "btn btn-dark btn-sm";
      this.btn2Class = "btn btn-dark btn-sm";
      this.btn3Class = "btn btn-danger btn-sm";
    } else if (searchParam == "popular") {
      this.search = "Filmes com maior popularidade até agora";
      this.btn1Class = "btn btn-dark btn-sm";
      this.btn2Class = "btn btn-danger btn-sm";
      this.btn3Class = "btn btn-dark btn-sm";
    }

    this.searchParam = searchParam;

    this.moviesService.getLatestMovies(searchParam).subscribe(data => {
      const response = data as any;
      const objeto_retorno = JSON.parse(response._body);
      this.lista_filmes = objeto_retorno.results;
    });
  }

  go(searchParam) {
    this.router.navigate(['sugestoes'], {
      queryParams: { searchParam: searchParam }
    });
  }

  navigate(id) {
    this.router.navigate(["moovie"], {
      queryParams: { id: id, origem: "sugestoes", searchParam: this.searchParam }
    });
  }

  backClicked() {
    this.router.navigate([""]);
  }
}
