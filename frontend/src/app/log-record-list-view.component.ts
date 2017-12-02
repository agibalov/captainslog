import 'rxjs/add/operator/toPromise';
import {Component, OnInit} from '@angular/core';
import {ApiClient, LogRecord, LogRecordNotFoundApiError} from "./api-client.service";

@Component({
    template: `
        <h1>Log record list view</h1>
        <ul *ngIf="logRecords">
            <li *ngFor="let logRecord of logRecords">
                <span class="badge badge-primary">{{ logRecord.id }}</span><br>
                created: {{ logRecord.createdAt }}<br>
                updated: {{ logRecord.updatedAt }}<br>
                text: {{ logRecord.text }}
            </li>
        </ul>
    `,
    styles: []
})
export class LogRecordListViewComponent implements OnInit {
    logRecords: LogRecord[];

    constructor(private apiClient: ApiClient) {}

    async ngOnInit(): Promise<void> {
        try {
            this.logRecords = await this.apiClient.getLogRecords();
        } catch(e) {
            throw e;
        }
    }
}
