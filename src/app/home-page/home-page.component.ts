import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MooviesService } from "app/providers/moovies.service";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"],
  providers: [MooviesService]
})
export class HomePageComponent implements OnInit {

  arrayMoovies = [];
  selectedValue = null;

  private sub: any;

  public searchParam: String;

  public lista_filmes = new Array<any>();
  public search: String;
  public colorTitle: String = "";

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

  getLastMoovies(searchParam="top_rated") {
    if (searchParam == "top_rated") {
      this.search = "Filmes mais bem avaliados";
      this.colorTitle = "darkgoldenrod";
    } else if (searchParam == "upcoming") {
      this.search = "Filmes estreando";
      this.colorTitle = "darkgreen";
    } else if (searchParam == "popular") {
      this.search = "Filmes mais populares";
      this.colorTitle = "darkred";
    }

    this.searchParam = searchParam;

    this.moviesService.getLatestMovies(searchParam).subscribe(data => {
      const response = data as any;
      const objeto_retorno = JSON.parse(response._body);
      this.lista_filmes = objeto_retorno.results;
    });
  }

  navigate(id) {
    this.router.navigate(["moovie"], {
      queryParams: { id: id, origem: "home", searchParam: this.searchParam }
    });
  }
}
