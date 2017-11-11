import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {ApiClient} from "./api-client.service";

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
        private apiClient: ApiClient,
        private router: Router)
    {}

    async testHttp(): Promise<void> {
        this.response = "loading";

        const logRecord = await this.apiClient.createLogRecord({
            text: 'hi there!'
        });

        const id = logRecord.id;
        this.router.navigate(['logrecords', id, 'view']);
    }
}
