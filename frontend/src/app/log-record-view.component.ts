import {Component, Injectable, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {ApiClient, LogRecord} from "./api-client.service";
import {LongRunningOperationExecutor} from "./long-running-operation-executor.service";

@Component({
    template: `
        <h3>{{ logRecord.id }} view</h3>
        <p>id: {{ logRecord.id }}</p>
        <p>created: {{ logRecord.createdAt }}</p>
        <p>updated: {{ logRecord.updatedAt }}</p>
        <p>text: {{ logRecord.text }}</p>
        <pre>{{ logRecord | json }}</pre>
    `,
    styles: []
})
export class LogRecordViewComponent implements OnInit {
    logRecord: LogRecord;

    constructor(
        private apiClient: ApiClient,
        private route: ActivatedRoute) {}

    async ngOnInit(): Promise<void> {
        this.route.data.subscribe((data: { logRecord: LogRecord }) => {
            this.logRecord = data.logRecord;
        });
    }
}

@Injectable()
export class LogRecordResolver implements Resolve<LogRecord> {
    constructor(
        private apiClient: ApiClient,
        private longRunningOperationExecutor: LongRunningOperationExecutor)
    {}

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<LogRecord> {
        const id = route.paramMap.get('id');
        return await this.longRunningOperationExecutor.execute(async () => {
            return await this.apiClient.getLogRecord(id);
        });
    }
}
