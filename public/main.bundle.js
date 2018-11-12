webpackJsonp([1,4],{

/***/ 350:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 350;


/***/ }),

/***/ 351:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(439);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(476);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(470);




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=C:/Users/rtigl/Documents/projetos/FRONTEND/angular/cinemamigos/src/main.js.map

/***/ }),

/***/ 469:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service__ = __webpack_require__(64);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = (function () {
    function AppComponent(authService, router) {
        var _this = this;
        this.authService = authService;
        this.router = router;
        this.localUser = false;
        this.authService.af.auth.subscribe(function (auth) {
            if (auth == null) {
                _this.router.navigate(["login"]);
            }
            else {
                _this.localUser = true;
            }
        });
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
            selector: "app-root",
            template: __webpack_require__(549),
            styles: [__webpack_require__(544)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__providers_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__providers_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === 'function' && _b) || Object])
    ], AppComponent);
    return AppComponent;
    var _a, _b;
}());
//# sourceMappingURL=C:/Users/rtigl/Documents/projetos/FRONTEND/angular/cinemamigos/src/app.component.js.map

/***/ }),

/***/ 470:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(429);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(435);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(469);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_auth_service__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__login_page_login_page_component__ = __webpack_require__(473);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__home_page_home_page_component__ = __webpack_require__(472);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__nav_nav_component__ = __webpack_require__(474);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__profile_page_profile_page_component__ = __webpack_require__(475);
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var firebaseConfig = {
    apiKey: 'AIzaSyDamhy3gQqiMz0i_3nwoVJAyp4qU85AutM',
    authDomain: 'cinemamigos-d0898.firebaseapp.com',
    databaseURL: 'https://cinemamigos-d0898.firebaseio.com',
    projectId: 'cinemamigos-d0898',
    storageBucket: 'cinemamigos-d0898.appspot.com',
    messagingSenderId: '1021556023678'
};
var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_9__home_page_home_page_component__["a" /* HomePageComponent */] },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_8__login_page_login_page_component__["a" /* LoginPageComponent */] },
    { path: 'profile', component: __WEBPACK_IMPORTED_MODULE_11__profile_page_profile_page_component__["a" /* ProfilePageComponent */] }
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_8__login_page_login_page_component__["a" /* LoginPageComponent */],
                __WEBPACK_IMPORTED_MODULE_9__home_page_home_page_component__["a" /* HomePageComponent */],
                __WEBPACK_IMPORTED_MODULE_10__nav_nav_component__["a" /* NavComponent */],
                __WEBPACK_IMPORTED_MODULE_11__profile_page_profile_page_component__["a" /* ProfilePageComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_5_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig),
                __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */].forRoot(routes)
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_7__providers_auth_service__["a" /* AuthService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=C:/Users/rtigl/Documents/projetos/FRONTEND/angular/cinemamigos/src/app.module.js.map

/***/ }),

/***/ 471:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return STORAGE_KEYS; });
var STORAGE_KEYS = {
    localUsuer: 'localUser'
};
//# sourceMappingURL=C:/Users/rtigl/Documents/projetos/FRONTEND/angular/cinemamigos/src/storage_keys.config.js.map

/***/ }),

/***/ 472:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service__ = __webpack_require__(64);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePageComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomePageComponent = (function () {
    function HomePageComponent(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    HomePageComponent.prototype.ngOnInit = function () {
    };
    HomePageComponent.prototype.logout = function () {
        this.authService.logout();
        this.router.navigate(['login']);
    };
    HomePageComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
            selector: 'app-home-page',
            template: __webpack_require__(550),
            styles: [__webpack_require__(545)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__providers_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__providers_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === 'function' && _b) || Object])
    ], HomePageComponent);
    return HomePageComponent;
    var _a, _b;
}());
//# sourceMappingURL=C:/Users/rtigl/Documents/projetos/FRONTEND/angular/cinemamigos/src/home-page.component.js.map

/***/ }),

/***/ 473:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service__ = __webpack_require__(64);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPageComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginPageComponent = (function () {
    function LoginPageComponent(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    LoginPageComponent.prototype.login = function () {
        var _this = this;
        this.authService.loginWithGoogle().then(function (data) {
            var user = {
                user_uid: data.auth.uid,
                user_displayName: data.auth.displayName,
                user_email: data.auth.email,
                user_photo: data.auth.photoURL
            };
            _this.authService.setLocalUser(user);
            _this.router.navigate(['']);
        });
    };
    LoginPageComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
            selector: "app-login-page",
            template: __webpack_require__(551),
            styles: [__webpack_require__(546)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__providers_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__providers_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === 'function' && _b) || Object])
    ], LoginPageComponent);
    return LoginPageComponent;
    var _a, _b;
}());
//# sourceMappingURL=C:/Users/rtigl/Documents/projetos/FRONTEND/angular/cinemamigos/src/login-page.component.js.map

/***/ }),

/***/ 474:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service__ = __webpack_require__(64);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NavComponent = (function () {
    function NavComponent(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    NavComponent.prototype.logout = function () {
        this.authService.logout();
        this.router.navigate(["login"]);
    };
    NavComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
            selector: "app-nav",
            template: __webpack_require__(552),
            styles: [__webpack_require__(547)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__providers_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__providers_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === 'function' && _b) || Object])
    ], NavComponent);
    return NavComponent;
    var _a, _b;
}());
//# sourceMappingURL=C:/Users/rtigl/Documents/projetos/FRONTEND/angular/cinemamigos/src/nav.component.js.map

