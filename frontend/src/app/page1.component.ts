import {Component, Inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
    template: `
        <h1>page #1</h1>
        <button type="button" (click)="testHttp()" class="btn btn-primary">Test HTTP</button>
        <pre>{{response|json}}</pre>
    `,
    styles: []
})
export class Page1Component {
    response: any;

    constructor(
        @Inject('API_ENDPOINT') private apiEndpoint: string,
        private http: HttpClient) {}

    testHttp() {
        this.response = "loading";
        /*this.http.get('/api/hello', { observe: 'response' }).subscribe(response => {
            console.log(response);
            this.response = response;
        });*/

        this.http.post(`${this.apiEndpoint}/logrecords`, {
            text: 'hello there!'
        }, {
            observe: 'response',
            responseType: 'text'
        }).subscribe(response => {
            console.log(response);
            this.response = response;

            const location = response.headers.get('location');
            this.http.get(location, { observe: 'response' }).subscribe(response => {
                console.log(response);
            });
        });
    }
}
