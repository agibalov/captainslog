import 'rxjs/add/operator/toPromise';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiClient, LogRecord, LogRecordNotFoundApiError} from "./api-client.service";

@Component({
    template: `
        <div *ngIf="error">
            <h3>Not found</h3>
        </div>
        <div *ngIf="logRecord">
            <h3>{{ logRecord.id }} view</h3>
            <p>id: {{ logRecord.id }}</p>
            <p>created: {{ logRecord.createdAt }}</p>
            <p>updated: {{ logRecord.updatedAt }}</p>
            <p>text: {{ logRecord.text }}</p>
            <pre>{{ logRecord | json }}</pre>
        </div>
    `,
    styles: []
})
export class LogRecordViewComponent implements OnInit {
    logRecord: LogRecord;
    error: any;

    constructor(
        private apiClient: ApiClient,
        private route: ActivatedRoute) {}

    async ngOnInit(): Promise<void> {
        const id = this.route.snapshot.paramMap.get('id');
        try {
            this.logRecord = await this.apiClient.getLogRecord(id);
        } catch(e) {
            if(e instanceof LogRecordNotFoundApiError) {
                this.error = 'Not found';
            } else {
                throw e;
            }
        }
    }
}
