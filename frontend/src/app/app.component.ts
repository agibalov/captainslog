import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-root',
    template: `
        <div class="container">
            <h1>Hello World</h1>
            <button type="button" (click)="testHttp()" class="btn btn-primary">Test HTTP</button>
            <pre>{{response|json}}</pre>
        </div>
    `,
    styles: []
})
export class AppComponent {
    response: any;

    constructor(private http: HttpClient) {}

    testHttp() {
        this.response = "loading";
        this.http.get('/api/hello', { observe: 'response' }).subscribe(response => {
            console.log(response);
            this.response = response;
        });
    }
}