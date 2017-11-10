import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";

import {environment} from '../environments/environment';
import {AppComponent} from './app.component';
import {Page1Component} from "./page1.component";
import {Page2Component} from "./page2.component";
import {PageNotFoundComponent} from "./page-not-found.component";
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
    declarations: [
        AppComponent,
        Page1Component,
        Page2Component,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule
    ],
    providers: [
        { provide: 'API_ENDPOINT', useValue: environment.apiEndpoint }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
