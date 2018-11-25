import { Component, OnInit } from "@angular/core";
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

  colorSugestoes: string;
  colorMyMoovies: string;
  colorBusca: string;
  colorProfile: string;
  colorPainel: string;

  constructor(private router: Router) {}

  ngOnInit() {

    var pathName = window.location.pathname;
    if (pathName=='/sugestoes') {
      this.colorSugestoes = 'red';
    }
    if (pathName=='/mymoovies') {
      this.colorMyMoovies = 'red';
    }
    if (pathName=='/busca') {
      this.colorBusca = 'red';
    }
    if (pathName=='/profile') {
      this.colorProfile = 'red';
    }
    if (pathName=='/painel') {
      this.colorPainel = 'red';
    }

  }

  navigate2(destino) {
    this.router.navigate([destino]);
  }

}
