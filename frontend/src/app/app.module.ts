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
import {ReactiveFormsModule} from "@angular/forms";
import {LogRecordListViewComponent} from "./log-record-list-view.component";

@NgModule({
    declarations: [
        AppComponent,
        LogRecordCreateComponent,
        LogRecordViewComponent,
        LogRecordListViewComponent,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule
    ],
    providers: [
        { provide: 'API_ENDPOINT', useValue: environment.apiEndpoint },
        ApiClient,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
