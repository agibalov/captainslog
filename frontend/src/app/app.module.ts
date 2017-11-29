import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";

import {environment} from '../environments/environment';
import {AppComponent} from './app.component';
import {PageNotFoundComponent} from "./page-not-found.component";
import {AppRoutingModule} from "./app-routing.module";
import {LogRecordViewComponent} from "./log-record-view.component";
import {ApiClient} from "./api-client.service";
import {LogRecordCreateComponent} from "./log-record-create.component";
import {FormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        AppComponent,
        LogRecordCreateComponent,
        LogRecordViewComponent,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule
    ],
    providers: [
        { provide: 'API_ENDPOINT', useValue: environment.apiEndpoint },
        ApiClient,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
