import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule, Routes } from "@angular/router";

import { AngularFireModule } from "angularfire2";

import { AppComponent } from "./app.component";
import { AuthService } from "./providers/auth.service";
import { LoginPageComponent } from "./login-page/login-page.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { NavComponent } from "./nav/nav.component";
import { ProfilePageComponent } from "./profile-page/profile-page.component";
import { MoovieDetailsComponent } from "./moovie-details/moovie-details.component";

export const firebaseConfig = {
  apiKey: "AIzaSyDamhy3gQqiMz0i_3nwoVJAyp4qU85AutM",
  authDomain: "cinemamigos-d0898.firebaseapp.com",
  databaseURL: "https://cinemamigos-d0898.firebaseio.com",
  projectId: "cinemamigos-d0898",
  storageBucket: "cinemamigos-d0898.appspot.com",
  messagingSenderId: "1021556023678"
};

const routes: Routes = [
  { path: "", component: HomePageComponent },
  { path: "login", component: LoginPageComponent },
  { path: "profile", component: ProfilePageComponent },
  { path: "moovie", component: MoovieDetailsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    NavComponent,
    ProfilePageComponent,
    MoovieDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
