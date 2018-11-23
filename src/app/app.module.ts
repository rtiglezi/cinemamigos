import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule, Routes } from "@angular/router";

import { AngularFireModule } from "angularfire2";

import { AppComponent } from "./app.component";
import { AuthService } from "./providers/auth.service";
import { LoginPageComponent } from "./login-page/login-page.component";
import { SugestoesPageComponent } from "./sugestoes-page/sugestoes-page.component";
import { NavComponent } from "./nav/nav.component";
import { ProfilePageComponent } from "./profile-page/profile-page.component";
import { MoovieDetailsPageComponent } from "./moovie-details-page/moovie-details-page.component";
import { PainelPageComponent } from './painel-page/painel-page.component';
import { MyMooviesPageComponent } from './my-moovies-page/my-moovies-page.component';
import { SwitchComponent } from "./switch/switch.component";
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { FooterComponent } from './footer/footer.component';

export const firebaseConfig = {
  apiKey: "AIzaSyDamhy3gQqiMz0i_3nwoVJAyp4qU85AutM",
  authDomain: "cinemamigos-d0898.firebaseapp.com",
  databaseURL: "https://cinemamigos-d0898.firebaseio.com",
  projectId: "cinemamigos-d0898",
  storageBucket: "cinemamigos-d0898.appspot.com",
  messagingSenderId: "1021556023678"
};

const routes: Routes = [
  { path: "", component: SwitchComponent},
  { path: "welcome", component: WelcomePageComponent},
  { path: "painel", component: PainelPageComponent},
  { path: "sugestoes", component: SugestoesPageComponent },
  { path: "login", component: LoginPageComponent },
  { path: "profile", component: ProfilePageComponent },
  { path: "moovie", component: MoovieDetailsPageComponent },
  { path: "mymoovies", component: MyMooviesPageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SugestoesPageComponent,
    NavComponent,
    ProfilePageComponent,
    MoovieDetailsPageComponent,
    PainelPageComponent,
    MyMooviesPageComponent,
    SwitchComponent,
    WelcomePageComponent,
    FooterComponent
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
