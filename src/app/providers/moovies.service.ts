import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable()
export class MooviesService {
  private baseApiPath = "https://api.themoviedb.org/3";

  constructor(public http: Http) {
    // console.log("Hello MoovieProvider Provider");
  }

  getMovies(query, page = 1) {
    try {
      return this.http.get(
        `${
          this.baseApiPath
        }/search/movie?api_key=${this.getApiKey()}&language=pt-BR&query=${query}&page=${page}&include_adult=false`
      );
    } catch (err) {
      console.log(err);
    }
  }

  getLatestMovies(search = "popular", page = 1) {
    try {
      return this.http.get(
        this.baseApiPath +
          `/movie/${search}?page=${page}&api_key=` +
          this.getApiKey() +
          "&language=pt-BR"
      );
    } catch (err) {
      console.log(err);
    }
  }

  getMovieDetails(filmeid) {
    try {
      return this.http.get(
        this.baseApiPath +
          `/movie/${filmeid}?api_key=` +
          this.getApiKey() +
          "&language=pt-BR"
      );
    } catch (err) {
      console.log(err);
    }
  }

  getApiKey(): string {
    return "51e4e9d52532d389174b5252cd99d33d";
  }
}
