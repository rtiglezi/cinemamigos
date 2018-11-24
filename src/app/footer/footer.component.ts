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

  constructor(private router: Router) {}

  ngOnInit() {}

  navigate(destino) {
    this.router.navigate([destino]);
  }

}
