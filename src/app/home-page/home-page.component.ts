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
  origem = "";
  private sub: any;

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
      this.origem = qp["origem"];
    });
    this.getLastMoovies(this.origem);
  }

  getLastMoovies(search="top_rated") {
    if (search == "top_rated") {
      this.search = "Filmes mais bem avaliados";
      this.colorTitle = "darkgoldenrod";
    } else if (search == "upcoming") {
      this.search = "Filmes estreiando";
      this.colorTitle = "darkgreen";
    } else if (search == "popular") {
      this.search = "Filmes mais populares";
      this.colorTitle = "darkred";
    }

    this.origem = search;

    this.moviesService.getLatestMovies(search).subscribe(data => {
      const response = data as any;
      const objeto_retorno = JSON.parse(response._body);
      // console.log(objeto_retorno);
      this.lista_filmes = objeto_retorno.results;
    });
  }

  navigate(id) {
    // console.log(id);
    this.router.navigate(["moovie"], {
      queryParams: { id: id, origem: this.origem }
    });
  }
}
