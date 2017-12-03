import {Component, Injectable, OnInit} from '@angular/core';
import {ApiClient, LogRecord} from "./api-client.service";
import {LongRunningOperationExecutor} from "./long-running-operation-executor.service";
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";

@Component({
    template: `
        <h1>Log record list view</h1>
        <ul *ngIf="logRecords">
            <li *ngFor="let logRecord of logRecords">
                <span class="badge badge-primary">{{ logRecord.id }}</span><br>
                created: {{ logRecord.createdAt }}<br>
                updated: {{ logRecord.updatedAt }}<br>
                text: {{ logRecord.text }}
                <a [routerLink]="['/logrecords', logRecord.id, 'view']" class="btn btn-sm btn-primary">View</a>
                <button type="button" class="btn btn-sm btn-danger" (click)="deleteLogRecord(logRecord.id)">Delete</button>
            </li>
        </ul>
    `,
    styles: []
})
export class LogRecordListViewComponent implements OnInit {
    logRecords: LogRecord[];

    constructor(
        private route: ActivatedRoute,
        private apiClient: ApiClient,
        private longRunningOperationExecutor: LongRunningOperationExecutor)
    {}

    async ngOnInit() {
        this.route.data.subscribe((data: { logRecords: LogRecord[] }) => {
            this.logRecords = data.logRecords;
        });
    }

    async deleteLogRecord(logRecordId: string): Promise<void> {
        await this.longRunningOperationExecutor.execute(async () => {
            await this.apiClient.deleteLogRecord(logRecordId);
            this.logRecords = await this.apiClient.getLogRecords();
        });
    }
}

@Injectable()
export class LogRecordListResolver implements Resolve<LogRecord[]> {
    constructor(
        private apiClient: ApiClient,
        private longRunningOperationExecutor: LongRunningOperationExecutor)
    {}

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<LogRecord[]> {
        return await this.longRunningOperationExecutor.execute(async () => {
            return await this.apiClient.getLogRecords();
        });
    }
}
