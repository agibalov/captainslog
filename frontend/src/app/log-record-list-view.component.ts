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
                <a [routerLink]="['/logrecords', logRecord.id, 'view']">View</a>
            </li>
        </ul>
    `,
    styles: []
})
export class LogRecordListViewComponent implements OnInit {
    logRecords: LogRecord[];

    constructor(private route: ActivatedRoute) {}

    async ngOnInit() {
        this.route.data.subscribe((data: { logRecords: LogRecord[] }) => {
            this.logRecords = data.logRecords;
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
