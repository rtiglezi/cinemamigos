import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { MooviesService } from "app/providers/moovies.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"],
  providers: [MooviesService]
})
export class FooterComponent implements OnInit {
  arrayMoovies = [];

  @ViewChild("srch") domSearch: ElementRef;
  @ViewChild("srchIcon") domSearchIcon: ElementRef;

  constructor(private router: Router, public moviesService: MooviesService) {}

  ngOnInit() {}

  navigate(destino) {
    this.router.navigate([destino]);
  }

  searchMoovies(query) {

    this.domSearchIcon.nativeElement.innerHTML =
    "<img src='../assets/loader-grey.gif' style='width:25px;'/>";
    this.domSearchIcon.nativeElement.className = "form-control-feedback";


    this.moviesService.getMovies(query).subscribe(data => {
      const response = data as any;
      const objeto_retorno = JSON.parse(response._body);
      this.arrayMoovies = objeto_retorno.results;

      this.domSearchIcon.nativeElement.innerHTML =
      "<i id='i_search' class='glyphicon glyphicon-search form-control-feedback'></i>";

    });

    if (this.domSearch.nativeElement.value=="") {
      this.domSearchIcon.nativeElement.innerHTML =
      "<i id='i_search' class='glyphicon glyphicon-search form-control-feedback'></i>";
    }

  }

  selectMoovie(id) {
    this.router.navigate(["moovie"], { queryParams: { id: id } });
  }

  setFocus() {
    setTimeout(() => {
      this.domSearch.nativeElement.focus();
    }, 1000);
  }
}
