import {Component, Injectable, OnInit} from '@angular/core';
import {ApiClient, LogRecord, Page} from "./api-client.service";
import {LongRunningOperationExecutor} from "./long-running-operation-executor.service";
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";

@Component({
    template: `
        <h1>Log record list view</h1>
        <p *ngIf="logRecordsPage">Page: {{ logRecordsPage.page }}, size: {{ logRecordsPage.size}},
            total pages: {{ logRecordsPage.totalPages }}, total items: {{ logRecordsPage.totalItems }}</p>
        <ul *ngIf="logRecordsPage">
            <li *ngFor="let logRecord of logRecordsPage.items">
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
    logRecordsPage: Page<LogRecord>;

    constructor(
        private route: ActivatedRoute,
        private apiClient: ApiClient,
        private longRunningOperationExecutor: LongRunningOperationExecutor)
    {}

    async ngOnInit() {
        this.route.data.subscribe((data: { logRecordsPage: Page<LogRecord> }) => {
            this.logRecordsPage = data.logRecordsPage;
        });
    }

    async deleteLogRecord(logRecordId: string): Promise<void> {
        await this.longRunningOperationExecutor.execute(async () => {
            await this.apiClient.deleteLogRecord(logRecordId);

            const page = this.logRecordsPage.page;
            const size = this.logRecordsPage.size;
            this.logRecordsPage = await this.apiClient.getLogRecords(page, size);
        });
    }
}

@Injectable()
export class LogRecordsPageResolver implements Resolve<Page<LogRecord>> {
    constructor(
        private apiClient: ApiClient,
        private longRunningOperationExecutor: LongRunningOperationExecutor)
    {}

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Page<LogRecord>> {
        const page = +route.paramMap.get('page');
        const size = +route.paramMap.get('size');
        return await this.longRunningOperationExecutor.execute(async () => {
            return await this.apiClient.getLogRecords(page, size);
        });
    }
}