/***/ }),

/***/ 475:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_auth_service__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePageComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ProfilePageComponent = (function () {
    function ProfilePageComponent(authService) {
        this.authService = authService;
        this.localUser = this.authService.getLocalUser();
    }
    ProfilePageComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_6" /* Component */])({
            selector: 'app-profile-page',
            template: __webpack_require__(553),
            styles: [__webpack_require__(548)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__providers_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__providers_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object])
    ], ProfilePageComponent);
    return ProfilePageComponent;
    var _a;
}());
//# sourceMappingURL=C:/Users/rtigl/Documents/projetos/FRONTEND/angular/cinemamigos/src/profile-page.component.js.map

/***/ }),

/***/ 476:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=C:/Users/rtigl/Documents/projetos/FRONTEND/angular/cinemamigos/src/environment.js.map

/***/ }),

/***/ 544:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 545:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 546:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 547:
/***/ (function(module, exports) {

module.exports = "\r\n"

/***/ }),

/***/ 548:
/***/ (function(module, exports) {

module.exports = ".avatar {\r\n  vertical-align: middle;\r\n  width: 150px;\r\n  height: 150px;\r\n  border-radius: 50%;\r\n}\r\n"

/***/ }),

/***/ 549:
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n\n  <app-nav *ngIf=\"localUser\"></app-nav>\n\n  <router-outlet></router-outlet>\n\n</div>\n"

/***/ }),

/***/ 550:
/***/ (function(module, exports) {

module.exports = "<div class=\"jumbotron text-center\">\n  <h3>Seja bem-vindo!</h3>\n  <p>Aqui vai o dashboard</p>\n</div>\n"

/***/ }),

/***/ 551:
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"jumbotron text-center\">\n      <h2>Olá, seja bem-vindo!</h2>\n      <p>Por favor, faça o seu login:</p>\n      <button class=\"btn btn-danger\" (click)=\"login()\">Logar com sua conta do Google</button>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 552:
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-default\">\n  <div class=\"navbar-header\">\n    <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\"\n      aria-controls=\"navbar\">\n      <span class=\"sr-only\">Toggle navigation</span>\n      <span class=\"icon-bar\"></span>\n      <span class=\"icon-bar\"></span>\n      <span class=\"icon-bar\"></span>\n    </button>\n    <a class=\"navbar-brand\" href=\"#\">Cinemamigos</a>\n  </div>\n  <div id=\"navbar\" class=\"navbar-collapse collapse\">\n    <ul class=\"nav navbar-nav\">\n      <li><a href=\"\">Home</a></li>\n      <li><a href=\"profile\">Meus dados</a></li>\n    </ul>\n    <ul class=\"nav navbar-nav navbar-right\">\n      <li><a href=\"#\">\n          <span (click)=\"logout()\">Sair</span>\n        </a></li>\n    </ul>\n  </div>\n</nav>\n"

/***/ }),

/***/ 553:
/***/ (function(module, exports) {

module.exports = "<div class=\"container row\">\n    <div class=\"jumbotron text-center\">\n    <img src='{{ localUser.user_photo }}' class=\"avatar\">\n    <br><br>\n    <div>({{ localUser.user_uid }})</div>\n    <div><strong>{{ localUser.user_displayName }}</strong></div>\n    <div>({{ localUser.user_email }})</div>\n  </div>\n</div>\n"

/***/ }),

/***/ 594:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(351);


/***/ }),

/***/ 64:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_config_storage_keys_config__ = __webpack_require__(471);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthService = (function () {
    function AuthService(af) {
        this.af = af;
    }
    AuthService.prototype.loginWithGoogle = function () {
        var login = this.af.auth.login({
            provider: __WEBPACK_IMPORTED_MODULE_1_angularfire2__["b" /* AuthProviders */].Google,
            method: __WEBPACK_IMPORTED_MODULE_1_angularfire2__["c" /* AuthMethods */].Popup
        });
        return login;
    };
    AuthService.prototype.logout = function () {
        return this.af.auth.logout();
    };
    AuthService.prototype.setLocalUser = function (obj) {
        if (obj == null) {
            localStorage.removeItem(__WEBPACK_IMPORTED_MODULE_2_app_config_storage_keys_config__["a" /* STORAGE_KEYS */].localUsuer);
        }
        else {
            localStorage.setItem(__WEBPACK_IMPORTED_MODULE_2_app_config_storage_keys_config__["a" /* STORAGE_KEYS */].localUsuer, JSON.stringify(obj));
        }
    };
    AuthService.prototype.getLocalUser = function () {
        var usr = localStorage.getItem(__WEBPACK_IMPORTED_MODULE_2_app_config_storage_keys_config__["a" /* STORAGE_KEYS */].localUsuer);
        if (usr == null) {
            return null;
        }
        else {
            return JSON.parse(usr);
        }
    };
    AuthService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_angularfire2__["d" /* AngularFire */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1_angularfire2__["d" /* AngularFire */]) === 'function' && _a) || Object])
    ], AuthService);
    return AuthService;
    var _a;
}());
//# sourceMappingURL=C:/Users/rtigl/Documents/projetos/FRONTEND/angular/cinemamigos/src/auth.service.js.map

/***/ })

},[594]);
//# sourceMappingURL=main.bundle.map